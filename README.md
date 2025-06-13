Climatiq CO₂ Tracker

Une application Vue 3 pour suivre et visualiser vos émissions de CO₂ liées au cloud (AWS), aux vols et à votre consommation d’électricité.
🚀 Démarrage
Prérequis

    Node.js (v16+ recommandé) et npm ou Yarn

    Clé API Climatiq

    Instance Supabase (authentification & BDD)

Installation

    Clonez ce dépôt

git clone https://github.com/votre-orga/climatiq-co2-tracker.git
cd climatiq-co2-tracker

Installez les dépendances

npm install
# ou
yarn install

Créez un fichier .env à la racine du projet, contenant :

VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLIMATIQ_API_KEY=your-climatiq-api-key

Lancez le serveur de développement

    npm run dev
    # ou
    yarn dev

    Ouvrez votre navigateur à l’adresse : http://localhost:5173

📦 Scripts disponibles
Commande	Description
npm run dev	Démarre Vite en mode développement
npm run build	Compile TypeScript et produit le build (dist/)
npm run preview	Prévisualise le build en local
🌐 Variables d’environnement
Clé	Description
VITE_SUPABASE_URL	URL de votre instance Supabase
VITE_SUPABASE_ANON_KEY	Clé publique Supabase (anon key)
VITE_CLIMATIQ_API_KEY	Clé API Climatiq
🛠️ Stack & dépendances

    Framework : Vue 3 + Composition API

    Routing : vue-router

    State & BDD : Supabase JS

    UI : Tailwind CSS

    Graphiques : Chart.js + vue-chartjs

    Build & Dev : Vite, TypeScript

📁 Structure du projet

src/
├─ lib/
│  ├─ cloud.ts           # calculs AWS → CPU, RAM, storage
│  ├─ flight.ts          # endpoint de Travel (remplace l’ancien flight déprécié)
│  ├─ electricity.ts     # endpoint Energy V1 pour l’électricité
│
├─ components/
│  ├─ CloudForm.vue
│  ├─ FlightForm.vue
│  ├─ ElectricityForm.vue
│  ├─ CO2Result.vue
│  ├─ RecentResults.vue
│  └─ charts/
│     └─ CO2BarChart.vue
│
├─ pages/
│  ├─ DashboardView.vue
│  ├─ HistoriqueView.vue
│  └─ StatsView.vue
│
├─ App.vue
└─ main.ts

✨ Fonctionnalités

    Cloud : calcul d’émissions CPU, RAM et stockage AWS via Climatiq

    Vols : distance et émissions directes/indirectes via l’endpoint Travel (flight déprécié)

    Électricité : scope 2 & 3.3 via l’endpoint Energy V1 de Climatiq

    Historique : enregistrement et affichage des 50 derniers calculs

    Statistiques : graphiques interactifs et comparaisons

    Note
    L’ancien endpoint flight de Climatiq est marqué comme déprécié. Nous utilisons à la place l’endpoint Travel pour le calcul des distances et émissions de vol.

🤝 Contribution

Les Pull Requests sont les bienvenues !
Merci de respecter :

    La structure du projet et les conventions Tailwind

    La Composition API Vue 3

    La configuration .env pour garder les clés secrètes

© 2025 Projet d’étude EFREI – Climatiq CO₂ Tracker
