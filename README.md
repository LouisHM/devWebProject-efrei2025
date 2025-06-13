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

📦 Scripts disponibles
Commande	Description
npm run dev	Démarre Vite en mode développement
npm run build	Compile TypeScript et produit le build (dist/)
npm run preview	Prévisualise le build en local

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

    Vols : distance et émissions directes/indirectes via l’endpoint Travel (⚠️flight déprécié⚠️)

    Électricité : scope 2 & 3.3 via l’endpoint Energy V1 de Climatiq

    Historique : enregistrement et affichage des 50 derniers calculs

    Statistiques : graphiques interactifs et comparaisons

    Note
    L’ancien endpoint flight de Climatiq est marqué comme déprécié. Nous utilisons à la place l’endpoint Travel pour le calcul des distances et émissions de vol.

© 2025 Projet d’étude EFREI – Climatiq CO₂ Tracker
