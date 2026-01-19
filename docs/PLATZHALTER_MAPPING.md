# 🎯 TEMPLATE PLATZHALTER - Vollständiges Mapping

## ✅ Alle 25 Platzhalter im Template

### DECKBLATT

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{LOGO}}` | `logo_base64` | Image (wird ersetzt mit Bild) |
| `{{COMPANY_NAME}}` | `company_name` | Text |
| `{{COMPANY_ADDRESS}}` | `company_address` | Text |
| `{{COMPANY_CITY}}` | `company_city` | Text |
| `{{COMPANY_COUNTRY}}` | `company_country` | Text (Default: "Deutschland") |
| `{{COMPANY_PHONE}}` | `company_phone` | Text |
| `{{CONTACT_EMAIL}}` | `contact_email` | Email |
| `{{DOC_DATE}}` | Auto | Heute (automatisch) |
| `{{DOC_VERSION}}` | Auto | "1.0" (fix) |

---

### KAPITEL 1: ANWENDUNGSBEREICH

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{SCOPE_TEXT}}` | `scope_text` | Text (aus Vorlage + editiert) |
| `{{STAKEHOLDER_CUSTOMERS}}` | Auto-generiert | Text (aus `customer_groups`) |
| `{{OUTSOURCED_PROCESS_TEXT}}` | Auto-generiert | Text (aus `has_outsourcing`) |

**Logik `{{STAKEHOLDER_CUSTOMERS}}`:**
```javascript
if (customer_groups.includes("B2B - Industrie")) {
  text = "Unsere Hauptkunden sind mittelständische und große Industrieunternehmen..."
}
// Kombiniere alle ausgewählten Gruppen
```

**Logik `{{OUTSOURCED_PROCESS_TEXT}}`:**
```javascript
if (has_outsourcing === false) {
  text = "Es liegen keine ausgelagerten Prozesse vor."
} else {
  text = "Folgende Prozesse werden ausgelagert: [Details aus Formular]"
}
```

---

### KAPITEL 2: WIR ÜBER UNS

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{COMPANY_TYPE_TEXT}}` | Auto-generiert | Text (aus `company_type`) |
| `{{EMPLOYEE_COUNT}}` | `employee_count` | Text |
| `{{MARKET_REGION_TEXT}}` | Auto-generiert | Text (aus `market_region` Array) |
| `{{SPECIAL_NOTES}}` | `special_notes` | Text (optional) |

**Logik `{{COMPANY_TYPE_TEXT}}`:**
```javascript
mapping = {
  "dienstleistung": "reines Dienstleistungsunternehmen",
  "produktion_mit": "Produktionsunternehmen mit eigener Entwicklung",
  "produktion_ohne": "Produktionsunternehmen",
  "handel": "Handelsunternehmen",
  "gemischt": "Dienstleistungs- und Produktionsunternehmen"
}
```

---

### KAPITEL 3: QUALITÄTSPOLITIK

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{QUALITY_POLICY_TEXT}}` | Auto-generiert | Text (aus `quality_policy_style`) |
| `{{APPROVAL_ROLE}}` | Auto | "Geschäftsführung" (fix) |

**Logik `{{QUALITY_POLICY_TEXT}}`:**
```javascript
// Holt kompletten Textbaustein aus TEXTBAUSTEINE.md
if (quality_policy_style === "modern") {
  text = TEXTBAUSTEINE.quality_policy.modern;
}
```

---

