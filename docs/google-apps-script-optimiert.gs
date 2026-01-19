// ============================================================================
// QM-HANDBUCH GENERATOR - OPTIMIERTES BACKEND
// ============================================================================
// Version: 2.0
// Erstellt: Januar 2025
// 
// Dieses Script:
// - Empfängt Daten vom Frontend (Netlify)
// - Füllt DOCX Template mit 25 Platzhaltern
// - Verwendet vordefinierte Textbausteine (90% fix, 10% dynamic)
// - Fügt Logo ein
// - Generiert PDF
// - Versendet Email mit Word + PDF
// ============================================================================

// ============================================================================
// KONFIGURATION - HIER ANPASSEN!
// ============================================================================

const CONFIG = {
  // Google Drive IDs
  TEMPLATE_FILE_ID: 'DEINE_TEMPLATE_FILE_ID_HIER',  // QM_Handbuch_Template_KOMPLETT.docx
  OUTPUT_FOLDER_ID: 'DEINE_OUTPUT_FOLDER_ID_HIER',   // Ordner für generierte Handbücher
  LOGO_FOLDER_ID: 'DEINE_LOGO_FOLDER_ID_HIER',       // Ordner für Logo-Uploads
  
  // Email Konfiguration
  ADMIN_EMAIL: 'holger.grosser@iso9001.info',
  
  // URLs für Marketing
  QM_GURU_URL: 'https://qm-guru.de/beratung',
  ONLINECERT_URL: 'https://onlinecert.de/zertifizierung',
  
  // Optional: Google Sheets Logging
  LOG_SHEET_ID: '',  // Leer lassen wenn kein Logging gewünscht
  
  // Dokument-Einstellungen
  DOC_VERSION: '1.0',
  APPROVAL_ROLE: 'Geschäftsführung'
};

// ============================================================================
// TEXTBAUSTEINE BIBLIOTHEK
// ============================================================================

