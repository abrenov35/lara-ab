# 🚀 LARA - Installation Simple et Lisible

**Installation en 5 min. Uploads réels vers Google Drive + Sheets.**

---

## 📋 Structure Sheets (SIMPLE)

Votre Sheets LARA doit avoir **6 colonnes:**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Catégorie** | **Fichier** | **Date** | **Description** | **Lien** | **ID** |
| 📸 Photos | Facade_Avant.jpg | 25/07/2026 | Vue avant | https://drive.google.com/file/d/1ABC... | photo1 |
| 📐 Plans | Plan_v2.pdf | 20/07/2026 | Plan étage 1 | https://drive.google.com/file/d/2DEF... | plan1 |
| ✅ Documents | Document.pdf | 22/07/2026 | Doc important | https://drive.google.com/file/d/3GHI... | doc1 |

---

## ⚙️ 3 Étapes

### **1️⃣ Google Drive (2 min)**

Créez:
```
Google Drive
└── LARA-Chantier
    ├── 📸 Photos
    ├── 📐 Plans
    └── ✅ Documents
```

**Notez l'ID du dossier LARA-Chantier:**
```
https://drive.google.com/drive/folders/1ABC...XYZ
                                            ^^^
                                        Cet ID !
```

---

### **2️⃣ Google Sheets (2 min)**

1. Ouvrez votre Sheets: https://docs.google.com/spreadsheets/d/15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs/

2. **Ligne 1 - Créez les en-têtes:**
   ```
   A1: Catégorie
   B1: Fichier
   C1: Date
   D1: Description
   E1: Lien
   F1: ID
   ```

---

### **3️⃣ Apps Script (3 min)**

1. **Ouvrez votre Sheets**
2. **Cliquez:** Outils → Éditeur de script
3. **Supprimez tout code existant**
4. **Copiez le code de:** `lara-upload-backend.gs` (dans le repo)
5. **Remplacez UNIQUEMENT:**
   ```javascript
   DRIVE_FOLDER_ID: "1ABC...XYZ"  ← Votre ID du dossier
   SHEET_NAME: "Feuille 1"        ← Vérifiez le nom exact
   ```
6. **Sauvegardez:** Ctrl+S
7. **Déployez:** Déployer → Nouveau déploiement
   - Type: **Application Web**
   - Exécuter en tant que: **Vous**
   - Qui peut accéder: **N'importe qui**
   - ✅ Déployer
8. **Copiez l'URL** générée

---

## ✅ Tester

1. **Allez sur:** https://abrenov35.github.io/lara-ab/
2. **Cliquez:** ➕ Ajouter un Document
3. **Uploadez une photo:**
   - Catégorie: Photos
   - Fichier: Sélectionnez une image
   - Date: Aujourd'hui
   - Cliquez: ✓ Ajouter

**Si ça fonctionne:**
- ✅ Photo sur Google Drive (LARA-Chantier/📸 Photos/)
- ✅ Ligne ajoutée au Sheets
- ✅ Photo apparaît dans LARA

---

## 📚 Colonnes du Sheets

**Important:** Respectez l'ordre exact!

1. **A: Catégorie** → 📸 Photos | 📐 Plans | ✅ Documents
2. **B: Fichier** → Nom du fichier uploadé
3. **C: Date** → JJ/MM/YYYY
4. **D: Description** → Texte libre (optionnel)
5. **E: Lien** → URL Google Drive (créée auto par Apps Script)
6. **F: ID** → ID fichier Drive (pour admin)

---

## 🔒 Permissions

Quand vous déployez l'Apps Script, Google demande des permissions:
- ✅ Google Drive (créer fichiers)
- ✅ Google Sheets (écrire lignes)

**Cliquez "Autoriser"** → C'est normal!

---

## 🎯 Flux Complet

```
Utilisateur
   ↓ (Clic "Uploader un fichier")
Sélecteur fichier s'ouvre
   ↓ (Choisit un fichier)
Formulaire s'affiche
   ↓ (Remplit catégorie, date, description)
Clic "✓ Ajouter le Document"
   ↓ (Envoie au Web App Apps Script)
Apps Script crée le fichier dans Google Drive
   ↓
Apps Script ajoute une ligne au Sheets
   ↓
LARA recharge la liste
   ↓
Document apparaît dans la liste ✅
   ↓
Utilisateur clique "👁️ VOIR"
   ↓
Aperçu du document s'affiche
   ↓
Clique "📂 Ouvrir dans Drive"
   ↓
Document ouvert dans Google Drive
```

---

## 🔧 Troubleshooting

### ❌ "Aucune donnée n'apparaît"

Vérifiez:
1. Le `DRIVE_FOLDER_ID` est correct
2. Le `SHEET_NAME` correspond au nom exact de votre feuille
3. Les en-têtes sont à la ligne 1 (A1-F1)

### ❌ "Erreur lors de l'upload"

Vérifiez:
1. Le Web App est bien déployé
2. Les permissions sont autorisées
3. L'URL du Web App est correcte dans LARA

### ❌ "Le fichier n'apparaît pas au Sheets"

Vérifiez:
1. L'Apps Script a permis l'accès au Sheets
2. Pas de problème de permissions Google

---

## 📞 Besoin d'aide?

Consultez `INSTALLATION.md` pour le guide détaillé avec plus d'infos.

---

**C'est tout!** LARA est maintenant opérationnel! 🚀

