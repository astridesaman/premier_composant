// Déclaration d'un nouveau composant web personnalisé
class HelloWorld extends HTMLElement {
  constructor() {
    super();
    // Création du Shadow DOM pour encapsuler le style et le HTML
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Contenu HTML et CSS injecté dans le Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: sans-serif;
          display: block;
          padding: 1rem;
          max-width: 320px;
          margin: 2rem auto;
          color: #111;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        label {
          font-size: 0.9rem;
        }

        input, button {
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          transition: border-color 0.3s;
        }

        input:focus, button:focus {
          outline: none;
          border-color: #555;
        }

        button {
          background: #111;
          color: #fff;
          cursor: pointer;
        }

        button:hover {
          background: #333;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
        }

        #message {
          margin-top: 1rem;
          font-size: 1rem;
          color: #222;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        #message.visible {
          opacity: 1;
          transform: translateY(0);
        }
      </style>

      <!-- Formulaire HTML avec champ nom et deux boutons -->
      <form id="myForm" novalidate>
        <label for="name">Nom :</label>
        <input type="text" id="name" name="name" placeholder="Entrez votre nom" />
        <div class="button-group">
          <button type="submit">Envoyer</button>
          <button type="button" id="resetBtn">Réinitialiser</button>
        </div>
      </form>
      <!-- Message affiché dynamiquement -->
      <p id="message" aria-live="polite"></p>
    `;

    // Sélection des éléments nécessaires
    const form = this.shadowRoot.querySelector('#myForm');
    const nameInput = this.shadowRoot.querySelector('#name');
    const message = this.shadowRoot.querySelector('#message');
    const resetBtn = this.shadowRoot.querySelector('#resetBtn');

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Empêche le rechargement de la page

      const name = nameInput.value.trim(); // Récupère le nom sans espaces superflus

      // Vérifie si le champ est vide
      if (name === '') {
        message.textContent = "Veuillez entrer un nom.";
        message.classList.add("visible");
        return;
      }

      // Affiche un message personnalisé
      message.textContent = `Bonjour, ${name} ! 👋`;
      message.classList.add("visible");
    });

    // Gestion du bouton de réinitialisation
    resetBtn.addEventListener('click', () => {
      form.reset(); // Réinitialise le formulaire
      message.textContent = ''; // Vide le message
      message.classList.remove("visible"); // Retire la classe d'affichage
    });
  }
}

// Définition du composant <hello-world>
customElements.define('hello-world', HelloWorld);
