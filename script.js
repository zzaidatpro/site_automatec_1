document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. GESTION DE LA SIDEBAR (MENU MOBILE)
    // ==========================================
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const menuLinks = sidebar ? sidebar.querySelectorAll('a, button') : [];

    if (openBtn && sidebar) {
        openBtn.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }
    menuLinks.forEach(link => {
        link.addEventListener('click', () => sidebar.classList.remove('open'));
    });


    // ==========================================
    // 2. DONNÉES DES OPTIONS DYNAMIQUES
    // ==========================================
    const optionsParService = {
        "videosurveillance": [
            { text: "Caméra HDCVI 5mp (+18 000 DA)", prix: 18000 },
            { text: "6MP WizColor Vari-focal Bullet WizMind Network Camera (+45 000 DA)", prix: 45000 },
            { text: "6MP WizColor Fixed-focal Eyeball WizMind Network Camera (+48 000 DA)", prix: 48000 },
            { text: "6MP WizColor Vari-focal Dome WizMind Network Camera (+48 000 DA)", prix: 48000 },
            { text: "6MP WizColor TiOC PRO Vari-focal Dome WizSense Network Camera (+48 000 DA)", prix: 48000 },
            { text: "4MP WizColor TiOC PRO Vari-focal Bullet WizSense Network Camera (+40 000 DA)", prix: 40000 },
            { text: "128CH 3U 16HDDs WizMind Network Video Recorder (+325 000 DA)", prix: 325000 },
            { text: "64CH 2U 8HDDs WizMind Network Video Recorder (+290 000 DA)", prix: 290000 },
            { text: "32CH 2U 8HDDs WizMind Network Video Recorder (+250 000 DA)", prix: 250000 }
        ],
        "alarme": [
            { text: "Détecteur de mouvement supplémentaire (+5 000 DA)", prix: 5000 },
            { text: "Sirène extérieure flash autonome (+12 000 DA)", prix: 12000 },
            { text: "Télécommande porte-clé additionnelle (+3 500 DA)", prix: 3500 }
        ],
        "controle-acces": [
            { text: "Lecteur de badge secondaire (+10 000 DA)", prix: 10000 },
            { text: "Gâche / Ventouse électromagnétique (+9 000 DA)", prix: 9000 },
            { text: "Lot de 10 badges RFID (+2 500 DA)", prix: 2500 }
        ],
        "incendie": [
            { text: "Détecteur de fumée supplémentaire (+6 000 DA)", prix: 6000 },
            { text: "Déclencheur manuel bris de glace BBG (+4 000 DA)", prix: 4000 },
            { text: "Bloc Autonome d'Éclairage de Sécurité BAES (+7 500 DA)", prix: 7500 }
        ]
    };


    // ==========================================
    // 3. GESTION DU CALCULATEUR DE DEVIS
    // ==========================================
    const serviceSelect = document.getElementById("service-type");
    const optionsContainer = document.getElementById("options-container");
    const rangeInput = document.getElementById("service-duree");
    const rangeValLabel = document.getElementById("duree-val");
    const totalDisplay = document.getElementById("total-estimation");
    const btnsDevis = document.querySelectorAll(".btn-devis");

    let totalGlobal = 0;

    // Fonction pour générer visuellement les cases à cocher selon le service choisi
    function actualiserLesLabelsDoptions() {
        if (!serviceSelect || !optionsContainer) return;

        const serviceChoisi = serviceSelect.value;
        optionsContainer.innerHTML = ""; // On vide les anciennes options

        // Correction apportée ici : utilisation de l'anti-slash \' pour éviter de casser la chaîne de texte
        if (serviceChoisi === "0" || !optionsParService[serviceChoisi]) {
            optionsContainer.innerHTML = '<p style="font-size: 13px; color: #94a3b8; font-style: italic;">Veuillez d\'abord choisir un service principal.</p>';
            calculerDevis();
            return;
        }

        // On crée les nouvelles cases à cocher basées sur notre dictionnaire de données
        optionsParService[serviceChoisi].forEach(option => {
            const labelEl = document.createElement("label");
            labelEl.className = "devis-checkbox-label";
            
            const checkboxEl = document.createElement("input");
            checkboxEl.type = "checkbox";
            checkboxEl.className = "option-check";
            checkboxEl.setAttribute("data-prix", option.prix);
            
            // Écouter le clic sur cette nouvelle case pour recalculer immédiatement le total
            checkboxEl.addEventListener("change", calculerDevis);

            labelEl.appendChild(checkboxEl);
            labelEl.appendChild(document.createTextNode(" " + option.text));
            
            optionsContainer.appendChild(labelEl);
        });

        // Recalculer le montant global immédiatement après le changement de structure
        calculerDevis();
    }

    // Fonction de calcul financier du montant total
    function calculerDevis() {
        if (!serviceSelect || !totalDisplay) return;

        let total = 0;
        const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
        let prixDeBase = parseFloat(selectedOption.getAttribute("data-prix")) || 0;

        let quantite = rangeInput ? (parseInt(rangeInput.value) || 1) : 1;
        if (rangeValLabel && rangeInput) {
            rangeValLabel.textContent = quantite;
        }

        // Ajout du prix de base
        total += prixDeBase;

        // Récupération et ajout des options nouvellement créées en cours de sélection
        const optionsCheckboxes = document.querySelectorAll(".option-check");
        optionsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                let prixOption = parseFloat(checkbox.getAttribute("data-prix")) || 0;
                // On multiplie les options par la quantité d'équipements globale choisie sur le curseur
                total += prixOption * quantite;
            }
        });

        totalGlobal = total;
        totalDisplay.textContent = total.toLocaleString('fr-FR');
    }

    // Comportement au clic sur "Demandez un devis" (Scroll fluide)
    btnsDevis.forEach(btn => {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionEstimateur = document.getElementById("estimateur");
            if (sectionEstimateur) {
                sectionEstimateur.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Écouteurs sur les changements utilisateur
    if (serviceSelect) serviceSelect.addEventListener("change", actualiserLesLabelsDoptions);
    if (rangeInput) rangeInput.addEventListener("input", calculerDevis);

    // Initialisation par défaut
    actualiserLesLabelsDoptions();


const openPopupBtn = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopup");

// Ouvrir le popup
openPopupBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");

  // Mettre à jour le contenu avec ton estimation existante
  const total = document.getElementById("total-estimation").textContent;
  document.getElementById("total-estimation-popup").textContent = total;

  const details = document.getElementById("details-estimation").innerHTML;
  document.getElementById("details-estimation-popup").innerHTML = `<table>${details}</table>`;
});

// Fermer le popup
closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Fermer si on clique en dehors du contenu
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});

});
