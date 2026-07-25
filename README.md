# 📄 LARA - Gestion Documentaire de Chantier

**LARA** = Interface simple pour afficher, organiser et accéder à tous vos documents de chantier.

- 📋 **Liste simple** des documents (Photos, Plans, PV)
- 👁️ **Pop-up rapide** au clic "VOIR"
- ☁️ **Stockage sécurisé** chez Google Drive

---

## 🚀 Installation Rapide

### 1. Interface Web (C'est ici !)
L'app LARA est accessible à : **https://abrenov35.github.io/lara-ab/**

### 2. Google Sheets + Apps Script

#### A. Créer la structure Google Drive

1. Créez un dossier `LARA-Chantier` dans Google Drive
2. Créez 3 sous-dossiers dedans :
   - `📸 Photos`
   - `📐 Plans`
   - `✅ PV Réception`

3. Notez l'ID du dossier parent (dans l'URL) :
   ```
   https://drive.google.com/drive/folders/1ABC...XYZ
                                              ^^^^^^^^^
                                          Cet ID
   ```

#### B. Configurer Google Sheets

1. Ouvrez votre Sheets `lara-ab` sur Google Sheets
2. Allez dans **Outils** → **Éditeur de script**
3. Copiez le code de `lara-apps-script.js` (dans ce repo)
4. Remplacez `VOTRE_FOLDER_ID_ICI` par l'ID réel
5. Enregistrez (Ctrl+S)
6. Rechargez votre Sheets

✅ Un menu **"📄 LARA"** apparaîtra dans le Sheets !

---

## 📋 Fonctionnalités

### Menu LARA dans Google Sheets

```
📄 LARA
├── 🔄 Rafraîchir les documents
│   └── Liste tous les fichiers du dossier
│   └── Affiche: Nom | Type | Date | Taille | Lien
│
├── 📸 Ajouter Photos
│   └── Affiche uniquement les images (jpg, png, gif)
│
├── 📐 Ajouter Plans
│   └── Affiche uniquement les documents (pdf, doc, docx)
│
├── ✅ Ajouter PV
│   └── Affiche les fichiers contenant "PV" ou "RECEPTION"
│
└── 🗑️ Vider la feuille
    └── Efface le contenu du Sheets
```

### Interface Web LARA

- ✅ Affichage des 3 catégories (Photos, Plans, PV)
- ✅ Liste simple et claire
- ✅ Bouton "VOIR" pour chaque document
- ✅ Pop-up au clic
- ✅ Liens vers Google Drive

---

## 🔧 Flux de Travail Complet

### 1. L'ouvrier ajoute un document

```
Ouvrier clique "Ajouter une photo" dans LARA web
  ↓
Sélectionne un fichier
  ↓
Le fichier est envoyé à Google Drive (dossier 📸 Photos)
  ↓
C'est tout !
```

### 2. Le gestionnaire rafraîchit la liste

```
Ouvrir Google Sheets → Menu LARA → 🔄 Rafraîchir les documents
  ↓
Apps Script scanne le dossier Google Drive
  ↓
Liste mise à jour automatiquement
  ↓
Les liens directs vers les fichiers sont affichés
```

### 3. L'ouvrier consulte un document

```
Ouvrir LARA web → Cliquer "VOIR" sur un document
  ↓
Pop-up s'ouvre
  ↓
Document s'affiche (image, PDF, etc.)
  ↓
Lien direct vers Google Drive (modifier, télécharger, etc.)
```

---

## 📁 Structure des Dossiers Google Drive

```
LARA-Chantier/
├── 📸 Photos/
│   ├── Facade_Avant.jpg
│   ├── Facade_Travaux_15_07.jpg
│   └── Interior_Detail_22_07.jpg
│
├── 📐 Plans/
│   ├── Plan_Etage_v2.pdf
│   └── Facade_Technique.pdf
│
└── ✅ PV Réception/
    ├── PV_Reception_22_07.pdf
    └── PV_Final_25_07.pdf
```

---

## 🎯 Cas d'Usage

### Photo du Chantier (Before/After)
1. Ouvrier prend photo sur chantier
2. Upload dans dossier 📸 Photos
3. Gestionnaire valide via LARA web
4. Apparaît automatiquement dans la liste

