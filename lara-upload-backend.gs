/**
 * LARA Upload Backend - Google Apps Script Web App (V2 - Simplifié)
 * Structure Sheets: Catégorie | Fichier | Date | Description | Lien | ID
 */

const CONFIG = {
  SHEET_ID: "15PMBsiozp37HOUGL4uJefme4nNzpJ3I2bBFlwZ4AyVs",
  DRIVE_FOLDER_ID: "1uPol8K9ZzJgf_cRB-mT_0QpqB_ZnEuka",
  SHEET_NAME: "Feuille 1"
};

// ============================================
// WEB APP - Point d'entrée
// ============================================

function doPost(e) {
  try {
    // Lire le JSON du body
    const postData = e.postData.contents;
    const payload = JSON.parse(postData);
    const action = payload.action;
    
    Logger.log("Action reçue: " + action);
    Logger.log("Payload: " + JSON.stringify(payload));
    
    if (action === 'upload') {
      return handleUpload(payload);
    } else if (action === 'list') {
      return handleList(payload);
    } else {
      return sendResponse(false, "Action inconnue: " + action);
    }
  } catch (error) {
    Logger.log("Erreur doPost: " + error);
    return sendResponse(false, "Erreur: " + error.toString());
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    const documents = [];
    
    // Sauter l'en-tête (ligne 0)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const cat = row[0];
      const fileName = row[1];
      const date = row[2];
      const desc = row[3];
      const fileUrl = row[4];
      const fileId = row[5];
      
      if (fileName && fileUrl) {
        documents.push({
          cat: cat,
          name: fileName,
          date: date instanceof Date ? formatDate(date) : date,
          desc: desc,
          url: fileUrl,
          id: fileId
        });
      }
    }
    
    return sendResponse(true, "Liste récupérée", { data: documents });
    
  } catch (error) {
    Logger.log("Erreur doGet: " + error);
    return sendResponse(false, "Erreur: " + error.toString());
  }
}

// ============================================
// 1. HANDLE UPLOAD
// ============================================

function handleUpload(payload) {
  const category = payload.category;
  const date = payload.date;
  const description = payload.description || "";
  const fileName = payload.fileName;
  const fileData = payload.fileData;
  
  if (!category || !date || !fileName || !fileData) {
    return sendResponse(false, "Paramètres manquants");
  }
  
  try {
    // 1. Créer le fichier dans Google Drive
    const driveFile = createFileInDrive(category, fileName, fileData);
    
    if (!driveFile) {
      return sendResponse(false, "Erreur création fichier Drive");
    }
    
    // 2. Ajouter l'entrée au Sheets
    addToSheet(category, fileName, date, description, driveFile.fileUrl, driveFile.fileId);
    
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

function handleList(payload) {
  try {
    const category = payload.category;
    
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    const documents = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const cat = row[0];
      const fileName = row[1];
      const date = row[2];
      const desc = row[3];
      const fileUrl = row[4];
      
      if (category && cat !== category) continue;
      
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
// HELPERS
// ============================================

function createFileInDrive(category, fileName, fileDataBase64) {
  try {
    const fileBlob = Utilities.newBlob(
      Utilities.base64Decode(fileDataBase64),
      getMimeType(fileName),
      fileName
    );
    
    const parentFolderId = findOrCreateCategoryFolder(category);
    const folder = DriveApp.getFolderById(parentFolderId);
    const file = folder.createFile(fileBlob);
    
    file.setSharing(DriveApp.Access.READER, DriveApp.Permission.ANYONE);
    
    return {
      fileId: file.getId(),
      fileUrl: file.getUrl()
    };
    
  } catch (error) {
    Logger.log("Erreur Drive: " + error);
    return null;
  }
}

function findOrCreateCategoryFolder(category) {
  try {
    const parentFolder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
    const folderName = getCategoryFolderName(category);
    
    const folders = parentFolder.getFoldersByName(folderName);
    
    if (folders.hasNext()) {
      return folders.next().getId();
    } else {
      const newFolder = parentFolder.createFolder(folderName);
      return newFolder.getId();
    }
    
  } catch (error) {
    Logger.log("Erreur dossier: " + error);
    return CONFIG.DRIVE_FOLDER_ID;
  }
}

function getCategoryFolderName(category) {
  const names = {
    'photo': '📸 Photos',
    'plan': '📐 Plans',
    'pv': '✅ Documents'
  };
  return names[category] || category;
}

function addToSheet(category, fileName, date, description, fileUrl, fileId) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    
    const newRow = [
      getCategoryFolderName(category),
      fileName,
      date,
      description,
      fileUrl,
      fileId
    ];
    
    sheet.appendRow(newRow);
    
  } catch (error) {
    Logger.log("Erreur Sheets: " + error);
  }
}

function getMimeType(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  const types = {
    'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'gif': 'image/gif',
    'pdf': 'application/pdf', 'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  return types[ext] || 'application/octet-stream';
}

function formatDate(date) {
  if (!(date instanceof Date)) return date;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

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
// BONUS - Utilitaires d'administration
// ============================================

/**
 * Crée automatiquement la structure de dossiers LARA dans Google Drive
 * Exécute cette fonction UNE FOIS via le menu "Exécuter"
 */
function createLARAFolder() {
  try {
    // Crée un dossier parent avec timestamp
    const folder = DriveApp.createFolder('LARA-Chantier-' + new Date().getTime());
    
    // Crée les sous-dossiers
    folder.createFolder('📸 Photos');
    folder.createFolder('📐 Plans');
    folder.createFolder('✅ Documents');
    
    const folderId = folder.getId();
    Logger.log(`✅ Dossier LARA créé: ${folderId}`);
    Logger.log(`👉 Mettez à jour CONFIG.DRIVE_FOLDER_ID = "${folderId}"`);
    
    return folderId;
  } catch (error) {
    Logger.log("Erreur création dossier: " + error);
    return null;
  }
}

/**
 * Compte les documents par catégorie
 */
function countDocuments() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    let photos = 0, plans = 0, docs = 0;
    
    for (let i = 1; i < data.length; i++) {
      const cat = data[i][0];
      if (cat.includes('📸')) photos++;
      else if (cat.includes('📐')) plans++;
      else if (cat.includes('✅')) docs++;
    }
    
    Logger.log(`📊 RÉSUMÉ:`);
    Logger.log(`   📸 Photos: ${photos}`);
    Logger.log(`   📐 Plans: ${plans}`);
    Logger.log(`   ✅ Documents: ${docs}`);
    Logger.log(`   📁 Total: ${photos + plans + docs}`);
  } catch (error) {
    Logger.log("Erreur count: " + error);
  }
}
