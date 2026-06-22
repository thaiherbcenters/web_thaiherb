const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

walk('src').forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Only replace loading="lazy" if it's inside an img tag
    if (content.includes('loading="lazy"')) {
        let newContent = content.replace(/<img([^>]*)loading="lazy"([^>]*)>/g, '<img$1$2>');
        if (newContent !== content) {
            fs.writeFileSync(file, newContent);
            console.log('Updated ' + file);
        }
    }
});
