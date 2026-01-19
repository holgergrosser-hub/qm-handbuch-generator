/**
 * QM-HANDBUCH GENERATOR - Google Apps Script Backend
 * 
 * Funktionen:
 * - Empfängt Formulardaten von Netlify Frontend
 * - Füllt DOCX Template mit Kundendaten
 * - Generiert PDF und DOCX Output
 * - Versendet Email mit beiden Dateien
 * - Speichert Logs in Google Sheets
 */

// ============================================================================
// KONFIGURATION - HIER DEINE IDs EINTRAGEN!
// ============================================================================

const CONFIG = {
  // Google Drive IDs
  TEMPLATE_FILE_ID: 'DEINE_TEMPLATE_DOC_ID_HIER',  // DOCX Template für QM-Handbuch
  OUTPUT_FOLDER_ID: 'DEIN_OUTPUT_ORDNER_ID_HIER',  // Ordner für generierte PDFs/DOCXs
  LOGO_FOLDER_ID: 'DEIN_LOGO_ORDNER_ID_HIER',      // Ordner für Kunden-Logos
  
  // Google Sheets für Logging
  LOG_SHEET_ID: 'DEINE_SHEET_ID_HIER',             // Optional: Log-Tabelle
  
  // Email Einstellungen
  ADMIN_EMAIL: 'holger.grosser@iso9001.info',      // Deine Email für Benachrichtigungen
  
  // URLs für Marketing CTAs
  QM_GURU_URL: 'https://qm-guru.de/beratung-anfragen',
  ONLINECERT_URL: 'https://onlinecert.de/zertifizierung-anfragen'
};

// ============================================================================
// HAUPTFUNKTION - Webhook Endpoint
// ============================================================================

function doPost(e) {
  try {
    // CORS Headers setzen
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Daten vom Frontend parsen
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('Empfangene Daten: ' + JSON.stringify(data));
    
    // Validierung
    if (!data.firmenname || !data.email) {
      return createResponse({
        success: false,
        error: 'Firmenname und Email sind Pflichtfelder'
      });
    }
    
    // 1. Logo verarbeiten (falls hochgeladen)
    let logoFileId = null;
    if (data.logo_base64) {
      logoFileId = saveLogo(data.logo_base64, data.firmenname);
    }
    
    // 2. QM-Handbuch erstellen
    const docxFile = createQMHandbuch(data, logoFileId);
    const pdfFile = convertToPDF(docxFile);
    
    // 3. Email versenden
    sendEmail(data, docxFile, pdfFile);
    
    // 4. Log speichern (optional)
    if (CONFIG.LOG_SHEET_ID) {
      logToSheet(data, docxFile.getId(), pdfFile.getId());
    }
    
    // Erfolgsantwort
    return createResponse({
      success: true,
      message: 'QM-Handbuch erfolgreich erstellt und versendet',
      files: {
        docx: docxFile.getUrl(),
        pdf: pdfFile.getUrl()
      }
    });
    
  } catch (error) {
    Logger.log('FEHLER: ' + error.toString());
    return createResponse({
      success: false,
      error: error.toString()
    });
  }
}

// ============================================================================
// LOGO VERARBEITUNG
// ============================================================================

function saveLogo(base64Data, firmenname) {
  try {
    // Base64 dekodieren
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      'image/png',
      firmenname + '_logo.png'
    );
    
    // In Logo-Ordner speichern
    const folder = DriveApp.getFolderById(CONFIG.LOGO_FOLDER_ID);
    const file = folder.createFile(blob);
    
    Logger.log('Logo gespeichert: ' + file.getId());
    return file.getId();
    
  } catch (error) {
    Logger.log('Logo-Fehler: ' + error.toString());
    return null;
  }
}

// ============================================================================
// QM-HANDBUCH ERSTELLEN
// ============================================================================

