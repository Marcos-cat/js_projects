const Color = /** @type {const} */ ({
    Green: 'green',
    Yellow: 'yellow',
    Black: 'black',
    None: 'none',
});

const colorCycle = /** @type {const} */ [
    Color.Black,
    Color.Yellow,
    Color.Green,
];

const interactiveTemplate = document.createElement('template');
const nonInteractiveTemplate = document.createElement('template');
const commonHTML = `<link rel="stylesheet" href="wordle-box.css" />`;

interactiveTemplate.innerHTML = `

${commonHTML}

<button class="box">
    <slot />
</button>
`;

nonInteractiveTemplate.innerHTML = `

${commonHTML}

<div class="box">
    <span><slot /></span>
</div>
`;

export class wordleBox extends HTMLElement {
    constructor() {
        super();

        const interactive = this.getAttribute('interactive') === 'true';

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(
            (interactive
                ? interactiveTemplate
                : nonInteractiveTemplate
            ).content.cloneNode(true),
        );

        this.box = shadow.querySelector('.box');

        if (interactive) {
            if (!this.box) return;

            this.box.addEventListener('click', () => {
                let color = this.getAttribute('color') || '';

                // @ts-ignore
                const cycleIndex = colorCycle.indexOf(color);

                // Cycles through the different colors; defaults to Color.Black
                const newColor =
                    colorCycle[(cycleIndex + 1) % colorCycle.length];
                this.setAttribute('color', newColor);
            });
        }
    }

    // Default color attribute is Color.None
    connectedCallback() {
        if (!this.getAttribute('color')) {
            this.setAttribute('color', Color.None);
        }
    }

    /** @param {string} name */
    attributeChangedCallback(name) {
        if (name === 'color') {
            if (!this.box) return;

            this.box.setAttribute(
                'data-color',
                this.getAttribute('color') || Color.None,
            );
        }
    }

    static get observedAttributes() {
        return ['color'];
    }
}
