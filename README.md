# 🚀 FMP - Gestion de Réparations de Téléphones

Application complète de gestion d'atelier de réparation de téléphones construite avec **Next.js 15** et **Strapi 5**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5-purple)](https://strapi.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)](https://tailwindcss.com/)

---

## 📋 Démarrage Rapide

### ⚡ En 3 étapes :

1. **Backend Strapi** (Déjà démarré ✅)
   - Ouvrez http://localhost:1337/admin
   - Créez votre compte administrateur

2. **Configurer les permissions** (5 minutes)
   - Settings → Users & Permissions → Roles → Public
   - Activez : `home-page` (find), `subscription-plan` (find, findOne)

3. **Frontend Next.js**
   ```bash
   cd fmp-app
   npm run dev
   ```
   - Ouvrez http://localhost:3000

📖 **Guide détaillé** : Consultez [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md)

---

## ✨ Fonctionnalités

### Pages Complètes ✅
- 🏠 **Landing Page** - Design moderne avec hero section et fonctionnalités
- 💳 **Abonnement** - Plans Lite (29€) et Premium (79€)
- 🔧 **Services** - 8 services de réparation détaillés
- 📧 **Contact** - Formulaire et informations de contact
- 🧪 **Exemple Strapi** - Démo d'intégration API

### Composants UI ✅
- Buttons (6 variantes)
- Cards (header, content, footer)
- Badges
- Header avec navigation
- Footer complet

### Backend Strapi ✅
- Content Type "Home Page" (Single Type)
- Content Type "Subscription Plans" (Collection)
- API REST configurée
- Permissions publiques

---

## 📦 Structure du Projet

```
FMP/
├── 🎨 fmp-app/              Frontend Next.js 15
│   ├── app/
│   │   ├── page.tsx         Landing page
│   │   ├── subscription/    Page abonnement
│   │   ├── services/        Page services
│   │   ├── contact/         Page contact
│   │   └── layout.tsx       Layout global
│   ├── components/
│   │   ├── ui/              Composants shadcn/ui
│   │   └── custom/          Header, Footer
│   ├── data/
│   │   └── services/        Service Strapi
│   └── lib/                 Utilitaires
│
└── 🔧 backend/              Backend Strapi 5
    └── src/
        ├── api/
        │   ├── home-page/   Content type Home Page
        │   └── subscription-plan/  Content type Plans
        └── components/      Composants réutilisables
```

---

## 🛠️ Installation Complète

### Prérequis
- Node.js 18+
- npm ou yarn

### Backend Strapi

```bash
cd backend
npm install
npm run develop
```

**URL** : http://localhost:1337  
**Admin** : http://localhost:1337/admin

### Frontend Next.js

```bash
cd fmp-app
npm install
npm run dev
```

**URL** : http://localhost:3000

---

## 🎨 Technologies

### Frontend
- ⚡ **Next.js 15** - Framework React
- 🎨 **shadcn/ui** - Composants UI
- 🎯 **TypeScript** - Typage statique
- 💅 **Tailwind CSS 4** - Styling
- 🎭 **Lucide React** - Icônes

### Backend
- 🔧 **Strapi 5** - Headless CMS
- 📝 **TypeScript** - Typage statique
- 💾 **SQLite** - Base de données (dev)

---

## 📡 API Endpoints

### Home Page
```bash
GET http://localhost:1337/api/home-page
GET http://localhost:1337/api/home-page?populate=*
```

### Subscription Plans
```bash
GET http://localhost:1337/api/subscription-plans
GET http://localhost:1337/api/subscription-plans?populate=*
```

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| 📖 [README.md](README.md) | Ce fichier - Vue d'ensemble |
| ⚡ [DEMARRAGE_RAPIDE.md](DEMARRAGE_RAPIDE.md) | Guide en 3 étapes |
| 🎉 [BIENVENUE.md](BIENVENUE.md) | Introduction visuelle |
| 📋 [GUIDE_DEMARRAGE.md](GUIDE_DEMARRAGE.md) | Guide détaillé |
| 🔗 [LIENS_IMPORTANTS.md](LIENS_IMPORTANTS.md) | Toutes les URLs |
| 📊 [PROJET_COMPLETE.md](PROJET_COMPLETE.md) | Récapitulatif complet |
| 🔧 [fmp-app/STRAPI_SETUP.md](fmp-app/STRAPI_SETUP.md) | Configuration Strapi |

---

## 🎯 Roadmap

### ✅ Phase 1 - Complétée
- [x] Installation Next.js 15 & Strapi 5
- [x] Configuration shadcn/ui
- [x] Landing page moderne
- [x] Page d'abonnement
- [x] Page services
- [x] Page contact
- [x] Content types Strapi
- [x] Documentation complète

### 🔄 Phase 2 - En cours
- [ ] Intégration Strapi dans les pages
- [ ] Authentification utilisateurs
- [ ] Dashboard utilisateur

### 📅 Phase 3 - À venir
- [ ] Gestion des réparations
- [ ] Base de données clients
- [ ] Système de paiement (Stripe)
- [ ] Statistiques et rapports
- [ ] Notifications

---

## 🎨 Design

### Palette de couleurs
- **Primary** : Noir/Blanc (adaptatif)
- **Accents** : Bleu, Violet, Vert, Orange, Rouge, Indigo
- **Background** : Blanc / Gris foncé (dark mode)

### Caractéristiques
- ✅ Responsive (Mobile, Tablet, Desktop)
- ✅ Dark mode natif
- ✅ Animations smooth
- ✅ Gradients modernes
- ✅ Icons Lucide React

---

## 🔧 Commandes Utiles

### Développement
```bash
# Backend
cd backend && npm run develop

# Frontend
cd fmp-app && npm run dev
```

### Production
```bash
# Backend
cd backend && npm run build && npm run start

# Frontend
cd fmp-app && npm run build && npm run start
```

---

## 🐛 Résolution de Problèmes

### Strapi ne démarre pas
```bash
cd backend
rm -rf .cache dist build
npm run develop
```

### Next.js ne démarre pas
```bash
cd fmp-app
rm -rf .next
npm run dev
```

### Port déjà utilisé
```bash
netstat -ano | findstr :1337
taskkill /PID <PID> /F
```

---

## 📧 Contact & Support

- **Documentation** : Consultez les fichiers .md dans le projet
- **Issues** : Créez une issue sur GitHub
- **Email** : contact@fmp.fr

---

## 📄 Licence

MIT

---

## 🙏 Remerciements

Projet créé en suivant le [tutoriel Strapi + Next.js 15](https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project)

---

**Version :** 1.0.0  
**Dernière mise à jour :** Janvier 2026  
**Créé avec ❤️ en utilisant Next.js 15 & Strapi 5**