function createQMHandbuch(data, logoFileId) {
  // Template kopieren
  const template = DriveApp.getFileById(CONFIG.TEMPLATE_FILE_ID);
  const outputFolder = DriveApp.getFolderById(CONFIG.OUTPUT_FOLDER_ID);
  
  const fileName = `QM-Handbuch_${data.firmenname}_${new Date().toISOString().split('T')[0]}`;
  const docCopy = template.makeCopy(fileName, outputFolder);
  
  // Dokument öffnen
  const doc = DocumentApp.openById(docCopy.getId());
  const body = doc.getBody();
  
  // Platzhalter ersetzen
  const replacements = {
    '{{FIRMENNAME}}': data.firmenname || '',
    '{{GELTUNGSBEREICH}}': data.geltungsbereich || '',
    '{{KUNDENGRUPPEN}}': data.kundengruppen || '',
    '{{ENTWICKLUNG}}': data.hat_entwicklung ? 'Ja' : 'Nein',
    '{{PRUEFMITTEL}}': data.hat_pruefmittel ? 'Ja' : 'Nein',
    '{{DIENSTLEISTER}}': data.ist_dienstleister ? 'Ja' : 'Nein',
    '{{ANSPRECHPARTNER}}': data.ansprechpartner || '',
    '{{EMAIL}}': data.email || '',
    '{{TELEFON}}': data.telefon || '',
    '{{DATUM}}': Utilities.formatDate(new Date(), 'Europe/Berlin', 'dd.MM.yyyy'),
    '{{BRANCHE}}': data.branche || '',
    '{{MITARBEITERANZAHL}}': data.mitarbeiteranzahl || '',
    '{{STANDORT}}': data.standort || ''
  };
  
  // Alle Platzhalter ersetzen
  Object.keys(replacements).forEach(placeholder => {
    body.replaceText(placeholder, replacements[placeholder]);
  });
  
  // Logo einfügen (falls vorhanden)
  if (logoFileId) {
    insertLogo(doc, logoFileId);
  }
  
  doc.saveAndClose();
  
  Logger.log('QM-Handbuch erstellt: ' + docCopy.getId());
  return docCopy;
}

// ============================================================================
// LOGO IN DOKUMENT EINFÜGEN
// ============================================================================

function insertLogo(doc, logoFileId) {
  try {
    const logoFile = DriveApp.getFileById(logoFileId);
    const logoBlob = logoFile.getBlob();
    const body = doc.getBody();
    
    // Suche nach Platzhalter {{LOGO}} und ersetze mit Bild
    const search = body.findText('{{LOGO}}');
    if (search) {
      const element = search.getElement();
      const parent = element.getParent();
      
      // Logo einfügen (max. 100px Breite)
      const image = parent.asParagraph().insertInlineImage(0, logoBlob);
      image.setWidth(100);
      
      // Platzhalter-Text entfernen
      element.asText().setText('');
    }
    
  } catch (error) {
    Logger.log('Logo-Einfügen-Fehler: ' + error.toString());
  }
}

// ============================================================================
// PDF KONVERTIERUNG
// ============================================================================

function convertToPDF(docxFile) {
  const docId = docxFile.getId();
  const doc = DocumentApp.openById(docId);
  const docBlob = doc.getAs('application/pdf');
  
  // PDF-Dateiname
  const pdfName = docxFile.getName().replace(/\.docx?$/, '') + '.pdf';
  
  // PDF im gleichen Ordner speichern
  const outputFolder = DriveApp.getFolderById(CONFIG.OUTPUT_FOLDER_ID);
  const pdfFile = outputFolder.createFile(docBlob.setName(pdfName));
  
  Logger.log('PDF erstellt: ' + pdfFile.getId());
  return pdfFile;
}

// ============================================================================
// EMAIL VERSENDEN
// ============================================================================

