/**
 * LARA Upload Backend - Google Apps Script Web App
 * Accepte les uploads de LARA web et les stocke dans Google Drive
 */

// ============================================
// CONFIGURATION - À CUSTOMISER
// ============================================

const CONFIG = {
  SHEET_ID: "15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs",  // Votre Sheets LARA
  DRIVE_FOLDER_ID: "VOTRE_FOLDER_ID_ICI",                    // Dossier Google Drive LARA-Chantier
  SHEET_NAME: "Feuille 1"                                    // Nom de la feuille
};

// ============================================
// WEB APP - Point d'entrée
// ============================================

function doPost(e) {
  try {
    // Récupérer les paramètres
    const action = e.parameter.action;
    
    if (action === 'upload') {
      return handleUpload(e);
    } else if (action === 'list') {
      return handleList(e);
    } else {
      return sendResponse(false, "Action inconnue");
    }
  } catch (error) {
    Logger.log("Erreur: " + error);
    return sendResponse(false, "Erreur: " + error.toString());
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput("LARA Upload API - Utilisez POST pour uploader");
}

// ============================================
// 1. HANDLE UPLOAD
// ============================================

function handleUpload(e) {
  // Récupérer les données du formulaire
  const category = e.parameter.category;
  const date = e.parameter.date;
  const description = e.parameter.description || "";
  const fileName = e.parameter.fileName;
  const fileData = e.parameter.fileData; // Base64
  
  // Validation
  if (!category || !date || !fileName || !fileData) {
    return sendResponse(false, "Paramètres manquants");
  }
  
  try {
    // 1. Créer le fichier dans Google Drive
    const driveFile = createFileInDrive(category, fileName, fileData);
    
    if (!driveFile) {
      return sendResponse(false, "Erreur création fichier Drive");
    }
    
    // 2. Ajouter l'entrée dans le Sheets
    addToSheet(category, fileName, date, description, driveFile.fileId, driveFile.fileUrl);
    
    // 3. Retourner succès
    return sendResponse(true, "Document uploadé avec succès", {
      fileId: driveFile.fileId,
      fileUrl: driveFile.fileUrl
    });
    
  } catch (error) {
    Logger.log("Erreur upload: " + error);
    return sendResponse(false, "Erreur: " + error.toString());
  }
}

// ============================================
// 2. HANDLE LIST
// ============================================

function handleList(e) {
  try {
    const category = e.parameter.category; // optionnel: pour filtrer
    
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    const documents = [];
    
    // Parcourir les lignes (sauter l'en-tête)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const cat = row[0]; // Colonne A: Catégorie
      const fileName = row[1]; // Colonne B: Fichier
      const date = row[2]; // Colonne C: Date
      const desc = row[3]; // Colonne D: Description
      const fileUrl = row[4]; // Colonne E: Lien
      
      // Filtrer par catégorie si demandé
      if (category && cat !== category) continue;
      
      // Ajouter à la liste
      if (fileName && fileUrl) {
        documents.push({
          category: cat,
          name: fileName,
          date: date instanceof Date ? formatDate(date) : date,
          description: desc,
          url: fileUrl
        });
      }
    }
    
    return sendResponse(true, "Liste récupérée", { documents: documents });
    
  } catch (error) {
    Logger.log("Erreur list: " + error);
    return sendResponse(false, "Erreur: " + error.toString());
  }
}

// ============================================
// HELPER: Créer fichier dans Google Drive
// ============================================

function createFileInDrive(category, fileName, fileDataBase64) {
  try {
    // Décoder le base64
    const fileBlob = Utilities.newBlob(
      Utilities.base64Decode(fileDataBase64),
      getMimeType(fileName),
      fileName
    );
    
    // Trouver ou créer le dossier de catégorie
    const parentFolderId = findOrCreateCategoryFolder(category);
    
    // Créer le fichier
    const folder = DriveApp.getFolderById(parentFolderId);
    const file = folder.createFile(fileBlob);
    
    // Rendre le fichier partageables
    file.setSharing(DriveApp.Access.READER, DriveApp.Permission.ANYONE);
    
    return {
      fileId: file.getId(),
      fileUrl: file.getUrl()
    };
    
  } catch (error) {
    Logger.log("Erreur création Drive: " + error);
    return null;
  }
}

// ============================================
// HELPER: Trouver ou créer dossier par catégorie
// ============================================

function findOrCreateCategoryFolder(category) {
  try {
    const parentFolder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    
    // Chercher le sous-dossier
    const folders = parentFolder.getFoldersByName(getCategoryFolderName(category));
    
    if (folders.hasNext()) {
      return folders.next().getId();
    } else {
      // Créer le dossier
      const newFolder = parentFolder.createFolder(getCategoryFolderName(category));
      return newFolder.getId();
    }
    
  } catch (error) {
    Logger.log("Erreur dossier: " + error);
    return CONFIG.DRIVE_FOLDER_ID; // Retourner le dossier parent en fallback
  }
}

function getCategoryFolderName(category) {
  const names = {
    'photo': '📸 Photos',
    'plan': '📐 Plans',
    'pv': '✅ PV Réception'
  };
  return names[category] || category;
}

// ============================================
// HELPER: Ajouter une ligne au Sheets
// ============================================

function addToSheet(category, fileName, date, description, fileId, fileUrl) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    
    // Ajouter une ligne
    const newRow = [
      getCategoryFolderName(category),  // Catégorie
      fileName,                          // Fichier
      date,                              // Date
      description,                       // Description
      fileUrl,                           // Lien
      fileId,                            // ID fichier (pour admin)
      new Date()                         // Date d'ajout (pour tracking)
    ];
    
    sheet.appendRow(newRow);
    
  } catch (error) {
    Logger.log("Erreur Sheets: " + error);
  }
}

// ============================================
// HELPER: Déterminer le type MIME
// ============================================

function getMimeType(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// ============================================
// HELPER: Formater la date
// ============================================

function formatDate(date) {
  if (!(date instanceof Date)) return date;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ============================================
// HELPER: Réponse JSON
// ============================================

function sendResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    ...data
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// TEST
// ============================================

function testUpload() {
  Logger.log("Test: Configuration OK");
  Logger.log("Sheet ID: " + CONFIG.SHEET_ID);
  Logger.log("Drive Folder ID: " + CONFIG.DRIVE_FOLDER_ID);
}