### Plans & Schémas Techniques
1. Architecte/BTP fournit plan (PDF)
2. Upload dans dossier 📐 Plans
3. Lien disponible immédiatement dans LARA web
4. Ouvrier peut consulter sans quitter l'interface

### PV de Réception
1. Inspecteur remplit PV de réception (PDF)
2. Upload dans dossier ✅ PV Réception
3. Signature électronique possible
4. Traçabilité complète

---

## ⚙️ Configuration

### Fichiers Principaux

```
lara-ab/
├── index.html              ← App web LARA (interface)
├── lara-apps-script.js     ← Code Apps Script (Google Sheets automation)
├── README.md               ← Documentation (ce fichier)
└── .git/                   ← Repo GitHub
```

### Variables à Configurer

**Dans `lara-apps-script.js` (Google Sheets) :**
```javascript
const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";  // ← À remplacer
```

**Trouvez votre Folder ID :**
- Allez dans votre dossier Google Drive
- L'URL est : `https://drive.google.com/drive/folders/FOLDER_ID`

---

## 🚀 Déploiement

### Web App (GitHub Pages)
L'app est déjà en ligne ! Pas besoin de faire quoi que ce soit.

URL : **https://abrenov35.github.io/lara-ab/**

### Apps Script (Google Sheets)
1. Ouvrir Sheets
2. Outils → Éditeur de script
3. Copier `lara-apps-script.js`
4. Remplacer `FOLDER_ID`
5. Enregistrer et tester

---

## 🔗 Intégrations Possibles

### Option 1 : Formulaire Upload Intégré
Ajouter un formulaire dans LARA web qui upload directement vers Google Drive.

```javascript
// À venir : Intégration Google Drive API
```

### Option 2 : Sync Automatique
Apps Script peut s'exécuter automatiquement (toutes les heures, etc).

```javascript
// À venir : Triggers temporisés
```

### Option 3 : Webhooks
Quand un fichier est ajouté, LARA se met à jour automatiquement.

```javascript
// À venir : Cloud Functions
```

---

## 📞 Support & Troubleshooting

### ❌ "Le menu 📄 LARA n'apparaît pas"
**Solution:**
1. Rechargez le Sheets (F5)
2. Vérifiez que le script est bien sauvegardé
3. Exécutez `onOpen()` manuellement une fois
4. Rechargez

### ❌ "0 fichiers trouvés"
**Solution:**
1. Vérifiez que `FOLDER_ID` est correct
2. Assurez-vous que le dossier Google Drive existe
3. Vérifiez les permissions (vous pouvez accéder au dossier ?)

### ❌ "Les liens ne fonctionnent pas"
**Solution:**
1. Cliquez directement sur "VOIR" (il ouvre Google Drive)
2. Assurez-vous que vous êtes connecté à Google
3. Vérifiez les permissions du dossier

---

## 🔐 Sécurité & Permissions

### Google Drive
- ✅ Les fichiers restent sécurisés chez Google
- ✅ Vous contrôlez qui a accès à quel dossier
- ✅ Historique de modification conservé
- ✅ Sauvegarde automatique

### Google Sheets
- ✅ Apps Script s'exécute dans votre compte
- ✅ Pas d'accès externe aux données
- ✅ Contrôle d'accès sur le Sheets

### Web App LARA
- ✅ Statique (HTML uniquement)
- ✅ Aucune donnée stockée
- ✅ Liens publics vers Google Drive (vous contrôlez les permissions)

---

## 📈 Prochains Développements

- [ ] Upload direct depuis LARA web
- [ ] Sync automatique Google Drive ↔ Sheets
- [ ] Tri par date / catégorie / taille
- [ ] Recherche / filtres avancés
- [ ] Commentaires sur les documents
- [ ] Notifications de nouvelle photo
- [ ] Export PDF (rapport de chantier)
- [ ] App mobile native

---

## 📝 Licence & Crédit

LARA - Gestion Documentaire de Chantier  
Développé pour Vertuoza  
2026

---

## 🎉 C'est Tout !

Vous avez maintenant une **app de gestion documentaire simple, efficace et sécurisée** !

**Besoin d'aide ?** Consultez ce README ou contactez-nous.

**Bon chantier ! 🏗️**

