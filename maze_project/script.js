class Cell extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const s = this.style;
        s.position = 'absolute';
        s.backgroundColor = 'black';

        const size = +(this.getAttribute('size') || '');
        s.width = `${size}px`;
        s.height = `${size}px`;
    }

    /** @param {string} name @param {string} oldValue @param {string} newValue */
    attributeChangedCallback(name, oldValue, newValue) {}

    static get observedAttributes() {
        return ['size'];
    }
}

customElements.define('maze-cell', Cell);
