# Flashcard-Generator
This is a backend app for a basic flashcard application that allows users to create two types of flashcards. 
index.js also includes a CLI app which uses inquirer to display the flashcards. 

## Technologies used
- node.js

## Getting Started
In order to use the CLI app, type in the following

```
node index.js
```
This displays two options:
```
Do you want to review or add a new flashcard?
Add
Review
```
Add: Adds a new flashcard which is saved as a stringified JSON object. There are two types of flashcards:Basic Flashcard
and Cloze-deleted Flashcard

Review: Uses inquirer to prompt the user about each flashcard. For a basic flashcard, it displays the front, pauses for the user to guess, then displays the back of the card. For a cloze-deleted flashcard, it displays the partial text, pauses for the user to guess, then displays the full text.

In order to use the backend app to store flashcards, enter one of the following:
```
var basicFlashcardName = new basicFC.BasicFlashcard(front, back);
var clozeFlashcardName = new clozeFC.ClozeFlashcard(text, cloze);
```
This creates an instance of a BasicFlashcard object or a ClozeFlashcard object. Both object prototypes take two parameters. This parameters are stored in the objects and can be displayed using the prototype's methods. 
For BasicFlashcard, in order to display the front and back, use the following methods:
```
basicFlashcardName.displayFront();
basicFlashcardName.displayBack();
```
For ClozeFlashcard, in order to display the full text, partial text, and cloze-deleted text, use the following methods:
```
clozeFlashcardName.displayFullText()
clozeFlashcardName.displayPartialText()
clozeFlashcardName.displayCloze()
```
The ClozeFlashcard.prototype.displayPartialText() method returns an error message if the cloze-deleted section cannot be detected.
In index.js, the method saveFlashcard has been added as a prototype method to both object constructors BasicFlashcard and ClozeFlashcard. It stringifies the JSON object and saves it in the flashcard.txt file. 
### Prerequisites

What to install and how for local development and testing purposes

```
- node.js: visit node.js and download...
- inquirer npm: npm install inquirer (included in package.json file)
```

## Default test (included in package.json file)

The default test is
```
node index.js
```

## Built With

* SublimeText

## Author

* **Aisha Ahmad** - [Aisha Ahmad](https://github.com/aishaprograms)
