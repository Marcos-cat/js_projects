import { wordleRow } from './wordle-row.js';
customElements.define('wordle-row', wordleRow);

const state = {
    row: 0,
    /** @type {string[]} */
    words: Array(6).fill(''),

    get word() {
        return this.words[this.row] || '';
    },

    set word(val) {
        if (this.row >= this.words.length) return;

        this.words[this.row] = val;
    },

    /** @param {string} letter */
    addToWord(letter) {
        if (this.word.length >= 5) return;

        this.word += letter;

        this.setWordAttributes();
    },

    backspace() {
        if (this.word === '') return;

        const word = this.word;
        this.word = word.substring(0, word.length - 1);

        this.setWordAttributes();
    },

    enter() {
        if (this.rowIsComplete) this.row += 1;
    },

    get rowIsComplete() {
        return this.word.length === 5;
    },

    setWordAttributes() {
        const row = document.querySelectorAll('wordle-row')[state.row];

        row.setAttribute('word', this.word);
    },
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/** @param {string} str */
function isLetter(str) {
    return str.length === 1 && alphabet.includes(str);
}

/** @param {KeyboardEvent} param */
function handleKeyboardInput({ key }) {
    if (state.row >= 6) return;

    if (isLetter(key)) state.addToWord(key);

    if (key === 'Backspace') state.backspace();

    if (key === 'Enter') state.enter();
}

document.body.addEventListener('keydown', handleKeyboardInput);
