# Portfolio — O melhor Dev

Portfolio personnel en HTML, CSS et JavaScript, avec une identité visuelle Dark Premium.

## Fichiers
- `index.html` : structure et contenu des sections.
- `style.css` : identité visuelle, mises en page, animations et adaptations mobiles.
- `script.js` : menu mobile, animations au défilement, filtres de projets et configuration des contacts.

## Lancer le portfolio
1. Décompresse l'archive.
2. Ouvre le dossier dans Visual Studio Code.
3. Ouvre `index.html` dans ton navigateur (ou utilise l'extension Live Server).

Le site fonctionne sans installation de dépendances. La police Google Fonts nécessite une connexion Internet ; des polices de secours sont prévues.

## Personnalisation indispensable avant publication
Ouvre `script.js` et remplace :
```js
const PORTFOLIO_CONFIG = {
  email: "ton.email@example.com",
  github: "",
  linkedin: ""
};
```
par ton adresse e-mail et tes URL réelles.

## Avant de partager le portfolio
- Vérifie ton nom et la façon dont tu veux écrire ta marque.
- Ajoute des captures d'écran réelles de tes projets.
- Vérifie que les descriptions correspondent à l'état réel des projets.
- Ajoute les liens GitHub et les démonstrations publiques disponibles.
- Ajuste les indicateurs de compétences selon ton niveau réel.
- Pour recevoir des messages directement sur le site, il faudra connecter un service de formulaire ou créer un backend. Le bouton e-mail utilise `mailto:`.

## Publication
Tu peux publier ce site statique sur GitHub Pages, Netlify ou un hébergement web classique. Aucune base de données n'est nécessaire pour cette version.
