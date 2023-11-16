const rowTemplate = document.createElement('template');
rowTemplate.innerHTML = '<wordle-box>';

class wordleRow extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        for (let i = 0; i < 5; i++) {
            shadow.append(rowTemplate.content.cloneNode(true));
        }

        this.boxes = shadow.querySelectorAll('wordle-box');
        this.style.display = 'block';
        this.style.padding = 'none';
    }

    connectedCallback() {
        console.log('connected');
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

customElements.define('wordle-row', wordleRow);

/** Modifies `str` to be a string of length 5.
 * This is done by either returning
 *
 * ```javascript
 * str.slice(0, 5)
 * ```
 *
 * or by adding trailing spaces
 * @param {string} str
 * @returns {string} A string with length of `5`
 */
function makeLengthFive(str) {
    if (str.length >= 5) {
        return str.slice(0, 5);
    }

    const numberOfSpaces = 5 - str.length;
    const paddedString = str + Array(numberOfSpaces).fill(' ').join('');

    return paddedString;
}
