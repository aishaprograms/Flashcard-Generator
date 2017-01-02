module.exports.ClozeFlashcard = function(text, cloze) {
    this.type = 'cloze';
    this.text = text;
    this.cloze = cloze;
    this.displayFullText = function() {
        console.log(this.text);
    };
    this.displayPartialText = function() {
        var partialText = text.replace(cloze, '_____');
        if (!text.includes(cloze)) {
            console.log('Error: cannot figure out location of cloze deletion.');
        } else {
            console.log(partialText);
        }
    };
    this.displayCloze = function() {
        console.log(this.cloze);
    };
};
