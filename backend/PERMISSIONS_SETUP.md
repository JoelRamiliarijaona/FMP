# Configuration des Permissions Strapi

Ce document explique comment configurer les permissions pour tous les nouveaux content types créés pour l'intégration RepairPlugin.

## Étapes de Configuration

1. **Accéder à l'admin Strapi**
   - Ouvrez http://localhost:1337/admin
   - Connectez-vous avec votre compte administrateur

2. **Aller dans les paramètres de permissions**
   - Cliquez sur **Settings** (⚙️) dans le menu de gauche
   - Allez dans **Users & Permissions Plugin**
   - Cliquez sur **Roles**
   - Sélectionnez le rôle **Public**

3. **Activer les permissions pour chaque content type**

   Pour chaque content type ci-dessous, activez les permissions suivantes :

   ### Navigation Menu (Single Type)
   - ✅ **find** (GET)

   ### Product Addon (Collection Type)
   - ✅ **find** (GET - Liste)
   - ✅ **findOne** (GET - Détail)

   ### Review (Collection Type)
   - ✅ **find** (GET - Liste)
   - ✅ **findOne** (GET - Détail)

   ### Resource (Collection Type)
   - ✅ **find** (GET - Liste)
   - ✅ **findOne** (GET - Détail)

   ### Promotional Banner (Single Type)
   - ✅ **find** (GET)

## Résumé des Permissions

| Content Type | Type | Permissions Publiques |
|-------------|------|----------------------|
| navigation-menu | Single Type | find |
| product-addon | Collection Type | find, findOne |
| review | Collection Type | find, findOne |
| resource | Collection Type | find, findOne |
| promotional-banner | Single Type | find |

## Vérification

Après avoir configuré les permissions, vous pouvez tester les endpoints :

```bash
# Navigation Menu
GET http://localhost:1337/api/navigation-menu?populate=*

# Products
GET http://localhost:1337/api/product-addons?populate=*

# Reviews
GET http://localhost:1337/api/reviews?populate=*

# Resources
GET http://localhost:1337/api/resources?populate=*

# Promotional Banner
GET http://localhost:1337/api/promotional-banner?populate=*
```

## Notes Importantes

- Les permissions doivent être activées pour le rôle **Public** pour que le frontend puisse accéder aux données
- Assurez-vous que les content types sont bien **publiés** dans Strapi (bouton "Publish" en haut à droite de l'éditeur)
- Pour les Single Types, il n'y a qu'une seule entrée, créez-la dans le Content Manager
