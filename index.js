var basicFC = require('./basicFlashcard.js');
var clozeFC = require('./clozeFlashcard.js');
var fs = require('fs');
var inquirer = require('inquirer');

basicFC.BasicFlashcard.prototype.saveFlashcard = function() {
    fs.appendFile('flashcards.txt', '\n' + JSON.stringify(this), 'utf8', function(error) {
        if (error) {
            console.log(error);
        }
    });
};

clozeFC.ClozeFlashcard.prototype.saveFlashcard = function() {
    fs.appendFile('flashcards.txt', '\n' + JSON.stringify(this), 'utf8', function(error) {
        if (error) {
            console.log(error);
        }
    });
};

function reviewFlashcards() {
    fs.readFile('flashcards.txt', 'utf8', function(error, data) {
        if (error) throw error;
        var dataArr = data.split('\n');
        var flashcards = dataArr.map(function(datum) {
            if (datum !== '') {
                return JSON.parse(datum);
            }
        });
        var inquirerQuestions = flashcards.map(function(flashcard) {
            var question = {};
            question.type = 'input';
            question.name = 'flashcard';
            question.message = function() {
                if (flashcard.front) {
                    return flashcard.front;
                } else if (flashcard.partialText) {
                    return flashcard.partialText;
                }
            };
            return question;
        });
        var iteration = 0;
        var askQuestion = function() {
            if (iteration < inquirerQuestions.length) {
                inquirer.prompt(inquirerQuestions[iteration]).then(function(answers) {
                    console.log('Your answer is: ' + answers.flashcard);
                    if (flashcards[iteration].back) {
                        console.log('The correct answer is: ' + flashcards[iteration].back);
                    } else if (flashcards[iteration].text) {
                        console.log('The correct answer is: ' + flashcards[iteration].text);
                    }
                    iteration++;
                    askQuestion();
                });
            }
        };
        askQuestion();
    });
}

function addFlashcards() {
    var flashcardType = {
        type: 'list',
        name: 'fcType',
        choices: ['Basic', 'Cloze'],
        message: 'Which type of flashcard do you want to add?'
    };
    inquirer.prompt(flashcardType).then(function(answers) {
        if (answers.fcType === 'Basic') {
            var front;
            var back;
            inquirer.prompt({
                type: 'input',
                name: 'front',
                message: 'What is the front of the card?',
                validate: function(value) {
                    if (value !== '' && value !== null && value !== undefined) {
                        return true;
                    }
                    return 'Please enter a valid input';
                }
            }).then(function(answers) {
                front = answers.front;
                inquirer.prompt({
                    type: 'input',
                    name: 'back',
                    message: 'What is the back of the card?',
                    validate: function(value) {
                        if (value !== '' && value !== null && value !== undefined) {
                            return true;
                        }
                        return 'Please enter a valid input';
                    }
                }).then(function(answers) {
                    back = answers.back;
                    var newBasicFC = new basicFC.BasicFlashcard(front, back);
                    newBasicFC.saveFlashcard();
                });
            });
        } else if (answers.fcType === 'Cloze') {
            var text;
            var cloze;
            inquirer.prompt({
                type: 'input',
                name: 'text',
                message: 'What is the full text of the card?',
                validate: function(value) {
                    if (value !== '' && value !== null && value !== undefined) {
                        return true;
                    }
                    return 'Please enter a valid input';
                }
            }).then(function(answers) {
                text = answers.text;
                inquirer.prompt({
                    type: 'input',
                    name: 'cloze',
                    message: 'What is the cloze-deleted text of the card?',
                    validate: function(value) {
                        if (value !== '' && value !== null && value !== undefined) {
                            return true;
                        }
                        return 'Please enter a valid input';
                    }
                }).then(function(answers) {
                    cloze = answers.cloze;
                    var newClozeFC = new clozeFC.ClozeFlashcard(text, cloze);
                    newClozeFC.saveFlashcard();
                });
            });
        }
    });
}

var flashcardAppOptions = {
    type: 'list',
    name: 'option',
    message: 'Do you want to review or add a new flashcard?',
    choices: ['Review', 'Add']
};

inquirer.prompt(flashcardAppOptions).then(function(answers) {
    if (answers.option === 'Review') {
        reviewFlashcards();
    } else if (answers.option === 'Add') {
        addFlashcards();
    }
});