const TEXTBAUSTEINE = {
  
  // Unternehmensart-Texte
  company_type: {
    dienstleistung: 'reines Dienstleistungsunternehmen',
    produktion_mit: 'Produktionsunternehmen mit eigener Entwicklung und Konstruktion',
    produktion_ohne: 'Produktionsunternehmen',
    handel: 'Handelsunternehmen',
    gemischt: 'Dienstleistungs- und Produktionsunternehmen'
  },
  
  // Qualitätspolitik-Stile (vollständige Texte)
  quality_policy: {
    modern: `Qualität bedeutet für {{COMPANY_NAME}}:

• Kundenerwartungen übertreffen
  Wir hören zu, verstehen Anforderungen und liefern Lösungen, die begeistern.

• Prozesse kontinuierlich verbessern
  Wir hinterfragen etablierte Abläufe und optimieren systematisch.

• Verantwortung leben
  Jeder Mitarbeiter trägt zur Qualität bei und handelt eigenverantwortlich.

Diese Grundsätze sind verbindlich für alle Mitarbeiter und Führungskräfte.`,

    traditional: `Die Geschäftsführung der {{COMPANY_NAME}} verpflichtet sich zur Einhaltung höchster Qualitätsstandards in allen Unternehmensbereichen.

Unsere Qualitätspolitik basiert auf folgenden Grundsätzen:

1. Kundenorientierung
   Kundenzufriedenheit ist unser oberstes Ziel. Wir erfüllen vereinbarte Anforderungen zuverlässig und termingerecht.

2. Mitarbeiterqualifikation
   Qualifizierte und motivierte Mitarbeiter sind die Grundlage unseres Erfolgs. Wir fördern kontinuierliche Weiterbildung.

3. Prozessorientierung
   Unsere Prozesse sind klar definiert, dokumentiert und werden regelmäßig auf Wirksamkeit überprüft.

4. Lieferantenmanagement
   Wir arbeiten mit qualifizierten Lieferanten zusammen und stellen sicher, dass eingekaufte Produkte unseren Anforderungen entsprechen.

5. Kontinuierliche Verbesserung
   Wir fördern eine Kultur der ständigen Verbesserung durch systematische Analyse von Kennzahlen und Ableitung von Verbesserungsmaßnahmen.

Diese Qualitätspolitik wird allen Mitarbeitern kommuniziert und ist verbindliche Grundlage unseres Handelns.`,

    customer: `Bei {{COMPANY_NAME}} steht der Kunde im Mittelpunkt.

Unsere Versprechen:

✓ Qualität, die überzeugt
  Wir liefern Produkte/Dienstleistungen, die Erwartungen nicht nur erfüllen, sondern übertreffen.

✓ Verlässlichkeit, auf die Sie zählen können
  Vereinbarte Termine und Spezifikationen halten wir ein – garantiert.

✓ Service, der begeistert
  Wir sind erreichbar, reagieren schnell und lösen Probleme proaktiv.

✓ Partnerschaft auf Augenhöhe
  Ihr Feedback ist wertvoll. Wir hören zu und entwickeln uns gemeinsam weiter.

Diese Kundenversprechen leben wir jeden Tag – messbar, nachweisbar, erlebbar.`,

    innovation: `Innovation und Qualität sind bei {{COMPANY_NAME}} untrennbar verbunden.

Unsere Innovationsgrundsätze:

→ Denken Sie voraus
  Wir antizipieren Marktentwicklungen und entwickeln Lösungen, bevor Anforderungen entstehen.

→ Lernen Sie aus Fehlern
  Fehler sind Chancen. Wir analysieren systematisch, lernen und verbessern kontinuierlich.

→ Fördern Sie Kreativität
  Jeder Mitarbeiter kann Verbesserungsvorschläge einbringen. Gute Ideen werden umgesetzt.

→ Messen Sie Erfolg
  Innovation ohne Kennzahlen ist Zufall. Wir messen, bewerten und steuern unsere Innovationskraft.

Qualität von heute ist der Standard von morgen – deshalb verbessern wir uns täglich.`
  },
  
  // Entwicklungs-Ausschlüsse
  development: {
    excluded: `Ein Entwicklungsprozess ist für die Erbringung unserer Leistungen nicht erforderlich und wird daher gemäß ISO 9001:2015 Kapitel 8.3 ausgeschlossen.

Sollte sich die Notwendigkeit eines Entwicklungsprozesses ergeben, wird dieser in das QM-System integriert und dokumentiert.`,

    included: `Die Entwicklung neuer Produkte/Dienstleistungen erfolgt gemäß definiertem Entwicklungsprozess. Dabei werden Kundenanforderungen systematisch erfasst, Konzepte entwickelt, validiert und freigegeben.

Die Entwicklungsdokumentation umfasst:
• Anforderungsspezifikationen
• Entwicklungspläne und -schritte
• Validierungsnachweise
• Freigabedokumente
• Änderungsmanagement`
  },
  
  // Prüfmittel-Ausschlüsse
  measurement: {
    excluded: `Überwachungspflichtige Prüfmittel werden nicht eingesetzt. Die Leistungserbringung erfordert keine messtechnische Überwachung. Daher wird ISO 9001:2015 Kapitel 7.1.5.2 als nicht zutreffend betrachtet.`,

    included: `Überwachungspflichtige Prüfmittel werden gemäß Kalibrierplan regelmäßig kalibriert und überwacht. Die Kalibrierung erfolgt durch akkreditierte Kalibrierlabore oder durch Werkskalibrierung mit rückführbaren Normalen.

Kalibrierte Prüfmittel werden gekennzeichnet mit:
• Kalibrierungsdatum
• Nächstem Kalibriertermin
• Eindeutiger Identifikation
• Kalibrierstatus

Ein Prüfmittelverzeichnis dokumentiert alle überwachungspflichtigen Prüfmittel.`
  },
  
  // Outsourcing
  outsourcing: {
    no: `Es liegen keine ausgelagerten Prozesse vor, die direkten Einfluss auf die Produktqualität oder Leistungserbringung haben.

Unterstützende Dienstleistungen wie Gebäudereinigung, IT-Support oder Wartung werden durch externe Dienstleister erbracht, unterliegen jedoch nicht der QM-Überwachung gemäß ISO 9001:2015 Kapitel 8.4.`,

    yes: `Folgende Prozesse werden teilweise oder vollständig ausgelagert:
{{OUTSOURCED_DETAILS}}

Für ausgelagerte Prozesse gilt:
• Qualitätsanforderungen werden vertraglich vereinbart
• Regelmäßige Bewertung der Lieferantenleistung
• Eingangskontrollen stellen Konformität sicher
• Bei kritischen Prozessen: Audits beim Lieferanten

Die Verantwortung für die Qualität ausgelagerter Prozesse verbleibt bei {{COMPANY_NAME}}.`
  },
  
  // QMB-Rolle
  qmb_role: {
    yes: `Die Funktion des Qualitätsmanagementbeauftragten (QMB) ist etabliert.

Aufgaben des QMB:
• Sicherstellung der Wirksamkeit des QM-Systems
• Berichterstattung an die Geschäftsführung über die Leistung des QM-Systems
• Koordination und Durchführung interner Audits
• Schulung und Beratung der Mitarbeiter zu QM-Themen
• Pflege und Aktualisierung der QM-Dokumentation
• Ansprechpartner für externe Auditoren und Zertifizierungsstellen

Der QMB berichtet direkt an die Geschäftsführung und verfügt über die erforderlichen Befugnisse zur Durchsetzung von Qualitätsanforderungen.`,

    no: `Die Verantwortung für das Qualitätsmanagementsystem liegt bei der Geschäftsführung.

Aufgrund der Unternehmensgröße von {{EMPLOYEE_COUNT}} ist keine separate QMB-Funktion erforderlich. Die Geschäftsführung nimmt die Aufgaben des Qualitätsmanagements direkt wahr:

• Festlegung der Qualitätspolitik und Qualitätsziele
• Bereitstellung von Ressourcen für das QM-System
• Durchführung von Managementbewertungen
• Sicherstellung der Kundenfokussierung
• Förderung der kontinuierlichen Verbesserung
• Koordination von internen Audits
• Ansprechpartner für Zertifizierungsstellen`
  },
  
  // Kundengruppen-Texte
  customer_groups: {
    'B2B - Industrie': 'Unsere Hauptkunden sind mittelständische und große Industrieunternehmen. Wir verstehen ihre spezifischen Anforderungen an Qualität, Liefertreue und technische Kompetenz.',
    
    'B2B - Öffentliche Auftraggeber': 'Wir arbeiten mit öffentlichen Auftraggebern und Behörden zusammen. Dabei berücksichtigen wir die besonderen Anforderungen an Dokumentation, Transparenz und Vergaberichtlinien.',
    
    'B2B - Handel': 'Unsere Kunden im Handel erwarten zuverlässige Lieferungen, konstante Qualität und flexible Abwicklung. Wir verstehen die Anforderungen des Handels und passen unsere Prozesse entsprechend an.',
    
    'B2C - Privatkunden': 'Unsere Kunden sind Privatkunden mit hohen Erwartungen an Service, Beratung und Produktqualität. Kundenzufriedenheit steht im Mittelpunkt unseres Handelns.',
    
    'B2G - Behörden': 'Als Partner von Behörden und öffentlichen Einrichtungen erfüllen wir strenge Vorgaben zu Compliance, Datenschutz und Qualitätssicherung.',
    
    'International': 'Wir beliefern Kunden im internationalen Markt. Dabei berücksichtigen wir unterschiedliche Standards, Normen und kulturelle Anforderungen.'
  }
};

