class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.card_component_template = document.createElement("template");
    this.card_component_template.innerHTML = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card {
    position: relative;
    flex-flow: column;
    width: 20rem;
    max-width: 25rem;
    padding: 1rem;
    aspect-ratio: 16 / 9;
    justify-content: flex-end;
    cursor: pointer;
    border: var(--bordercard);
    border-top: 0.05rem solid var(--highlight);
    border-radius: 0.5rem;

    box-shadow: var(--shadow);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    overflow: hidden;
    transition: transform 0.4s ease;
  }

.overlay {
    position: absolute;
    min-width: 100%;
    height: 100%;
    background: var(--gradient);
    opacity: 0.7;
    bottom: 0;
    border-top: 0.05rem solid var(--highlight);

    transform: translateY(80%);
    transition: transform 0.4s ease, opacity 0.4s ease;

    color: var(--text);
}

.cardheader{
    text-align: center;
    padding: 0.25rem;
}

.card:hover .overlay {
    transform: translateY(0%);
    opacity: 1;
  }

.card:hover {
    opacity: 0.9;
    transform: scale(1.05);
}

.cardparagraph {
    text-align: center;
    padding: 0.5rem;
    color: var(--text-muted);
}
</style>
    <div class="card">
    </div>
      `
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.card_component_template.content.cloneNode(true));
    this.card = this.shadowRoot.querySelector('.card');
  }

  connectedCallback() {

    const href = this.getAttribute("href");
    const target = this.getAttribute("target");

    let cardHeader = this.querySelector('h1');
    let cardParagraph = this.querySelector('p');
    let cardImage = this.querySelector('img');

    const gradient = `linear-gradient(0deg, var(--bg-alpha) 95%, var(--bg-light-alpha))`;

    const imageUrl = cardImage?.getAttribute("src");
    if (imageUrl) {
        this.card.style.backgroundImage = `${gradient}, url(${imageUrl})`;
    }

    cardImage?.remove();

    cardHeader.classList.add("cardheader");
    cardParagraph.classList.add("cardparagraph");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.appendChild(cardHeader);

    this.card.appendChild(overlay);

    if (href) {
        this.card.addEventListener("click", () => {
            if (target === "_blank") {
                window.open(href, "_blank");
            } else {
                window.location.href = href;
            }
        });
    }

    if (cardParagraph) {
        overlay.appendChild(cardParagraph);
    }
  }
}


customElements.define('project-card', MyComponent);