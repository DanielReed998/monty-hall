const fs = require('fs');
const resultsFile = './results.txt';

let results = '';

for (let i = 0; i < 10000; i++){
    const door1;
    const door2;
    const door3;
}

fs.writeFile(resultsFile, results, (err) => {
    if (err) console.error(err);
    else {
        console.log('check the results file!');
    }
})
