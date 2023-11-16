const Color = Object.freeze({
    Green: 'green',
    Yellow: 'yellow',
    Black: 'black',
});

const colorCycle = [Color.Black, Color.Yellow, Color.Green];

const boxTemplate = document.createElement('template');
boxTemplate.innerHTML = `

<link rel="stylesheet" href="wordle-box.css" />

<button>
    <slot />
</button>

`;

class wordleBox extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(boxTemplate.content.cloneNode(true));

        this.button = shadow.querySelector('button');
        this.style.display = 'inline-block';
    }

    connectedCallback() {
        this.button.onclick = () => {
            const color = this.getAttribute('color');

            const cycleIndex = colorCycle.indexOf(color);

            // Cycles through the differnt colors wrapping back around to the
            // beginning, and if the color is invalid, it defaults to gray
            const newColor = colorCycle[(cycleIndex + 1) % colorCycle.length];
            this.setAttribute('color', newColor);
        };

        if (this.getAttribute('color') === null) {
            this.setAttribute('color', Color.Black);
        }
    }

    /** @param {string} name */
    attributeChangedCallback(name) {
        if (name === 'color') {
            if (!this.button) return;
            this.button.className = this.getAttribute('color') || Color.Black;
        }
    }

    static get observedAttributes() {
        return ['color'];
    }
}

customElements.define('wordle-box', wordleBox);
