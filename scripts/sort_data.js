const fs = require('fs');
const path = require('path');

const filePath = 'c:\\test_ai\\thaiherb\\src\\data\\products.js';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Extract the array using regex or eval
// Since it's a JS file with `export const products = [...]`, we can try to extract the array part.
// However, eval might fail if there are imports. But this file looks simple.

// Let's just use regex to find the array content.
const start = content.indexOf('[');
const end = content.lastIndexOf(']');

if (start === -1 || end === -1) {
    console.error('Could not find array in file');
    process.exit(1);
}

// Evaluate the array
const arrayString = content.substring(start, end + 1);
// To parse this looser JSON (JS object), we can use Function constructor or eval
// But we need to handle the fact that keys might not be quoted.
// Better: just require the file? No, it's an ES6 module `export const`.
// We can strip `export const products = ` and `;` to get valid JS.
// Then use `eval`.

let data;
try {
    // Basic cleaning to make it a valid JS expression
    // It's already valid JS.
    data = eval(arrayString);
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

// Sort
data.sort((a, b) => {
    const getPriority = (tag) => {
        if (tag === 'ขายดี') return 1;
        if (tag === 'แนะนำ') return 2;
        if (tag === 'ใหม่') return 3;
        return 4;
    };

    const priorityA = getPriority(a.tag);
    const priorityB = getPriority(b.tag);

    if (priorityA !== priorityB) {
        return priorityA - priorityB;
    }
    return a.id - b.id;
});

// Convert back to string
// We want to format it nicely.
const newContent = `export const products = ${JSON.stringify(data, null, 4)};\n`;

// Since JSON.stringify quotes keys, we might want to unquote them if we want to match style, but JSON is valid JS.
// The original file had unquoted keys.
// To keep it simple, JSON is fine.

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Sorted products.js');
