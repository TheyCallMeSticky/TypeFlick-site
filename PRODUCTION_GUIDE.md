# Guide de Mise en Production - TypeFlick

## 🚀 Checklist de Déploiement

### Phase 1 : Préparation (Avant déploiement)

#### ✅ Configuration des Variables d'Environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env.local

# Variables obligatoires à configurer :
POSTGRES_URL="postgresql://user:password@host:5432/database"
STRIPE_SECRET_KEY="sk_live_..." # Clé LIVE pour la production
STRIPE_PUBLISHABLE_KEY="pk_live_..." # Clé LIVE pour la production
STRIPE_WEBHOOK_SECRET="whsec_..." # Secret du webhook Stripe
NEXTAUTH_SECRET="your-production-secret-key" # Générer une clé sécurisée
NEXTAUTH_URL="https://your-domain.com" # URL de production
```

#### ✅ Complétion des Pages Légales
Remplacer tous les `[À COMPLÉTER]` dans les fichiers suivants :

**1. Mentions légales** (`app/legal/mentions-legales/page.tsx`)
- [ ] Dénomination sociale de votre entreprise
- [ ] Forme juridique (SAS, SARL, etc.)
- [ ] Capital social
- [ ] Adresse du siège social
- [ ] Numéro RCS et ville d'immatriculation
- [ ] Numéro SIRET
- [ ] Numéro TVA intracommunautaire
- [ ] Téléphone et email de contact
- [ ] Nom du directeur de publication
- [ ] Ville de juridiction compétente

**2. Politique de confidentialité** (`app/legal/politique-confidentialite/page.tsx`)
- [ ] Nom et coordonnées du responsable de traitement
- [ ] Email de contact pour les données personnelles
- [ ] Adresse postale complète

**3. CGU et CGV**
- [ ] Nom de la société dans tous les documents
- [ ] Adresses de contact
- [ ] Informations de facturation

#### ✅ Configuration Stripe
```bash
# 1. Créer les produits et prix dans Stripe Dashboard
# 2. Configurer les webhooks Stripe :
#    - URL : https://your-domain.com/api/stripe/webhook
#    - Événements : customer.subscription.created, customer.subscription.updated, customer.subscription.deleted, invoice.payment_succeeded, invoice.payment_failed

# 3. Tester les paiements en mode test avant de passer en live
```

### Phase 2 : Base de Données

#### ✅ Sauvegarde de Sécurité
```bash
# Sauvegarder la base de données existante
pg_dump $CURRENT_DATABASE_URL > backup_before_migration.sql
```

#### ✅ Migration des Données
```bash
# Installer drizzle-kit si pas déjà fait
pnpm add -D drizzle-kit

# Appliquer les migrations
pnpm db:migrate

# Vérifier que la migration s'est bien passée
pnpm db:studio # Optionnel : interface graphique pour vérifier
```

#### ✅ Migration des Utilisateurs Existants
Si vous avez des utilisateurs avec des teams existants, exécuter ce script SQL :

```sql
-- Migrer les données des teams vers les users
UPDATE users 
SET 
  stripeCustomerId = teams.stripeCustomerId,
  planName = teams.planName,
  subscriptionStatus = teams.subscriptionStatus
FROM teams 
JOIN teamMembers ON teams.id = teamMembers.teamId 
WHERE users.id = teamMembers.userId;

-- Vérifier la migration
SELECT id, email, stripeCustomerId, planName, subscriptionStatus 
FROM users 
WHERE stripeCustomerId IS NOT NULL;
```

### Phase 3 : Tests de Validation

#### ✅ Tests Fonctionnels
- [ ] **Inscription** : Tester le processus complet avec opt-in RGPD
- [ ] **Connexion** : Vérifier l'authentification
- [ ] **Paiements** : Tester un abonnement complet (test puis live)
- [ ] **Création de vidéos** : Vérifier que la fonctionnalité principale fonctionne
- [ ] **Pages légales** : Vérifier l'accessibilité de toutes les pages

#### ✅ Tests de Conformité
- [ ] **Bannière cookies** : Vérifier l'affichage et les préférences
- [ ] **Opt-in RGPD** : Tester les cases obligatoires et optionnelles
- [ ] **Liens légaux** : Vérifier tous les liens dans le footer
- [ ] **Gestion cookies** : Tester le bouton "Gérer les cookies"

#### ✅ Tests de Performance
```bash
# Build de production
pnpm build

