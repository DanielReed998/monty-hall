const fs = require('fs');
const resultsFile = './results.txt';

/*  The only parameter is the number of trials (we use 10,000 when running this later).  
*   Function returns object with decimal percentages showing the number of times the car 
*   was behind the first door and times the car was behind the other door that 
*   the host didn't open.
*
*   Should be approx. 33.33% and 66.67% respectively
**/
function montyHall(numTrials) {
    let resultsData = {
        'door1': 0,
        'otherDoor': 0
    };

    for (let i = 0; i < numTrials; i++){
        //door with car is random number between 1 and 3.
        let carDoor = Math.floor(Math.random()*3) + 1;

        //contestant chooses any of the 3 doors.
        let contestantDoor = Math.floor(Math.random()*3) + 1;

        //here, the host opens the door that isn't contestant door and isn't the door with car.
        let hostDoor;
        switch (contestantDoor) {
            case 1:
                hostDoor = carDoor != 2 ? 2 : 3;
                break;
            case 2: 
                hostDoor = carDoor != 1 ? 1 : 3;
                break;
            case 3: 
                hostDoor = carDoor != 1 ? 1 : 2;
                break;
            default:
                break;
        }

        //if the car is behind the contestant's original choice, increment that result
        if (carDoor == contestantDoor) resultsData['door1']++;
        //otherwise, if the car is behind the other door that the host didn't open, increment that result 
        else {
            for (let door = 1; door <= 3; door++) {
                if (door !== contestantDoor && door !== hostDoor && door === carDoor){
                    resultsData['otherDoor']++;
                }
            }
            //Just writing  resultsData['otherDoor']++  would produce the same result here, but the 
            //for loop is to explicitly show why 'otherDoor' is incremented in this context
        }
    }

    //turn the number of wins for either choice into a decimal percentage
    resultsData['door1'] /= numTrials;
    resultsData['otherDoor'] /= numTrials;

    return resultsData;
}

//a few trial runs to show random variability
let results = '5 iterations of Monty Hall problem run 10,000 times: ' + '\n\n';
for (let i = 0; i < 5; i++) {
    const resultsData = montyHall(10000);

    results += 'sticking with original door: ' + (resultsData['door1'] * 100).toFixed(2) + '%' + '\n' +
               'switching to other door: ' + (resultsData['otherDoor'] * 100).toFixed(2) + '%' + '\n\n';
}

//write the results to the resultsFile
fs.writeFile(resultsFile, results, (err) => {
    if (err) console.error(err);
    else {
        console.log('check the results file!');
    }
})
