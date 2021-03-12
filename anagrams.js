const fs = require("fs");
const wordsBuffer = fs.readFileSync("words.txt");
const allWords = wordsBuffer.toString().replace(/\r/g, "").split("\n").filter(str => str.length > 2 && str.length < 8);

const permute = (leafs) => {
    var branches = [];      
    if( leafs.length == 1 ) return leafs;       
    for( var k in leafs ) {
        var leaf = leafs[k];
        permute(leafs.join('').replace(leaf,'').split('')).concat("").map(function(subtree) {
            branches.push([leaf].concat(subtree));
        });
    }
    return branches.map(function(str){return str.join('')});
};
const makeAnagram = (letters) => {
    var allSS = permute(letters);
    let allCombos = [];
    allSS.forEach(str => {
        if(allCombos.includes(str) || !allWords.includes(str)){
            return;
        }
        allCombos.push(str);
    });

    return allCombos
}

exports.makeAnagram = makeAnagram;
exports.permute = permute;
exports.allWords = allWords;