### KAPITEL 5: PROZESSE (Ausschlüsse)

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{EXCLUSION_DEVELOPMENT}}` | Auto-generiert | Text (aus `has_development`) |
| `{{EXCLUSION_MEASUREMENT}}` | Auto-generiert | Text (aus `has_measurement`) |

**Logik `{{EXCLUSION_DEVELOPMENT}}`:**
```javascript
if (has_development === false) {
  text = "Ein Entwicklungsprozess ist für die Erbringung unserer Leistungen nicht erforderlich und wird daher gemäß ISO 9001:2015 Kapitel 8.3 ausgeschlossen. Sollte sich die Notwendigkeit eines Entwicklungsprozesses ergeben, wird dieser in das QM-System integriert und dokumentiert.";
} else {
  text = "Die Entwicklung neuer Produkte/Dienstleistungen erfolgt gemäß definiertem Entwicklungsprozess. Dabei werden Kundenanforderungen systematisch erfasst, Konzepte entwickelt, validiert und freigegeben.\n\nDie Entwicklungsdokumentation umfasst:\n• Anforderungsspezifikationen\n• Entwicklungspläne\n• Validierungsnachweise\n• Freigabedokumente";
}
```

---

### KAPITEL 6: VERANTWORTUNGEN

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{QMB_TEXT}}` | Auto-generiert | Text (aus `role_qmb`) |
| `{{QMB_NAME}}` | `qmb_name` | Text (optional, nur wenn role_qmb = true) |

**Logik `{{QMB_TEXT}}`:**
```javascript
if (role_qmb === true) {
  text = "Die Funktion des Qualitätsmanagementbeauftragten (QMB) ist etabliert.\n\nAufgaben des QMB:\n• Sicherstellung der Wirksamkeit des QM-Systems\n• Berichterstattung an die Geschäftsführung\n• Koordination interner Audits\n• Schulung und Beratung der Mitarbeiter\n• Pflege der QM-Dokumentation\n\nDer QMB berichtet direkt an die Geschäftsführung und verfügt über die erforderlichen Befugnisse zur Durchsetzung von Qualitätsanforderungen.";
} else {
  text = "Die Verantwortung für das Qualitätsmanagementsystem liegt bei der Geschäftsführung.\n\nAufgrund der Unternehmensgröße von " + employee_count + " ist keine separate QMB-Funktion erforderlich. Die Geschäftsführung nimmt die Aufgaben des Qualitätsmanagements direkt wahr:\n\n• Festlegung der Qualitätspolitik\n• Bereitstellung von Ressourcen\n• Durchführung von Managementbewertungen\n• Sicherstellung der Kundenfokussierung\n• Förderung der kontinuierlichen Verbesserung";
}
```

---

### KAPITEL 10: FREIGABE

| Platzhalter | Quelle Frontend | Type |
|-------------|----------------|------|
| `{{CONTACT_PERSON}}` | `contact_person` | Text |

---

## 📋 VOLLSTÄNDIGE PLATZHALTER-LISTE (Alphabetisch)

```
1.  {{APPROVAL_ROLE}}              - "Geschäftsführung" (fix)
2.  {{COMPANY_ADDRESS}}            - Frontend Input
3.  {{COMPANY_CITY}}               - Frontend Input
4.  {{COMPANY_COUNTRY}}            - Frontend Input (Default: Deutschland)
5.  {{COMPANY_NAME}}               - Frontend Input
6.  {{COMPANY_PHONE}}              - Frontend Input
7.  {{COMPANY_TYPE_TEXT}}          - Auto aus company_type
8.  {{CONTACT_EMAIL}}              - Frontend Input
9.  {{CONTACT_PERSON}}             - Frontend Input
10. {{DOC_DATE}}                   - Automatisch (heute)
11. {{DOC_VERSION}}                - "1.0" (fix)
12. {{EMPLOYEE_COUNT}}             - Frontend Dropdown
13. {{EXCLUSION_DEVELOPMENT}}      - Auto aus has_development
14. {{EXCLUSION_MEASUREMENT}}      - Auto aus has_measurement
15. {{LOGO}}                       - Frontend Upload (Bild)
16. {{MARKET_REGION_TEXT}}         - Auto aus market_region Array
17. {{OUTSOURCED_PROCESS_TEXT}}    - Auto aus has_outsourcing
18. {{QMB_NAME}}                   - Frontend Input (optional)
19. {{QMB_TEXT}}                   - Auto aus role_qmb
20. {{QUALITY_POLICY_TEXT}}        - Auto aus quality_policy_style
21. {{SCOPE_TEXT}}                 - Frontend (Vorlage + Edit)
22. {{SPECIAL_NOTES}}              - Frontend Textarea (optional)
23. {{STAKEHOLDER_CUSTOMERS}}      - Auto aus customer_groups
24. {{COMPANY_TYPE_TEXT}}          - Auto aus company_type
25. {{MARKET_REGION_TEXT}}         - Auto aus market_region
```

