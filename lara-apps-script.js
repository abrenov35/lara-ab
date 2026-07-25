/**
 * LARA Document Manager - Google Apps Script
 * Automatise la gestion des documents de chantier
 */

// ============================================
// 1. LISTER LES FICHIERS D'UN DOSSIER
// ============================================

function listFilesFromFolder() {
  // À remplacer par l'ID de votre dossier Google Drive LARA
  const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
  
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = [];
  
  // En-têtes
  data.push(["Nom du Fichier", "Type", "Date Ajout", "Taille", "Lien"]);
  
  // Parcourir tous les fichiers
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const fileType = getFileType(fileName);
    const dateAdded = file.getDateCreated();
    const fileSize = (file.getSize() / 1024).toFixed(2) + " KB";
    const fileUrl = file.getUrl();
    
    data.push([
      fileName,
      fileType,
      formatDate(dateAdded),
      fileSize,
      `=HYPERLINK("${fileUrl}","👁️ VOIR")`
    ]);
  }
  
  // Écrire dans le Sheets
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  
  Logger.log(`✅ ${data.length - 1} fichiers ajoutés au Sheets`);
}

// ============================================
// 2. HELPER: Déterminer le type de fichier
// ============================================

function getFileType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  
  const typeMap = {
    'jpg': '📸 Photo',
    'jpeg': '📸 Photo',
    'png': '📸 Photo',
    'gif': '📸 Photo',
    'pdf': '📐 Plan',
    'doc': '📄 Document',
    'docx': '📄 Document',
    'xlsx': '📊 Tableur',
    'xls': '📊 Tableur'
  };
  
  return typeMap[extension] || `📁 ${extension.toUpperCase()}`;
}

// ============================================
// 3. HELPER: Formater la date
// ============================================

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ============================================
// 4. CRÉER UN MENU PERSONNALISÉ
// ============================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('📄 LARA')
    .addItem('🔄 Rafraîchir les documents', 'listFilesFromFolder')
    .addItem('📸 Ajouter Photos', 'filterAndListPhotos')
    .addItem('📐 Ajouter Plans', 'filterAndListPlans')
    .addItem('✅ Ajouter PV', 'filterAndListPV')
    .addSeparator()
    .addItem('🗑️ Vider la feuille', 'clearSheet')
    .addToUi();
}

// ============================================
// 5. FILTRER PAR TYPE: PHOTOS
// ============================================

function filterAndListPhotos() {
  const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = [];
  
  data.push(["📸 Photos (Photos du Chantier)", "Date", "Lien"]);
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ext = fileName.split('.').pop().toLowerCase();
    
    // Filtrer seulement les images
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      data.push([
        fileName,
        formatDate(file.getDateCreated()),
        `=HYPERLINK("${file.getUrl()}","👁️ VOIR")`
      ]);
    }
  }
  
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  Logger.log(`✅ ${data.length - 1} photos affichées`);
}

// ============================================
// 6. FILTRER PAR TYPE: PLANS
// ============================================

function filterAndListPlans() {
  const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = [];
  
  data.push(["📐 Plans (Architecte/Technique)", "Date", "Lien"]);
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ext = fileName.split('.').pop().toLowerCase();
    
    // Filtrer seulement les PDF et fichiers bureautique
    if (['pdf', 'doc', 'docx'].includes(ext)) {
      data.push([
        fileName,
        formatDate(file.getDateCreated()),
        `=HYPERLINK("${file.getUrl()}","👁️ VOIR")`
      ]);
    }
  }
  
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  Logger.log(`✅ ${data.length - 1} plans affichés`);
}

// ============================================
// 7. FILTRER PAR TYPE: PV DE RÉCEPTION
// ============================================

function filterAndListPV() {
  const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = [];
  
  data.push(["✅ PV de Réception (Validation)", "Date", "Lien"]);
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    
    // Filtrer par mot-clé "PV" dans le nom
    if (fileName.toUpperCase().includes('PV') || fileName.toUpperCase().includes('RECEPTION')) {
      data.push([
        fileName,
        formatDate(file.getDateCreated()),
        `=HYPERLINK("${file.getUrl()}","👁️ VOIR")`
      ]);
    }
  }
  
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  Logger.log(`✅ ${data.length - 1} PV affichés`);
}

// ============================================
// 8. VIDER LA FEUILLE
// ============================================

function clearSheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.clearContents();
  Logger.log('✅ Feuille vidée');
}

// ============================================
// 9. CRÉER UN DOSSIER LARA AUTOMATIQUEMENT
// ============================================

function createLARAFolder() {
  // Crée un dossier "LARA-Chantier" dans Google Drive
  const folder = DriveApp.createFolder('LARA-Chantier-' + new Date().getTime());
  
  // Crée les sous-dossiers
  folder.createFolder('📸 Photos');
  folder.createFolder('📐 Plans');
  folder.createFolder('✅ PV Réception');
  
  const folderId = folder.getId();
  Logger.log(`✅ Dossier LARA créé: ${folderId}`);
  Logger.log(`👉 Mettez à jour FOLDER_ID = "${folderId}" dans le script`);
  
  return folderId;
}

// ============================================
// 10. COMPTER LES DOCUMENTS PAR CATÉGORIE
// ============================================

function countDocuments() {
  const FOLDER_ID = "VOTRE_FOLDER_ID_ICI";
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  
  let photos = 0, plans = 0, pv = 0;
  
  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const ext = fileName.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) photos++;
    else if (['pdf', 'doc', 'docx'].includes(ext)) plans++;
    else if (fileName.toUpperCase().includes('PV')) pv++;
  }
  
  Logger.log(`📊 RÉSUMÉ:`);
  Logger.log(`   📸 Photos: ${photos}`);
  Logger.log(`   📐 Plans: ${plans}`);
  Logger.log(`   ✅ PV: ${pv}`);
  Logger.log(`   📁 Total: ${photos + plans + pv}`);
}
