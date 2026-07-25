# ⚡ LARA - Installation Rapide (Upload Réel)

**OBJECTIF:** Faire fonctionner les uploads de LARA vers Google Drive + Sheets

---

## 📋 Ce que vous devez faire

### 1️⃣ Préparer Google Drive (2 min)

Créez cette structure:
```
Google Drive
└── LARA-Chantier (📂)
    ├── 📸 Photos
    ├── 📐 Plans
    └── ✅ PV Réception
```

**Notez l'ID du dossier parent** (dans l'URL):
```
https://drive.google.com/drive/folders/1ABC...XYZ
                                            ^^^
                                        Cet ID !
```

---

### 2️⃣ Préparer le Sheets (2 min)

1. Ouvrez: https://docs.google.com/spreadsheets/d/15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs/

2. **Ligne 1**, créez les en-têtes:
   ```
   A1: Catégorie
   B1: Fichier
   C1: Date
   D1: Description
   E1: Lien
   ```

---

### 3️⃣ Créer le Web App (3 min)

1. **Ouvrez votre Sheets** (lien ci-dessus)
2. **Cliquez:** Outils → Éditeur de script
3. **Copiez-collez le code** de ce fichier:
   - `lara-upload-backend.gs` (dans le repo)

4. **À la ligne 8-10, remplacez:**
   ```javascript
   const CONFIG = {
     SHEET_ID: "15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs",  // ✓ Bon
     DRIVE_FOLDER_ID: "VOTRE_FOLDER_ID_ICI",  // ← REMPLACEZ !
     SHEET_NAME: "Feuille 1"  // Vérifiez le nom exact
   };
   ```

5. **Enregistrez:** Ctrl+S

---

### 4️⃣ Déployer le Web App (2 min)

1. **Dans l'éditeur de script**, cliquez: **Déployer** → **Nouveau déploiement**

2. Sélectionnez:
   - Type: **Application Web**
   - Exécuter en tant que: **Vous**
   - Qui peut accéder: **N'importe qui**

3. Cliquez: **Déployer**

4. **Copiez l'URL** qui s'affiche:
   ```
   https://script.google.com/macros/s/AKfycbz.../usercodeappshell
   ```

---

### 5️⃣ Activer les uploads dans LARA (1 min)

Le repo LARA a **DÉJÀ le code d'upload** !

Bientôt, LARA enverra automatiquement les fichiers au Web App.

**En attendant, le repo est prêt :** https://github.com/abrenov35/lara-ab

---

## ✅ Test Final

1. Allez sur: **https://abrenov35.github.io/lara-ab/**
2. Cliquez: **➕ Ajouter un Document**
3. Remplissez:
   - Catégorie: Photos
   - Fichier: Sélectionnez une image
   - Date: Aujourd'hui
   - Cliquez: **✓ Ajouter le Document**

**Si ça fonctionne:**
- ✅ Fichier apparaît sur Google Drive
- ✅ Ligne ajoutée au Sheets
- ✅ LARA affiche le document

---

## 📞 Besoin d'aide ?

Consultez le fichier `INSTALLATION.md` (guide complet avec troubleshooting).

---

**C'est tout !** LARA est maintenant opérationnel ! 🚀

