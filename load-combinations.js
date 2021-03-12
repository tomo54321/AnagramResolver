const fs = require("fs");
const { makeAnagram } = require("./anagrams");
const alphabet = 'bcdfghjklmnpqrstvwxyz'.split("");
const vowels = 'aeiou'.split("");

const getLetters = () => {
    let letters = [];
    // How many vowels to give
    let vowelCount = Math.floor(Math.random() * 2) + 2;
    // How many letters to give
    let letterCount = 6 - vowelCount; // 6 Letters total take the amount of vowels!

    // Add vowels
    for(let i = 0; i < vowelCount; ++i){
        letters.push( vowels[Math.floor(Math.random() * vowels.length)] ); // Add random vowel
    }
    // Add letters
    for(let i = 0; i < letterCount; ++i){
        letters.push( alphabet[Math.floor(Math.random() * alphabet.length)] ); // Add random letter
    }
    return letters;
};

function produce(){
    const the_letters = getLetters();
    const combos = makeAnagram(the_letters);
    if(combos.length < 25){
        return produce();
    }
    return the_letters;
}

let combinations = [];
for(let i = 0; i < 500; ++ i){
    combinations.push(produce());
}
fs.writeFileSync("combinations.txt", combinations.join(","));