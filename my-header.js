class MyHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.sunIcon = `
      <svg id="darkmode-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M 12 0 C 11.4 0 11 0.4 11 1 L 11 2 C 11 2.6 11.4 3 12 3 C 12.6 3 13 2.6 13 2 L 13 1 C 13 0.4 12.6 0 12 0 z M 4.1992188 3.1992188 C 3.9492188 3.1992187 3.7 3.3 3.5 3.5 C 3.1 3.9 3.1 4.5003906 3.5 4.9003906 L 4.1992188 5.5996094 C 4.5992187 5.9996094 5.1996094 5.9996094 5.5996094 5.5996094 C 5.9996094 5.1996094 5.9996094 4.5992188 5.5996094 4.1992188 L 4.9003906 3.5 C 4.7003906 3.3 4.4492188 3.1992188 4.1992188 3.1992188 z M 19.800781 3.1992188 C 19.550781 3.1992188 19.299609 3.3 19.099609 3.5 L 18.400391 4.1992188 C 18.000391 4.5992187 18.000391 5.1996094 18.400391 5.5996094 C 18.800391 5.9996094 19.400781 5.9996094 19.800781 5.5996094 L 20.5 4.9003906 C 20.9 4.5003906 20.9 3.9 20.5 3.5 C 20.3 3.3 20.050781 3.1992188 19.800781 3.1992188 z M 12 5 A 7 7 0 0 0 5 12 A 7 7 0 0 0 12 19 A 7 7 0 0 0 19 12 A 7 7 0 0 0 12 5 z M 1 11 C 0.4 11 0 11.4 0 12 C 0 12.6 0.4 13 1 13 L 2 13 C 2.6 13 3 12.6 3 12 C 3 11.4 2.6 11 2 11 L 1 11 z M 22 11 C 21.4 11 21 11.4 21 12 C 21 12.6 21.4 13 22 13 L 23 13 C 23.6 13 24 12.6 24 12 C 24 11.4 23.6 11 23 11 L 22 11 z M 4.9003906 18.099609 C 4.6503906 18.099609 4.3992188 18.200391 4.1992188 18.400391 L 3.5 19.099609 C 3.1 19.499609 3.1 20.1 3.5 20.5 C 3.9 20.9 4.5003906 20.9 4.9003906 20.5 L 5.5996094 19.800781 C 5.9996094 19.400781 5.9996094 18.800391 5.5996094 18.400391 C 5.3996094 18.200391 5.1503906 18.099609 4.9003906 18.099609 z M 19.099609 18.099609 C 18.849609 18.099609 18.600391 18.200391 18.400391 18.400391 C 18.000391 18.800391 18.000391 19.400781 18.400391 19.800781 L 19.099609 20.5 C 19.499609 20.9 20.1 20.9 20.5 20.5 C 20.9 20.1 20.9 19.499609 20.5 19.099609 L 19.800781 18.400391 C 19.600781 18.200391 19.349609 18.099609 19.099609 18.099609 z M 12 21 C 11.4 21 11 21.4 11 22 L 11 23 C 11 23.6 11.4 24 12 24 C 12.6 24 13 23.6 13 23 L 13 22 C 13 21.4 12.6 21 12 21 z"/>
      </svg>`;

    this.moonIcon = `
      <svg id="darkmode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24" aria-label="Toggle dark mode">
        <path fill="currentColor"
          d="M87.823 60.7c-.463-.423-1.142-.506-1.695-.214-15.834 8.398-35.266 2.812-44.232-12.718-8.966-15.53-4.09-35.149 11.101-44.665.531-.332.796-.963.661-1.574-.134-.612-.638-1.074-1.259-1.153-9.843-1.265-19.59.692-28.193 5.66C13.8 12.041 6.356 21.743 3.246 33.35S1.732 57.08 7.741 67.487c6.008 10.407 15.709 17.851 27.316 20.961C38.933 89.486 42.866 90 46.774 90c7.795 0 15.489-2.044 22.42-6.046 8.601-4.966 15.171-12.43 18.997-21.586.242-.578.094-1.245-.368-1.668z"/>
      </svg>`;

  }

  connectedCallback() {
    const type = this.getAttribute("type") || "home";
    const projectTitle = this.getAttribute("title") || "";

    const styles = `
      <style>
        header {
          display: flex;
          background-color: var(--bg-light);
          padding: 1rem 2rem;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        h1{
          font-size: var(--font-size-5);
          max-width: fit-content;
          line-height: 1em;
          color: var(--primary);
        }

        #back-icon {
          width: 4rem;
          height: 4rem;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .icon:hover #back-icon {
          color: var(--primary);
        }

        body.dark #back-icon{
          color: var(--text-muted);
        }

        .icon {
          max-width: 5%;
          align-content: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .icon:hover {
          transform: translateY(-0.5rem);
        }

        .icon:hover #darkmode-icon {
          color: var(--primary);
        }

        body.dark #darkmode-icon{
          color: var(--text-muted);
        }

        .header-controls {
          display: flex;
          align-items: center;
        }
        
        nav {
          display: flex;
          align-items: center;
          gap: 5rem;
          padding: 0rem 2rem;
        }

        nav a {
          position: relative;
          font-size: var(--font-size-3);
          color: var(--text);
          text-decoration: none;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        nav a::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          left: 0;
          bottom: -2px;
          background-color: var(--secondary);
          transition: width 0.3s ease-in, transform 0.3s ease;
        }

        nav a:hover {
          color: var(--secondary);
          transform: translateY(-0.5rem);
        }

        nav a:hover::after {
          width: 100%;
          transform: translateY(-0.5rem);
        }

        #darkmode-icon {
          width: 2rem;
          height: 2rem;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background-color: var(--text-muted);
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        a.icon {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        /* Mobile Styles */
        @media (max-width: 1049px) {
          header {
            flex-wrap: wrap;
          }

          .hamburger {
            display: flex;
          }

          nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background-color: var(--bg-light);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 3rem;
            padding: 0;
            transition: left 0.3s ease;
            z-index: 1000;
          }

          nav.active {
            left: 0;
          }

          nav a {
            font-size: 2rem;
            padding: 1rem;
          }

          nav a:hover {
            transform: none;
          }

          nav a:hover::after {
            transform: none;
          }

          .header-controls {
            order: 3;
          }

          h1 {
            font-size: 2rem;
          }

          .icon {
            max-width: none;
          }

          #darkmode-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      </style>
    `;

    const homeMarkup = `
      <header>
        <h1>Isac Lindh</h1>
        <nav id="nav-menu">
          <a href="#home">Home</a>
          <a href="#about">About me</a>
          <a href="#projects">Projects</a>
          <a href="#site-footer">Contact me</a>
        </nav>
        <div class="header-controls">
          <div class="hamburger" id="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button class="icon dark-toggle" aria-label="Toggle dark mode"></button>
        </div>
      </header>
    `;

    const projectMarkup = `
      <header>
        <a href="../../" class="icon" aria-label="Go back">
          <svg id="back-icon" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M15 18l-6-6 6-6"/>
          </svg>
        </a>
        <h1>${projectTitle}</h1>
        <button class="icon dark-toggle" aria-label="Toggle dark mode"></button>
      </header>
    `;

    this.shadowRoot.innerHTML = styles + (type === "project" ? projectMarkup : homeMarkup);

    // Setup hamburger menu for home type
    if (type !== "project") {
      const hamburger = this.shadowRoot.querySelector('#hamburger-menu');
      const nav = this.shadowRoot.querySelector('#nav-menu');
      const navLinks = this.shadowRoot.querySelectorAll('nav a');

      if (hamburger && nav) {
        hamburger.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log("burgermenu clicked");
          hamburger.classList.toggle('active');
          nav.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
          });
        });

        // Close menu when clicking outside - use a timeout to avoid immediate closure
        setTimeout(() => {
          document.addEventListener('click', (e) => {
            const headerElement = this.shadowRoot.querySelector('header');
            if (headerElement && !headerElement.contains(e.target)) {
              hamburger.classList.remove('active');
              nav.classList.remove('active');
            }
          });
        }, 100);
      }
    }

    // Setup dark mode toggle button
    const btn = this.shadowRoot.querySelector(".dark-toggle");
    if (!btn) return;

    const updateIcon = () => {
      const isDark = document.body.classList.contains("dark");
      btn.innerHTML = isDark ? this.sunIcon : this.moonIcon;
    };

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      updateIcon();
    });

    updateIcon();
  }
}

customElements.define("my-header", MyHeader);