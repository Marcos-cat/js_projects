import { wordleBox } from './wordle-box.js';
customElements.define('wordle-box', wordleBox);

const template = document.createElement('template');
template.innerHTML = '<wordle-box />';

export class wordleRow extends HTMLElement {
    constructor() {
        super();

        for (let i = 0; i < 5; i++) {
            this.append(template.content.cloneNode(true));
        }

        this.boxes = this.querySelectorAll('wordle-box');
    }

    connectedCallback() {
        if (!this.getAttribute('word')) {
            this.setAttribute('word', '');
        }
    }

    /** @param {string} name @param {string} _ @param {string} newValue */
    attributeChangedCallback(name, _, newValue) {
        if (name === 'word') {
            for (let i = 0; i < 5; i++) {
                if (!this.boxes) return;
                this.boxes[i].innerHTML = makeLengthFive(newValue)[i];
            }
        }
    }

    static get observedAttributes() {
        return ['word'];
    }
}

/** @param {string} str */
function makeLengthFive(str) {
    if (str.length >= 5) {
        return str.slice(0, 5);
    }

    const numberOfSpaces = 5 - str.length;
    const paddedString = str + Array(numberOfSpaces).fill(' ').join('');

    return paddedString;
}