// ============================================================================
// HAUPTFUNKTION - doPost (wird von Netlify aufgerufen)
// ============================================================================

function doPost(e) {
  try {
    // 1. Daten vom Frontend parsen
    const data = JSON.parse(e.postData.contents);
    Logger.log('Empfangene Daten: ' + JSON.stringify(data));
    
    // 2. QM-Handbuch erstellen
    const result = createQMHandbuch(data);
    
    // 3. Optional: In Google Sheets loggen
    if (CONFIG.LOG_SHEET_ID) {
      logToSheet(data, result);
    }
    
    // 4. Erfolgs-Response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'QM-Handbuch erfolgreich erstellt',
        docx_url: result.docxUrl,
        pdf_url: result.pdfUrl
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Fehler: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// HAUPT-LOGIK: QM-Handbuch erstellen
// ============================================================================

function createQMHandbuch(data) {
  // 1. Template kopieren
  const template = DriveApp.getFileById(CONFIG.TEMPLATE_FILE_ID);
  const outputFolder = DriveApp.getFolderById(CONFIG.OUTPUT_FOLDER_ID);
  const fileName = `QM-Handbuch_${data.company_name}_${getFormattedDate()}`;
  
  const docCopy = template.makeCopy(fileName, outputFolder);
  const doc = DocumentApp.openById(docCopy.getId());
  
  // 2. Alle Platzhalter ersetzen
  const replacements = buildReplacements(data);

  replacePlaceholdersInDocument_(doc, replacements);
  
  // 3. Logo einfügen (falls vorhanden)
  if (data.logo_base64) {
    insertLogo(doc, data.logo_base64);
  }
  
  // 4. Dokument speichern
  doc.saveAndClose();
  
  // 5. PDF generieren
  const pdfFile = convertToPDF(docCopy);
  
  // 6. Email versenden
  sendEmail(data, docCopy, pdfFile);
  
  // 7. URLs zurückgeben
  return {
    docxUrl: docCopy.getUrl(),
    pdfUrl: pdfFile.getUrl(),
    docxId: docCopy.getId(),
    pdfId: pdfFile.getId()
  };
}

// ============================================================================
// REPLACEMENTS BUILDER - Alle Platzhalter → Werte
// ============================================================================

function buildReplacements(data) {
  const replacements = {};
  
  // Direkte Ersetzungen (1:1 vom Frontend)
  replacements['{{COMPANY_NAME}}'] = data.company_name;
  replacements['{{COMPANY_ADDRESS}}'] = data.company_address;
  replacements['{{COMPANY_CITY}}'] = data.company_city;
  replacements['{{COMPANY_COUNTRY}}'] = data.company_country || 'Deutschland';
  replacements['{{CONTACT_PHONE}}'] = data.contact_phone || '';
  replacements['{{CONTACT_EMAIL}}'] = data.contact_email;
  replacements['{{CONTACT_PERSON}}'] = data.contact_person;
  replacements['{{EMPLOYEE_COUNT}}'] = data.employee_count;
  replacements['{{SERVICES_PRODUCTS}}'] = data.services_products;
  replacements['{{SCOPE_TEXT}}'] = data.scope_text;
  replacements['{{SPECIAL_NOTES}}'] = data.special_notes || '';
  
  // Automatische Felder
  replacements['{{DOC_DATE}}'] = getFormattedDate();
  replacements['{{DOC_VERSION}}'] = CONFIG.DOC_VERSION;
  replacements['{{APPROVAL_ROLE}}'] = CONFIG.APPROVAL_ROLE;
  
  // Auto-generierte Texte
  replacements['{{COMPANY_TYPE}}'] = TEXTBAUSTEINE.company_type[data.company_type] || data.company_type;
  
  replacements['{{MARKET_REGION}}'] = Array.isArray(data.market_region) 
    ? data.market_region.join(', ') 
    : data.market_region;
  
  // Kundengruppen → Textbaustein
  replacements['{{STAKEHOLDER_CUSTOMERS}}'] = getCustomerGroupsText(data.customer_groups);
  
  // Outsourcing
  replacements['{{OUTSOURCED_PROCESS_TEXT}}'] = data.has_outsourcing 
    ? TEXTBAUSTEINE.outsourcing.yes.replace('{{OUTSOURCED_DETAILS}}', data.outsourced_details || 'Siehe Prozesslandkarte')
    : TEXTBAUSTEINE.outsourcing.no;
  
  // Entwicklung
  replacements['{{EXCLUSION_DEVELOPMENT}}'] = data.has_development 
    ? TEXTBAUSTEINE.development.included 
    : TEXTBAUSTEINE.development.excluded;
  
  // Prüfmittel
  replacements['{{EXCLUSION_MEASUREMENT}}'] = data.has_measurement 
    ? TEXTBAUSTEINE.measurement.included 
    : TEXTBAUSTEINE.measurement.excluded;
  
  // QMB
  replacements['{{QMB_TEXT}}'] = data.role_qmb 
    ? TEXTBAUSTEINE.qmb_role.yes 
    : TEXTBAUSTEINE.qmb_role.no.replace('{{EMPLOYEE_COUNT}}', data.employee_count);
  
  // Qualitätspolitik
  let qpText = TEXTBAUSTEINE.quality_policy[data.quality_policy_style] || TEXTBAUSTEINE.quality_policy.modern;
  qpText = qpText.replace(/{{COMPANY_NAME}}/g, data.company_name);
  replacements['{{QUALITY_POLICY_TEXT}}'] = qpText;
  
  // Logo Platzhalter (wird später durch Bild ersetzt, jetzt erstmal leeren)
  replacements['{{LOGO}}'] = '';
  
  return replacements;
}

// ============================================================================
// HELPER: Kundengruppen-Text generieren
// ============================================================================

function getCustomerGroupsText(groups) {
  if (!groups || groups.length === 0) {
    return 'Unsere Kundengruppen wurden definiert und deren Anforderungen werden regelmäßig ermittelt.';
  }
  
  if (Array.isArray(groups)) {
    if (groups.length === 1) {
      return TEXTBAUSTEINE.customer_groups[groups[0]] || groups[0];
    } else {
      // Mehrere Gruppen → kombinieren
      const texts = groups.map(g => TEXTBAUSTEINE.customer_groups[g] || g);
      return `Unsere Kundengruppen umfassen: ${groups.join(', ')}.\n\n${texts.join('\n\n')}`;
    }
  }
  
  return groups; // Falls bereits als String übergeben
}

// ============================================================================
// LOGO EINFÜGEN
// ============================================================================

function insertLogo(doc, base64Data) {
  try {
    // Base64 → Blob
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      'image/png',
      'logo.png'
    );
    
    // In Logo-Ordner speichern
    const logoFolder = DriveApp.getFolderById(CONFIG.LOGO_FOLDER_ID);
    const logoFile = logoFolder.createFile(blob);
    
    // In Dokument einfügen (Body, Header, Footer)
    const containers = [
      doc.getBody(),
      safeGetHeader_(doc),
      safeGetFooter_(doc)
    ].filter(Boolean);

    let inserted = false;
    for (const container of containers) {
      const logoPlaceholder = container.findText('{{LOGO}}');
      if (!logoPlaceholder) continue;

      const element = logoPlaceholder.getElement();
      let parent = element.getParent();

      // In Templates kann der Text in Tabellen/anderen Elementen stecken → bis zum Absatz hochlaufen
      while (parent && parent.getType && parent.getType() !== DocumentApp.ElementType.PARAGRAPH) {
        parent = parent.getParent && parent.getParent();
      }

      if (parent && parent.getType && parent.getType() === DocumentApp.ElementType.PARAGRAPH) {
        const para = parent.asParagraph();
        para.clear();

        // Bild einfügen (max 200px breit)
        const image = para.appendInlineImage(logoFile.getBlob());
        image.setWidth(200);

        // Zentrieren
        para.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      Logger.log('LOGO Platzhalter nicht gefunden (weder Body noch Header/Footer)');
    }
    
    Logger.log('Logo erfolgreich eingefügt');
    
  } catch (error) {
    Logger.log('Fehler beim Logo einfügen: ' + error.toString());
    // Nicht kritisch - weiter ohne Logo
  }
}

// ============================================================================
// PDF GENERIEREN
// ============================================================================

function convertToPDF(docFile) {
  const docId = docFile.getId();
  const pdfBlob = DriveApp.getFileById(docId).getAs('application/pdf');
  const pdfName = docFile.getName().replace('.docx', '') + '.pdf';
  
  const outputFolder = DriveApp.getFolderById(CONFIG.OUTPUT_FOLDER_ID);
  const pdfFile = outputFolder.createFile(pdfBlob);
  pdfFile.setName(pdfName);
  
  return pdfFile;
}

// ============================================================================
// HELPER: Platzhalter auch in Header/Footer ersetzen
// ============================================================================

function replacePlaceholdersInDocument_(doc, replacements) {
  const body = doc.getBody();
  const header = safeGetHeader_(doc);
  const footer = safeGetFooter_(doc);

  for (const [placeholder, value] of Object.entries(replacements)) {
    const searchPattern = escapeForDocsReplaceText_(placeholder);
    const replacement = value || '';

    body.replaceText(searchPattern, replacement);
    if (header) header.replaceText(searchPattern, replacement);
    if (footer) footer.replaceText(searchPattern, replacement);
  }
}

function safeGetHeader_(doc) {
  try {
    return doc.getHeader();
  } catch (e) {
    return null;
  }
}

function safeGetFooter_(doc) {
  try {
    return doc.getFooter();
  } catch (e) {
    return null;
  }
}

function escapeForDocsReplaceText_(text) {
  // DocumentApp.replaceText nutzt Regex-Suchmuster. Wir escapen daher alle Sonderzeichen.
  return String(text).replace(/[\\.^$|?*+()[\]{}]/g, '\\$&');
}

// ============================================================================
// EMAIL VERSENDEN
// ============================================================================

function sendEmail(data, docxFile, pdfFile) {
  const recipient = data.contact_email;
  const subject = `Ihr QM-Handbuch nach ISO 9001:2015 - ${data.company_name}`;
  
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #004a99 100%); 
                 color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; }
        .footer { background: #e9ecef; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; padding: 12px 30px; background: #28a745; 
                 color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
        .button:hover { background: #218838; }
        h1 { margin: 0; font-size: 24px; }
        h2 { color: #0066cc; }
        ul { padding-left: 20px; }
        li { margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Ihr QM-Handbuch ist fertig!</h1>
        </div>
        
        <div class="content">
          <p>Sehr geehrte/r ${data.contact_person},</p>
          
          <p>vielen Dank für Ihr Vertrauen! Ihr persönliches <strong>Qualitätsmanagement-Handbuch 
          nach ISO 9001:2015</strong> wurde erfolgreich erstellt.</p>
          
          <h2>📄 Ihre Dokumente</h2>
          <p>Im Anhang dieser Email finden Sie:</p>
          <ul>
            <li><strong>Word-Dokument (.docx)</strong> - zum Bearbeiten und Anpassen</li>
            <li><strong>PDF-Dokument (.pdf)</strong> - zum Drucken und Verteilen</li>
          </ul>
          
          <h2>✅ Nächste Schritte</h2>
          <p>Ihr QM-Handbuch ist die Grundlage Ihres Qualitätsmanagementsystems. 
          Wir empfehlen:</p>
          <ul>
            <li>Prüfen Sie das Handbuch auf Vollständigkeit</li>
            <li>Passen Sie ggf. firmenspezifische Details an</li>
            <li>Lassen Sie es von der Geschäftsführung freigeben</li>
            <li>Kommunizieren Sie es an alle Mitarbeiter</li>
          </ul>
          
          <h2>🤝 Brauchen Sie Unterstützung?</h2>
          <p>Gerne unterstützen wir Sie bei der Umsetzung und Zertifizierung:</p>
          
          <p style="text-align: center;">
            <a href="${CONFIG.QM_GURU_URL}" class="button">💼 Beratung anfragen</a>
            <a href="${CONFIG.ONLINECERT_URL}" class="button">🏆 Zertifizierung anfragen</a>
          </p>
          
          <p><strong>OnlineCert Vorteile:</strong></p>
          <ul>
            <li>✅ 70% günstiger als traditionelle Zertifizierer</li>
            <li>✅ 10x schneller (3-6 Wochen statt 3-6 Monate)</li>
            <li>✅ Professionell und transparent</li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>QM-Dienstleistungen Holger Grosser</strong><br>
          Fürth, Deutschland<br>
          Email: ${CONFIG.ADMIN_EMAIL}<br>
          Web: <a href="https://qm-guru.de">QM-Guru.de</a></p>
          
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
          Dieses QM-Handbuch wurde automatisch generiert. Die Inhalte basieren auf 
          den ISO 9001:2015 Anforderungen und Ihren Angaben. Eine rechtliche Prüfung 
          oder Beratung ersetzt dies nicht.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Email senden
  MailApp.sendEmail({
    to: recipient,
    cc: CONFIG.ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    attachments: [
      docxFile.getAs(MimeType.MICROSOFT_WORD),
      pdfFile.getAs(MimeType.PDF)
    ],
    name: 'QM-Guru QM-Handbuch Generator'
  });
  
  Logger.log('Email versendet an: ' + recipient);
}

// ============================================================================
// HELPER FUNKTIONEN
// ============================================================================

function getFormattedDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
}

// ============================================================================
// OPTIONAL: LOGGING IN GOOGLE SHEETS
// ============================================================================

function logToSheet(data, result) {
  if (!CONFIG.LOG_SHEET_ID) return;
  
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID).getActiveSheet();
    
    sheet.appendRow([
      new Date(),
      data.company_name,
      data.contact_person,
      data.contact_email,
      data.company_city,
      data.employee_count,
      data.has_development ? 'Ja' : 'Nein',
      data.has_measurement ? 'Ja' : 'Nein',
      result.docxUrl,
      result.pdfUrl
    ]);
    
    Logger.log('Log-Eintrag erstellt');
  } catch (error) {
    Logger.log('Fehler beim Logging: ' + error.toString());
  }
}

// ============================================================================
// TEST-FUNKTION (für manuelle Tests)
// ============================================================================

function testCreateHandbuch() {
  const testData = {
    company_name: 'Mustermann GmbH',
    company_address: 'Musterstraße 123',
    company_city: '90762 Fürth',
    company_country: 'Deutschland',
    contact_phone: '0911 / 123456',
    contact_email: 'test@mustermann.de',
    contact_person: 'Max Mustermann',
    company_type: 'dienstleistung',
    services_products: 'IT-Beratung und Software-Entwicklung',
    scope_text: 'Entwicklung und Erbringung von IT-Dienstleistungen für mittelständische Unternehmen',
    customer_groups: ['B2B - Industrie', 'B2B - Handel'],
    market_region: ['Deutschland', 'DACH-Region'],
    employee_count: '11-50 Mitarbeiter',
    has_development: true,
    has_measurement: false,
    has_outsourcing: false,
    role_qmb: true,
    quality_policy_style: 'modern',
    special_notes: 'Spezialisierung auf Cloud-Lösungen'
  };
  
  const result = createQMHandbuch(testData);
  Logger.log('Test erfolgreich!');
  Logger.log('DOCX: ' + result.docxUrl);
  Logger.log('PDF: ' + result.pdfUrl);
}
