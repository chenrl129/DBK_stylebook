const fs = require('fs');

const data = JSON.parse(fs.readFileSync('transformedData.json', 'utf8'));

let csv = 'id,letter,term,important,sports,ap,definition\n';
let id = 1;

// creating the csv rows
data.forEach(item => {
    csv += `${id},${item.letter},"${item.term}",${item.important},${item.sports},${item.ap},"${item.definition.replace(/"/g, '""')}"\n`;
    id++;
});

// Writing it to a new file in case we need to hold on to the old data
fs.writeFileSync('new_data.csv', csv);
console.log('Data written to new_data.csv');




//This is the orginal script below



// const fs = require('fs');
// const data = JSON.parse(fs.readFileSync('stylebook.json', 'utf8'));

// let csv = 'id,letter,term,important,sports,ap,definition\n';
// let id = 1; 

// for (const letter in data) {
//     data[letter].forEach(item => {
//         const term = Object.keys(item)[0];
//         const attributes = item[term];
//         csv += `${id},${letter},"${term}",${attributes.important},${attributes.sports},${attributes.ap},"${attributes.definition.replace(/"/g, '""')}"\n`;
//         id++;
//     });
// }

// fs.writeFileSync('data.csv', csv);
// console.log('Data written to data.csv');

