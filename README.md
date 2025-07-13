# 🌍 WorldScope — Les merveilles du monde

**WorldScope** est une application web interactive qui permet d'explorer les sites historiques, merveilles naturelles, conflits et zones à risque partout dans le monde. Profitez d'une expérience immersive, d'une carte interactive et d'un globe 3D pour découvrir, filtrer et approfondir vos connaissances sur notre planète.

> 🚀 Projet collaboratif réalisé par [Slingo](https://github.com/Slingod), [Jade](https://github.com/Jade-m22), [Jeremy](https://github.com/jeremyfonnard), et [Gaetan](https://github.com/GaetanBordes).

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack & Dépendances](#stack--dépendances)
- [Installation](#installation)
- [Commandes de développement](#commandes-de-développement)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Screenshots](#screenshots)
- [Auteurs](#auteurs)
- [Licence](#licence)

---

## 🌐 Aperçu

- **Carte interactive** : Affichage mondial des monuments, incidents, zones à visiter/éviter…
- **Globe 3D** : Mode planétaire immersif grâce à [globe.gl](https://github.com/vasturiano/globe.gl)
- **Filtrage avancé** : Type, statut, année, recherche instantanée
- **Popups détaillées** : Infos, anecdotes, sources, coordonnées, etc.
- **Design responsive** : Utilisable sur desktop & mobile
- **Expérience utilisateur fluide & moderne**

---

## ✨ Fonctionnalités

- Recherche et filtrage dynamique
- Timeline interactive pour filtrer par année
- Switch carte 2D / globe 3D
- Données géolocalisées enrichies
- Interface claire, dark mode inspiré "néo-futuriste"
- Expérience optimisée pour tous supports

---

## ⚙️ Stack & Dépendances

- **React 18+** — UI réactive
- **Vite** — Build ultra rapide
- **SCSS** — Style avancé, responsive et modulable
- **JavaScript ES6+**
- **React Router Dom** — Routing frontend
- **Leaflet** — Cartographie 2D interactive
- **Globe.gl** — Visualisation 3D de la Terre (WebGL, Three.js)
- **@fortawesome** — Icônes modernes
- **Autres** : [voir package.json](./package.json)

---

## 🚀 Installation

1. **Cloner le repo**
   ```sh
   git clone https://github.com/Jade-m22/Worldscope_Project.git
   cd Worldscope_Project
   ```
2. **Installer les dépendances**

```sh
npm install
# ou
yarn install

```

3. **Lancer le projet en développement**

```sh
npm run dev
# ou
yarn dev
```

4. **Ouvrir dans le navigateur**
   > L'application sera accessible sur http://localhost:5173

### 💻 Commandes de développement

- **Démarrer en dev**

```sh
npm run dev

```

- **Build production**

```sh
npm run build

```

- **Preview du build**

```sh
npm run preview

```

- **Format & lint**

```sh
npm run lint

```

#### 📁 Structure du projet

```txt
Worldscope_Project/
│
├── public/                # Assets statiques (icônes, images)
├── src/
│   ├── components/        # Composants React (Header, Map, Filters, Globe, etc)
│   ├── data/              # Données (événements, listes, etc)
│   ├── hooks/             # Hooks personnalisés
│   ├── layouts/           # Layouts principaux (ex : MainLayout)
│   ├── styles/            # Fichiers SCSS globaux et partiels
│   ├── utils/             # Fonctions utilitaires (filtrage, pays, flags, etc)
│   ├── App.jsx            # Entrée principale de l’app
│   ├── main.jsx           # Point d’entrée React/Vite
│   └── index.html         # Template HTML principal
├── package.json
└── README.md
```

#### 👥 Contribuer

Les contributions, issues et suggestions sont bienvenues !
Pour participer :

1. Fork le repo

2. Crée une branche feature

3. Push et ouvre une pull request
