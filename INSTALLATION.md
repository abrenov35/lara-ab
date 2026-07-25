# 🚀 LARA - Setup Complet (Upload + Sheets + Drive)

Ce guide vous explique comment faire fonctionner **LARA avec upload réel** sur Google Drive + Sheets.

---

## 📋 Architecture

```
LARA Web (https://abrenov35.github.io/lara-ab/)
    ↓ Upload fichier
Google Apps Script (Web App)
    ↓ Crée le fichier
Google Drive (Stockage)
    ↓ Enregistre l'info
Google Sheets (Liste)
    ↓ Affiche les documents
LARA Web (Liste mise à jour)
```

---

## ⚙️ Setup (5 étapes)

### Étape 1: Préparer Google Drive

1. **Créez un dossier** `LARA-Chantier` dans Google Drive
2. **Dedans, créez 3 sous-dossiers:**
   - `📸 Photos`
   - `📐 Plans`
   - `✅ PV Réception`

3. **Notez l'ID du dossier parent** (dans l'URL):
   ```
   https://drive.google.com/drive/folders/1ABC2DEF3GHI4JKL
                                         ^^^^^^^^^^^^^^^^^
                                         Cet ID !
   ```

---

### Étape 2: Préparer Google Sheets

1. **Ouvrez votre Sheets LARA** (15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs)
2. **Créez l'en-tête dans la feuille** (Ligne 1):
   ```
   A: Catégorie
   B: Fichier
   C: Date
   D: Description
   E: Lien
   F: ID fichier (pour admin)
   G: Date d'ajout
   ```

---

### Étape 3: Créer le Web App Apps Script

1. **Ouvrez votre Google Sheets LARA**
2. **Cliquez:** Outils → Éditeur de script
3. **Supprimer le code existant** (s'il y en a)
4. **Copier-coller ce code COMPLET:**

```javascript
[VOIR CI-DESSOUS: lara-upload-backend.gs]
```

5. **À la ligne 8-10, remplacez:**
   ```javascript
   const CONFIG = {
     SHEET_ID: "15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs",  // ✓ Bon
     DRIVE_FOLDER_ID: "VOTRE_FOLDER_ID_ICI",  // ✓ REMPLACEZ PAR VOTRE ID !
     SHEET_NAME: "Feuille 1"  // ✓ Vérifiez le nom
   };
   ```

6. **Enregistrez** (Ctrl+S)

---

### Étape 4: Déployer comme Web App

1. **Dans l'éditeur de script**, cliquez: **Déployer** → **Nouveau déploiement**

2. **Sélectionnez:**
   - Type: **Application Web**
   - Exécuter en tant que: **Vous** (votre compte)
   - Qui peut accéder: **N'importe qui**

3. **Cliquez: Déployer**

4. **Copie z l'URL** qui ressemble à:
   ```
   https://script.google.com/macros/s/AKfycbz...../usercodeappshell
   ```

5. **Conservez cette URL**, vous en aurez besoin !

---

### Étape 5: Mettre à Jour LARA Web

1. Allez dans le repo LARA: `/home/claude/lara-ab/index.html`
2. Trouvez la ligne ~15:
   ```javascript
   const WEB_APP_URL = "VOTRE_WEB_APP_URL_ICI";
   ```
3. Remplacez par votre URL de l'Étape 4:
   ```javascript
   const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz.../usercodeappshell";
   ```
4. Sauvegardez et poussez sur GitHub

---

## ✅ Tester

1. **Allez sur:** https://abrenov35.github.io/lara-ab/
2. **Cliquez:** ➕ Ajouter un Document
3. **Remplissez:**
   - Catégorie: Photos
   - Fichier: Sélectionnez une image
   - Date: Aujourd'hui
   - Description: Test

4. **Cliquez:** ✓ Ajouter le Document

**Si ça fonctionne:**
- ✅ L'image apparaît sur Google Drive dans `LARA-Chantier/📸 Photos/`
- ✅ Une ligne est ajoutée au Sheets
- ✅ LARA recharge la liste automatiquement

---

## 🔧 Troubleshooting

### ❌ "Error: Authorization required"

**Solution:**
1. Allez dans l'éditeur de script
2. Exécutez manuellement `testUpload()`
3. Autorisez l'accès

### ❌ "DRIVE_FOLDER_ID is invalid"

**Solution:**
- Vérifiez l'ID du dossier Google Drive
- Assurez-vous que le dossier existe
- Vérifiez que vous y avez accès

### ❌ "Sheets not found"

**Solution:**
- Vérifiez le `SHEET_ID` (doit être correct)
- Vérifiez le `SHEET_NAME` ("Feuille 1" ou autre)

### ❌ Rien ne se passe au clic

**Solution:**
- Ouvrez la console du navigateur (F12)
- Regardez les erreurs
- Vérifiez la `WEB_APP_URL` dans LARA

---

## 📚 Colonnes du Sheets

Votre Sheets LARA doit avoir cette structure:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Catégorie | Fichier | Date | Description | Lien | ID fichier | Date d'ajout |
| 📸 Photos | Facade_Avant.jpg | 25/07/2026 | Vue avant | https://drive.google.com/... | fileId123 | 25/07/2026 |
| 📐 Plans | Plan_v2.pdf | 20/07/2026 | Plan étage 1 | https://drive.google.com/... | fileId456 | 25/07/2026 |

---

## 🔒 Permissions

L'Apps Script a besoin d'accès à:
- ✅ Google Drive (pour créer les fichiers)
- ✅ Google Sheets (pour enregistrer les infos)

Quand vous exécutez, Google demande d'autoriser → **Cliquez "Autoriser"**

---

## 🎯 Flux Complet

```
Ouvrier ouvre LARA web
    ↓
Cliquez "➕ Ajouter un Document"
    ↓
Sélectionne fichier + catégorie + date
    ↓
Cliquez "✓ Ajouter le Document"
    ↓
LARA envoie au Web App Apps Script (HTTPS POST)
    ↓
Apps Script crée le fichier dans Google Drive
    ↓
Apps Script ajoute une ligne au Sheets
    ↓
LARA recharge la liste
    ↓
Le nouveau document apparaît dans la liste
    ↓
Ouvrier clique "👁️ VOIR"
    ↓
Lien vers Google Drive
    ↓
Document ouvert !
```

---

## 📞 Besoin d'aide ?

Si quelque chose ne fonctionne pas:
1. Vérifiez tous les IDs (Sheet, Drive Folder)
2. Testez l'Apps Script manuellement
3. Regardez la console du navigateur (F12)
4. Vérifiez les permissions Google

---

**C'est tout !** LARA est maintenant prêt pour les uploads réels ! 🚀

