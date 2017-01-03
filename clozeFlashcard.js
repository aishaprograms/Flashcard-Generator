module.exports.ClozeFlashcard = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.displayFullText = function() {
        console.log(this.text);
    };
    this.displayPartialText = function() {
        var partialText = this.text.replace(this.cloze, '_____');
        if (!text.includes(this.cloze)) {
            return 'Error: cannot figure out location of cloze deletion.';
        } else {
            return partialText;
        }
    };
    this.partialText = this.displayPartialText();
    this.displayCloze = function() {
        console.log(this.cloze);
    };
};
