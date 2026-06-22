const fs = require('fs');
const files = ['src/pages/Home.jsx', 'src/pages/Documents.jsx'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\/images\/certificate\/([a-zA-Z0-9_]+)\.(png|jpg)/g, '/images/certificate/$1.webp');
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
});
