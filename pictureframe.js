// hämta alla nödvändiga element för pilfunktioner
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.card_component_template = document.createElement("template");
    this.card_component_template.innerHTML = `
    <style>
    :host {
      display: block;
      --frame-height: 20rem;
      border: var(--bordercard);
      border-top: 0.05rem solid var(--highlight);
      border-radius: 0.5rem;

      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      max-height: var(--frame-height);
      aspect-ratio: 2 / 1;
      margin: auto;
      position: relative;
      overflow: hidden;
    }

    .imgBox {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      transition: transform 0.5s ease;
      will-change: transform;
    }
    
    img {
      min-width: 100%;
      min-height:100%;
      object-fit: cover;
    }

    .arrow {
      position: absolute;
      height: 100%;
      width: 3rem;
      align-items: center;
      justify-content: center;
      display: flex;
      cursor: pointer;
      z-index: 10;
      color: var(--text-muted);
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.3s ease;
    }

    .arrow:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    #leftarrow {
      left: 0rem;
    }

    #rightarrow {
      right: 0rem;
    }
    </style>

    <div class="wrapper">
      <div class="arrow" id="leftarrow">
        <svg id="back-icon" viewBox="0 0 24 24" width="24" height="24" aria-label="Go back" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M15 18l-6-6 6-6"/>
        </svg>
      </div>

      <div class="imgBox">
      </div>

      <div class="arrow" id="rightarrow">
        <svg id="forward-icon" viewBox="0 0 24 24" width="24" height="24" aria-label="Go forward" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.card_component_template.content.cloneNode(true));
  }

  connectedCallback() {

    const leftArrow = this.shadowRoot.getElementById('leftarrow');
    const rightArrow = this.shadowRoot.getElementById('rightarrow');
    const imgBox = this.shadowRoot.querySelector('.imgBox');

    const lightImgs = Array.from(this.querySelectorAll('img'));

    this._images = lightImgs.map((img, index) => {
      const clone = img.cloneNode(true);
      clone.style.width = '100%'; // ensure same width
      imgBox.appendChild(clone);
      return clone;
    });

    this.querySelectorAll('img').forEach(img => {
      img.remove();
    });

    console.log(lightImgs);

    this._currentIndex = 0;

    const slideTo = (index) => {
      const slideWidth = imgBox.clientWidth;
      imgBox.style.transform = `translateX(-${index * slideWidth}px)`;
      this._currentIndex = index;
    }

    const next = () => {
      this._currentIndex = (this._currentIndex + 1) % lightImgs.length;
      slideTo(this._currentIndex);
    };

    const prev = () => {
      this._currentIndex = (this._currentIndex - 1 + lightImgs.length) % lightImgs.length;
      slideTo(this._currentIndex);
    };

    leftArrow.addEventListener('click', prev);
    rightArrow.addEventListener('click', next);

    if (lightImgs.length > 0) {
      slideTo(this._currentIndex);
      this._interval = setInterval(next, 3000);
      console.log("hello", this._currentIndex);
    }
  }

  disconnectedCallback() {
  clearInterval(this._interval);
  }
}

customElements.define('picture-frame', MyComponent);