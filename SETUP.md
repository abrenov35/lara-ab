# 🚀 SETUP LARA - Guide Complet

Bienvenue ! Ce guide vous explique comment **configurer et utiliser LARA** complètement.

---

## ⚡ Démarrage Rapide (5 minutes)

### 1. ✅ L'app web LARA est **déjà en ligne** !
Allez directement sur : **https://abrenov35.github.io/lara-ab/**

C'est déjà une app fonctionnelle avec des données de démonstration.

### 2. 🔗 Connecter Google Drive

Pour que LARA affiche **vos vrais documents**, il faut connecter Google Drive.

**Étape par étape :**

#### A. Créer la structure Google Drive

1. Allez sur https://drive.google.com
2. Créez un dossier : `LARA-Chantier`
3. Dedans, créez 3 sous-dossiers :
   - `📸 Photos`
   - `📐 Plans`
   - `✅ PV Réception`

4. **Notez l'ID du dossier parent** (dans l'URL) :
   ```
   https://drive.google.com/drive/folders/1ABC...XYZ
                                              ^^^^^^
                                         Cet ID
   ```

#### B. Configurer Google Sheets

1. Allez sur https://sheets.google.com
2. Ouvrez votre Sheets `lara-ab` (vous l'avez ?)
3. Allez dans **Outils** → **Éditeur de script**
4. **Effacez le contenu existant** (s'il y en a)
5. **Copiez-collez tout le code** de `lara-apps-script.js` (du repo GitHub)
6. À la ligne 12, remplacez :
   ```javascript
   const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
   ```
   Par votre vrai Folder ID :
   ```javascript
   const FOLDER_ID = "1ABC...XYZ";
   ```
7. **Enregistrez** (Ctrl+S)
8. **Rechargez votre Sheets**

✅ Un menu **"📄 LARA"** apparaîtra en haut du Sheets !

---

## 📚 Utilisation Complète

### Pour le Gestionnaire (Google Sheets)

#### Menu "📄 LARA" :

- **🔄 Rafraîchir les documents**
  - Liste tous les fichiers de votre dossier Google Drive
  - Affiche : Nom | Type | Date | Taille | Lien
  - À utiliser quand des fichiers ont été ajoutés

- **📸 Ajouter Photos**
  - Affiche juste les images (jpg, png, gif)
  - Utile pour les photos du chantier

- **📐 Ajouter Plans**
  - Affiche juste les documents (pdf, doc, docx)
  - Pour les plans architecte/technique

- **✅ Ajouter PV**
  - Affiche les fichiers avec "PV" ou "RECEPTION" dans le nom
  - Pour les PV de réception

- **🗑️ Vider la feuille**
  - Efface le contenu du Sheets
  - Utile avant un rafraîchissement

#### Workflow Typique :

```
1. Ouvrir Google Sheets LARA
2. Menu 📄 LARA → 🔄 Rafraîchir les documents
3. ✅ Tous les fichiers de Google Drive s'affichent
4. Copier les liens → Les partager avec l'équipe
```

### Pour l'Ouvrier (App Web LARA)

Allez sur : **https://abrenov35.github.io/lara-ab/**

**Ce qu'il voit :**

1. **3 catégories** : Photos | Plans | PV
2. **Liste des documents** dans chaque catégorie
3. **Bouton "👁️ VOIR"** pour ouvrir un document
4. **Pop-up** avec le fichier et un lien Google Drive

#### Workflow Typique :

```
1. Ouvrir LARA web (URL)
2. Voir la liste des documents
3. Cliquer "👁️ VOIR" sur un document
4. Lire/télécharger le document
```

---

## 📋 Étapes de Configuration Complètes

### Étape 1 : Créer le Dossier Google Drive

```
Mon Drive
└── LARA-Chantier (📂)
    ├── 📸 Photos
    ├── 📐 Plans
    └── ✅ PV Réception
```

**URL du dossier :** `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`

### Étape 2 : Ajouter des Fichiers à Google Drive

Uploadez des fichiers dans chaque dossier :

**Dans 📸 Photos :**
- Facade_Avant.jpg
- Facade_Travaux.jpg
- Interior_Kitchen.jpg

**Dans 📐 Plans :**
- Plan_Etage_v2.pdf
- Facade_Technique.pdf

**Dans ✅ PV Réception :**
- PV_Reception_22_07.pdf
- PV_Final_25_07.pdf

### Étape 3 : Configurer Apps Script

1. Ouvrir https://sheets.google.com
2. Créer un nouveau Sheets (ou ouvrir existant)
3. Outils → Éditeur de script
4. Copier-coller `lara-apps-script.js`
5. Remplacer `FOLDER_ID`
6. Enregistrer (Ctrl+S)
7. Rechargez le Sheets (F5)

### Étape 4 : Tester le Menu LARA

1. Dans le Sheets, vous devez voir un menu **"📄 LARA"**
2. Cliquer sur **"🔄 Rafraîchir les documents"**
3. ✅ Tous les fichiers de Google Drive doivent s'afficher
4. Les liens sont cliquables ("👁️ VOIR")

### Étape 5 : Partager avec l'Équipe

**Pour les ouvriers :**
- Donnez-leur le lien **https://abrenov35.github.io/lara-ab/**
- Ils voient la liste des documents
- Ils cliquent "VOIR" pour ouvrir

**Pour les gestionnaires :**
- Partagez le Sheets LARA
- Ils peuvent rafraîchir la liste quand des fichiers sont ajoutés
- Ils peuvent copier les liens pour les partager

---

## 🎯 Cas d'Usage Réels

### Scénario 1 : Ajouter une Photo du Chantier

```
Ouvrier prend une photo
  ↓
Upload dans Google Drive (dossier 📸 Photos)
  ↓
Gestionnaire ouvre Sheets LARA → Menu 📄 LARA → 🔄 Rafraîchir
  ↓
La photo apparaît dans le Sheets avec un lien
  ↓
Ouvrier ouvre LARA web → Voir la nouvelle photo
  ↓
Clique "VOIR" → Photo ouverte dans Google Drive
```

### Scénario 2 : Partager un Plan avec l'Équipe

```
Architecte fournit un plan (PDF)
  ↓
Gestionnaire upload dans Google Drive (dossier 📐 Plans)
  ↓
Rafraîchit le Sheets LARA
  ↓
Copie le lien du plan
  ↓
L'envoie par email / SMS / Vertuoza à l'équipe
  ↓
L'équipe ouvre le lien dans LARA web
  ↓
Clique "VOIR" → Plan affiché
```

### Scénario 3 : Valider un PV de Réception

```
Inspecteur remplit un PV (PDF)
  ↓
Upload dans Google Drive (dossier ✅ PV Réception)
  ↓
Gestionnaire rafraîchit le Sheets LARA
  ↓
Voit le nouveau PV avec un lien
  ↓
Le partage avec le client
  ↓
Le client ouvre LARA web → Voit le PV
```

---

## ❓ FAQ & Troubleshooting

### ❌ "Le menu 📄 LARA n'apparaît pas"

**Vérifiez :**
1. ✅ Vous avez bien copié **tout** le code `lara-apps-script.js`
2. ✅ Vous avez remplacé `FOLDER_ID` par votre vrai ID
3. ✅ Le script est enregistré (Ctrl+S)
4. ✅ Vous avez rechargé le Sheets (F5)
5. ✅ Si ça ne marche pas, exécutez `onOpen()` manuellement

### ❌ "0 fichiers trouvés quand je rafraîchis"

**Vérifiez :**
1. ✅ Que vous avez une URL Google Drive valide pour `FOLDER_ID`
2. ✅ Que vous avez bien créé le dossier `LARA-Chantier`
3. ✅ Que vous avez des fichiers dedans
4. ✅ Que vous pouvez accéder au dossier (permissions)

### ❌ "Les liens ne fonctionnent pas"

**Vérifiez :**
1. ✅ Que vous êtes connecté à Google
2. ✅ Que les fichiers sont bien dans Google Drive
3. ✅ Que les liens sont cliquables (il faut un clic pour les activer)
4. ✅ Les permissions du dossier (public? Partage restreint?)

### ❌ "Erreur de permission"

**Vérifiez :**
1. ✅ Que vous avez accès au dossier Google Drive
2. ✅ Que l'Apps Script s'exécute dans votre compte
3. ✅ Allez dans Outils → Éditeur de script → Exécutions pour voir les erreurs

---

## 🔗 Intégrations Futures (À Venir)

### Upload Direct depuis LARA Web
Permettre aux ouvriers d'uploader des photos directement dans LARA web.

```javascript
// À développer : Intégration Google Drive API
```

### Sync Automatique
Mettre à jour LARA automatiquement quand un fichier est ajouté.

```javascript
// À développer : Cloud Functions + Webhooks
```

### Notifications
Notifier quand une nouvelle photo est ajoutée.

```javascript
// À développer : Google Cloud Messaging
```

---

## 📞 Besoin d'Aide ?

Si quelque chose ne fonctionne pas :

1. **Vérifiez le README.md** du repo GitHub
2. **Consultez ce SETUP.md** (ce fichier)
3. **Testez les cas d'usage** dans l'ordre
4. **Regardez les logs** : Outils → Éditeur de script → Exécutions

---

## ✅ Checklist de Configuration

- [ ] Dossier `LARA-Chantier` créé dans Google Drive
- [ ] 3 sous-dossiers créés (Photos, Plans, PV)
- [ ] `FOLDER_ID` noté
- [ ] Google Sheets `lara-ab` accessible
- [ ] Apps Script code copié dans Sheets
- [ ] `FOLDER_ID` remplacé dans Apps Script
- [ ] Apps Script enregistré
- [ ] Menu "📄 LARA" visible dans Sheets
- [ ] Fichiers d'exemple uploadés
- [ ] "🔄 Rafraîchir les documents" fonctionne
- [ ] Lien LARA web testé
- [ ] L'équipe peut accéder à LARA

---

## 🎉 Vous Êtes Prêt !

**LARA est maintenant opérationnel !**

L'app est live : **https://abrenov35.github.io/lara-ab/**

**Bon chantier ! 🏗️**

