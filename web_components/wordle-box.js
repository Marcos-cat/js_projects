const Color = Object.freeze({
    Green: 'green',
    Yellow: 'yellow',
    Black: 'black',
    None: 'none',
});

const colorCycle = [Color.Black, Color.Yellow, Color.Green];

const template = document.createElement('template');
template.innerHTML = `

<link rel="stylesheet" href="wordle-box.css" />

<button>
    <slot />
</button>

`;

export class wordleBox extends HTMLElement {
    constructor() {
        super();

        const interactive = this.getAttribute('interactive') === 'true';

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));

        this.style.display = 'inline-block';

        this.button = shadow.querySelector('button');

        if (interactive) {
            this.button.onclick = () => {
                const color = this.getAttribute('color');

                const cycleIndex = colorCycle.indexOf(color);

                // Cycles through the different colors wrapping back around to the
                // beginning, and if the color is invalid, it defaults to gray
                const newColor =
                    colorCycle[(cycleIndex + 1) % colorCycle.length];
                this.setAttribute('color', newColor);
            };
        }
    }

    connectedCallback() {
        if (!this.getAttribute('color')) {
            this.setAttribute('color', Color.None);
        }
    }

    /** @param {string} name */
    attributeChangedCallback(name) {
        if (name === 'color') {
            if (!this.button) return;
            this.button.className = this.getAttribute('color') || Color.None;
        }
    }

    static get observedAttributes() {
        return ['color'];
    }
}