---

## 🔄 BACKEND WORKFLOW

```javascript
// 1. Empfange Daten vom Frontend
const data = JSON.parse(e.postData.contents);

// 2. Template laden
const template = DriveApp.getFileById(TEMPLATE_FILE_ID);
const copy = template.makeCopy(fileName, outputFolder);
const doc = DocumentApp.openById(copy.getId());
const body = doc.getBody();

// 3. Direkte Ersetzungen (1:1 vom Frontend)
body.replaceText('{{COMPANY_NAME}}', data.company_name);
body.replaceText('{{COMPANY_ADDRESS}}', data.company_address);
body.replaceText('{{COMPANY_CITY}}', data.company_city);
body.replaceText('{{COMPANY_COUNTRY}}', data.company_country);
body.replaceText('{{COMPANY_PHONE}}', data.company_phone);
body.replaceText('{{CONTACT_EMAIL}}', data.contact_email);
body.replaceText('{{CONTACT_PERSON}}', data.contact_person);
body.replaceText('{{EMPLOYEE_COUNT}}', data.employee_count);
body.replaceText('{{SCOPE_TEXT}}', data.scope_text);
body.replaceText('{{SPECIAL_NOTES}}', data.special_notes || '');

// 4. Automatische Felder
body.replaceText('{{DOC_DATE}}', new Date().toLocaleDateString('de-DE'));
body.replaceText('{{DOC_VERSION}}', '1.0');
body.replaceText('{{APPROVAL_ROLE}}', 'Geschäftsführung');

// 5. Auto-generierte Texte
body.replaceText('{{COMPANY_TYPE_TEXT}}', getCompanyTypeText(data.company_type));
body.replaceText('{{MARKET_REGION_TEXT}}', data.market_region.join(', '));
body.replaceText('{{STAKEHOLDER_CUSTOMERS}}', getStakeholderText(data.customer_groups));
body.replaceText('{{OUTSOURCED_PROCESS_TEXT}}', getOutsourcingText(data.has_outsourcing));
body.replaceText('{{EXCLUSION_DEVELOPMENT}}', getDevelopmentText(data.has_development));
body.replaceText('{{EXCLUSION_MEASUREMENT}}', getMeasurementText(data.has_measurement));
body.replaceText('{{QMB_TEXT}}', getQMBText(data.role_qmb, data.employee_count));
body.replaceText('{{QUALITY_POLICY_TEXT}}', getQualityPolicyText(data.quality_policy_style));

// 6. Logo einfügen
if (data.logo_base64) {
  insertLogo(doc, data.logo_base64);
}

// 7. Speichern & PDF generieren
doc.saveAndClose();
const pdfFile = convertToPDF(copy);
```

---

## 🎯 WICHTIG FÜR BACKEND

**Alle Textbausteine MÜSSEN aus `TEXTBAUSTEINE.md` kommen!**

Die Helper-Funktionen:
- `getCompanyTypeText()`
- `getStakeholderText()`
- `getOutsourcingText()`
- `getDevelopmentText()`
- `getMeasurementText()`
- `getQMBText()`
- `getQualityPolicyText()`

...holen die **fertigen Texte** aus TEXTBAUSTEINE.md und ersetzen sie im Template.

**KEINE Texte im Backend Code hardcoden!** Alles kommt aus der Textbausteine-Bibliothek.
