# 🌱 Climatiq CO₂ Tracker

Une application Vue 3 moderne pour suivre et visualiser vos émissions de CO₂ liées au cloud computing (AWS), aux transports aériens et à votre consommation d'électricité. Prenez conscience de votre empreinte carbone numérique et énergétique grâce à des données précises et des visualisations interactives.

## ✨ Fonctionnalités principales

- **☁️ Cloud Computing** : Calcul des émissions CO₂ pour vos ressources AWS (CPU, RAM, stockage)
- **✈️ Transport aérien** : Estimation des émissions directes et indirectes de vos vols ( ⚠️ endpoint Travel, flight est deprecated)
- **⚡ Consommation électrique** : Analyse des émissions scope 2 & 3.3 liées à votre électricité
- **📊 Historique complet** : Sauvegarde et consultation de vos 50 derniers calculs
- **📈 Statistiques avancées** : Graphiques interactifs et analyses comparatives
( ⚠️ certains comme la tendance de co2 sur le temps, nécessite de se connecter plusieurs jours différents)
- **🔐 Authentification sécurisée** : Gestion des utilisateurs via Supabase
( ⚠️ Si jamais la base ne marche pas, n'hesitez pas à nous contacter il faut que nous nous connections sur Supabase)

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** v16+ (recommandé : v18+)
- **Gestionnaire de paquets** : npm, yarn ou pnpm
- **Clé API Climatiq** (fournie dans le dépôt)
- **Base de données Supabase** configurée (détails fournis)

### Installation

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/votre-orga/climatiq-co2-tracker.git
   cd climatiq-co2-tracker
   ```

2. **Installez les dépendances**
   ```bash
   # Avec npm
   npm install
   
   # Avec yarn
   yarn install
   
   # Avec pnpm
   pnpm install
   ```

3. **Configurez les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditez le fichier .env avec vos clés API
   ```

4. **Lancez l'application**
   ```bash
   npm run dev
   ```

### 🌐 Démonstration en ligne

L'application est déployée et accessible à l'adresse : **https://efrei-climatiq.pages.dev/**

## 📦 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise la version de production |
| `npm run lint` | Vérifie la qualité du code |
| `npm run test` | Lance les tests unitaires |

## 📁 Architecture du projet

```
src/
├── 🛠️ lib/
│   ├── cloud.ts          # Calculs émissions AWS (CPU, RAM, stockage)
│   ├── flight.ts         # API Travel Climatiq (remplace flight déprécié)
│   ├── electricity.ts    # API Energy V1 pour l'électricité
│   └── supabase.ts       # Configuration base de données
│
├── 🧩 components/
│   ├── forms/
│   │   ├── CloudForm.vue
│   │   ├── FlightForm.vue
│   │   └── ElectricityForm.vue
│   ├── results/
│   │   ├── CO2Result.vue
│   │   └── RecentResults.vue
│   └── charts/
│       └── CO2BarChart.vue
│
├── 📄 pages/
│   ├── DashboardView.vue    # Tableau de bord principal
│   ├── HistoriqueView.vue   # Historique des calculs
│   └── StatsView.vue        # Statistiques et analyses
│
├── 🎨 assets/
│   ├── styles/
│   └── images/
│
├── App.vue
└── main.ts
```

## 🔧 Technologies utilisées

- **Frontend** : Vue 3 + TypeScript + Vite
- **Styling** : Tailwind CSS / CSS Modules
- **Graphiques** : Chart.js / D3.js
- **API** : Climatiq API v1
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Déploiement** : Cloudflare

## 📊 APIs et endpoints utilisés

### Climatiq API
- **Cloud** : Endpoint Computing pour les ressources AWS
- **Transport** : Endpoint Travel (⚠️ remplace l'ancien endpoint `flight` déprécié)
- **Électricité** : Endpoint Energy V1 pour les calculs scope 2 & 3.3

### Supabase
- **Authentification** : Gestion des sessions utilisateur et authentification 
- **Base de données** : Stockage des calculs et historiques

## 🚨 Notes importantes

> ⚠️ **Endpoint déprécié** : L'ancien endpoint `flight` de Climatiq est marqué comme déprécié. Cette application utilise le nouvel endpoint `Travel` pour tous les calculs liés aux transports aériens.

---

Climatiq CO₂ Tracker - Projet d'étude Efrei

[![Made with Vue.js](https://img.shields.io/badge/Made%20with-Vue.js-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)

[![Powered by Climatiq](https://img.shields.io/badge/Powered%20by-Climatiq-green?style=flat)](https://climatiq.io/)

[![Database by Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

