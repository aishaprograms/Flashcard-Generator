var basicFC = require('./basicFlashcard.js');
var clozeFC = require('./clozeFlashcard.js');
var fs = require('fs');

basicFC.BasicFlashcard.prototype.saveFlashcard = function() {
    fs.appendFile('log.txt', JSON.stringify(this) + '\n', function(error) {
        if (error) {
            console.log(error);
        }
    });
};

clozeFC.ClozeFlashcard.prototype.saveFlashcard = function() {
    fs.appendFile('log.txt', JSON.stringify(this) + '\n', function(error) {
        if (error) {
            console.log(error);
        }
    });
};

var GW = new basicFC.BasicFlashcard('George Washington ', 'was the first president');
GW.displayFront();
GW.displayBack();
GW.saveFlashcard();


var AL = new clozeFC.ClozeFlashcard('The 16th President, Abraham Lincoln, freed the slaves', 'Abraham Lincoln');
AL.displayPartialText();
AL.displayCloze();
AL.displayFullText();
AL.saveFlashcard();
