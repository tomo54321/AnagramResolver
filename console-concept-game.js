const fs = require("fs");
const { makeAnagram } = require("./anagrams");
const allLetters = fs.readFileSync("combinations.txt").toString().replace(/\r/g, "").split("\n");

// For Console Version
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const setupGame = () => {

    const letters = allLetters[ Math.round(Math.random() * allLetters.length) ].split(",");
    const possibleAnswers = makeAnagram(letters);
    let guessedAnswers = [];
    

    const waitForInput = () => {
        console.log("Your letters are: ", letters.join(" "));
        rl.question("Quess or type 'exit' to stop: ", answer => {
            if(answer === "exit"){ 
                console.log("\n\n\n\n\nOk fair enough...\n");
                console.log(`You guessed ${guessedAnswers.length} out of ${possibleAnswers.length}\n`);
                console.log("Your guessed words:", guessedAnswers);
                console.log("Remaining words:", possibleAnswers.filter(str => !guessedAnswers.includes(str)));
                rl.close(); 
                process.exit(); 
            }

            if(guessedAnswers.includes(answer)){
                console.log("You already guessed that.");
            } else if (!possibleAnswers.includes(answer)){
                console.log("Not a word, try again.")
            } else {
                guessedAnswers.push(answer);
                if(guessedAnswers.length === possibleAnswers.length){
                    console.log("You got them! Nice going!");
                    process.exit();
                    return;
                } else {
                    console.log("\n\n\nNice one!");
                    console.log(`${possibleAnswers.length - guessedAnswers.length} more to get!\n\n`);
                }
            }

            waitForInput();

        });
    };

    waitForInput();
    
};


setupGame();