# Tester localement en mode production
pnpm start

# Vérifier les métriques :
# - Temps de chargement des pages légales
# - Taille du bundle JavaScript
# - Performance de la bannière cookies
```

### Phase 4 : Déploiement

#### ✅ Déploiement Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod

# Configurer les variables d'environnement dans Vercel Dashboard
# Attention : Utiliser les clés LIVE de Stripe en production
```

#### ✅ Configuration DNS et SSL
- [ ] Configurer le domaine personnalisé
- [ ] Vérifier le certificat SSL
- [ ] Tester l'accès HTTPS

### Phase 5 : Post-Déploiement

#### ✅ Monitoring Initial
- [ ] Vérifier les logs d'erreur (24h)
- [ ] Monitorer les métriques de performance
- [ ] Tester les webhooks Stripe
- [ ] Vérifier les emails de confirmation

#### ✅ SEO et Indexation
```bash
# Soumettre le sitemap aux moteurs de recherche
# Inclure les nouvelles pages légales :
# - /legal/mentions-legales
# - /legal/politique-confidentialite  
# - /legal/conditions-generales-utilisation
# - /legal/conditions-generales-vente
# - /legal/politique-cookies
```

## 🔧 Configuration Avancée

### Analytics et Cookies
```javascript
// Exemple d'intégration Google Analytics respectueuse des cookies
// À ajouter dans app/layout.tsx si les cookies analytics sont acceptés

import { useCookiePreferences } from '@/components/ui/cookie-banner'

function Analytics() {
  const preferences = useCookiePreferences()
  
  if (preferences?.analytics) {
    // Charger Google Analytics uniquement si accepté
    return (
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
    )
  }
  return null
}
```

### Gestion des Droits RGPD
```typescript
// Exemple d'API pour l'export des données utilisateur
// app/api/user/export/route.ts

export async function GET(request: Request) {
  const user = await getCurrentUser()
  
  const userData = {
    profile: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    },
    videos: await getUserVideos(user.id),
    subscription: await getUserSubscription(user.id)
  }
  
  return new Response(JSON.stringify(userData), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="user-data.json"'
    }
  })
}
```

## 🚨 Points Critiques

### Sécurité
- [ ] **Clés Stripe** : Vérifier que les clés LIVE ne sont pas exposées
- [ ] **NEXTAUTH_SECRET** : Utiliser une clé forte et unique
- [ ] **Base de données** : Connexion sécurisée avec SSL
- [ ] **CORS** : Configurer correctement pour la production

### Légal
- [ ] **Consultation juridique** : Faire valider les textes par un avocat
- [ ] **Registre RGPD** : Tenir un registre des traitements
- [ ] **DPO** : Désigner un DPO si nécessaire (>250 employés)
- [ ] **Cookies** : Respecter la durée de 6 mois recommandée par la CNIL

### Performance
- [ ] **CDN** : Configurer pour les assets statiques
- [ ] **Cache** : Optimiser le cache des pages légales
- [ ] **Monitoring** : Mettre en place des alertes

## 📞 Support Post-Déploiement

### Contacts Utiles
- **CNIL** : https://www.cnil.fr (pour questions RGPD)
- **Stripe Support** : https://support.stripe.com
- **Vercel Support** : https://vercel.com/support

### Maintenance Régulière
- **Mensuel** : Vérifier les logs d'erreur et métriques
- **Trimestriel** : Réviser les textes légaux
- **Annuel** : Audit de conformité RGPD complet

### Évolutions Futures
- Ajouter de nouvelles langues pour l'international
- Implémenter l'export automatique des données RGPD
- Optimiser les performances de la bannière cookies
- Ajouter des analytics respectueux de la vie privée

---

**⚠️ Important** : Ce guide doit être adapté à votre situation spécifique. La conformité légale peut varier selon votre juridiction et votre modèle d'affaires. Une consultation juridique est recommandée avant la mise en production.

