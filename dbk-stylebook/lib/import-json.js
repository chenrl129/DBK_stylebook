const fs = require('fs');
const data = JSON.parse(fs.readFileSync('stylebook.json', 'utf8'));

let csv = 'category,term,important,sports,ap,definition\n';  // header
for (const category in data) {
    data[category].forEach(item => {
        const term = Object.keys(item)[0];
        const attributes = item[term];
        csv += `${category},"${term}",${attributes.important},${attributes.sports},${attributes.ap},"${attributes.definition.replace(/"/g, '""')}"\n`;
    });
}

fs.writeFileSync('data.csv', csv);
console.log('Data written to data.csv');