function sendEmail(data, docxFile, pdfFile) {
  const subject = `Ihr QM-Handbuch für ISO 9001 - ${data.firmenname}`;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { 
          display: inline-block; 
          padding: 12px 30px; 
          background: #0066cc; 
          color: white; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 10px 5px;
        }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .cta-box { 
          background: #fff3cd; 
          border-left: 4px solid #ffc107; 
          padding: 15px; 
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Ihr QM-Handbuch ist fertig!</h1>
        </div>
        
        <div class="content">
          <p>Sehr geehrte/r ${data.ansprechpartner || 'Kunde'},</p>
          
          <p>vielen Dank für Ihr Vertrauen! Wir haben Ihr individuelles 
          <strong>Qualitätsmanagement-Handbuch für ISO 9001</strong> erstellt.</p>
          
          <p><strong>Ihr Handbuch enthält:</strong></p>
          <ul>
            <li>✅ Firmendaten und Geltungsbereich</li>
            <li>✅ Prozessbeschreibungen nach ISO 9001</li>
            <li>✅ Vorlagen für Ihre Dokumentation</li>
            <li>✅ Checklisten und Arbeitsanweisungen</li>
          </ul>
          
          <p><strong>Verfügbare Formate:</strong></p>
          <p>
            <a href="${docxFile.getUrl()}" class="button">📄 DOCX herunterladen</a>
            <a href="${pdfFile.getUrl()}" class="button">📕 PDF herunterladen</a>
          </p>
          
          <div class="cta-box">
            <h3>🤝 Brauchen Sie Hilfe bei der Umsetzung?</h3>
            <p>Unser QM-Guru Team unterstützt Sie gerne bei:</p>
            <ul>
              <li>Anpassung des Handbuchs an Ihre Prozesse</li>
              <li>Schulung Ihrer Mitarbeiter</li>
              <li>Vorbereitung auf die Zertifizierung</li>
            </ul>
            <p style="text-align: center;">
              <a href="${CONFIG.QM_GURU_URL}" class="button">💼 Beratung anfragen</a>
            </p>
          </div>
          
          <div class="cta-box">
            <h3>🏆 Bereit für die Zertifizierung?</h3>
            <p>OnlineCert bietet Ihnen:</p>
            <ul>
              <li>✅ 70% günstigere Zertifizierung</li>
              <li>✅ 3-6 Wochen statt 3-6 Monate</li>
              <li>✅ Transparente Preise</li>
            </ul>
            <p style="text-align: center;">
              <a href="${CONFIG.ONLINECERT_URL}" class="button">🎯 Zertifizierung anfragen</a>
            </p>
          </div>
          
          <p>Bei Fragen stehen wir Ihnen jederzeit zur Verfügung!</p>
          
          <p>Mit freundlichen Grüßen<br>
          <strong>Holger Grosser</strong><br>
          QM-Guru Team</p>
        </div>
        
        <div class="footer">
          <p>QM-Dienstleistungen Holger Grosser<br>
          Fürth, Deutschland<br>
          <a href="mailto:${CONFIG.ADMIN_EMAIL}">${CONFIG.ADMIN_EMAIL}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Email senden
  GmailApp.sendEmail(
    data.email,
    subject,
    'Bitte HTML-Email aktivieren um diese Nachricht anzuzeigen.',
    {
      htmlBody: htmlBody,
      cc: CONFIG.ADMIN_EMAIL,
      name: 'QM-Guru Team',
      attachments: [
        docxFile.getAs('application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
        pdfFile.getAs('application/pdf')
      ]
    }
  );
  
  Logger.log('Email versendet an: ' + data.email);
}

// ============================================================================
// LOGGING IN GOOGLE SHEETS
// ============================================================================

function logToSheet(data, docxId, pdfId) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID).getActiveSheet();
    
    sheet.appendRow([
      new Date(),
      data.firmenname,
      data.ansprechpartner,
      data.email,
      data.telefon,
      data.geltungsbereich,
      data.hat_entwicklung ? 'Ja' : 'Nein',
      data.hat_pruefmittel ? 'Ja' : 'Nein',
      data.ist_dienstleister ? 'Ja' : 'Nein',
      `https://docs.google.com/document/d/${docxId}`,
      `https://drive.google.com/file/d/${pdfId}`
    ]);
    
    Logger.log('Log gespeichert in Sheet');
  } catch (error) {
    Logger.log('Sheet-Logging-Fehler: ' + error.toString());
  }
}

// ============================================================================
// HILFSFUNKTIONEN
// ============================================================================

function createResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  output.addHeader('Access-Control-Allow-Origin', '*');
  output.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  output.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  return output;
}

// OPTIONS Handler für CORS Preflight
function doOptions() {
  return createResponse({ status: 'ok' });
}
