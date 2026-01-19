# 🎯 QM-Handbuch Generator

Kostenloses Online-Tool zur automatischen Erstellung individueller Qualitätsmanagement-Handbücher für ISO 9001.

## 📋 Überblick

Dieses System ermöglicht es Unternehmen, durch einfache Eingabe ihrer Daten ein vollständiges QM-Handbuch zu erstellen:

- ✅ **Frontend**: React/Vite App auf Netlify (Formulareingabe)
- ✅ **Backend**: Google Apps Script (Datenverarbeitung, PDF-Generierung)
- ✅ **Output**: Word + PDF Dokumente per Email
- ✅ **Marketing**: Automatische CTAs zu QM-Guru und OnlineCert

## 🏗️ Architektur

```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│  Netlify        │         │  Google Apps Script  │         │  Google Drive   │
│  (Frontend)     │────────>│  (Backend)           │────────>│  (Templates)    │
│                 │  POST   │                      │  Read   │                 │
│  React/Vite     │         │  - Template füllen   │         │  - DOCX Vorlage │
│  Formular       │         │  - PDF generieren    │         │  - Output PDFs  │
│                 │         │  - Email versenden   │         │                 │
└─────────────────┘         └──────────────────────┘         └─────────────────┘
```

## 🚀 Installation & Deployment

### **Schritt 1: Google Apps Script Setup**

#### 1.1 Neues Script erstellen

1. Öffne https://script.google.com
2. Klicke "Neues Projekt"
3. Bennene es "QM-Handbuch-Generator"

#### 1.2 Code einfügen

1. Lösche den Beispiel-Code
2. Kopiere den Inhalt von `google-apps-script.gs`
3. Füge ihn ein

#### 1.3 Google Drive vorbereiten

**DOCX Template erstellen:**

1. Öffne Google Docs: https://docs.google.com
2. Erstelle neues Dokument: "QM-Handbuch-Template"
3. Erstelle dein Template mit Platzhaltern:
   - `{{FIRMENNAME}}`
   - `{{GELTUNGSBEREICH}}`
   - `{{KUNDENGRUPPEN}}`
   - `{{ENTWICKLUNG}}`
   - `{{PRUEFMITTEL}}`
   - `{{DIENSTLEISTER}}`
   - `{{ANSPRECHPARTNER}}`
   - `{{EMAIL}}`
   - `{{TELEFON}}`
   - `{{DATUM}}`
   - `{{BRANCHE}}`
   - `{{MITARBEITERANZAHL}}`
   - `{{STANDORT}}`
   - `{{LOGO}}` (für Logo-Platzierung)

4. Kopiere die **Dokument-ID** aus der URL:
   ```
   https://docs.google.com/document/d/DIESE_ID_HIER/edit
   ```

**Output-Ordner erstellen:**

1. Öffne Google Drive: https://drive.google.com
2. Erstelle Ordner "QM-Handbücher Output"
3. Kopiere die **Ordner-ID** aus der URL:
   ```
   https://drive.google.com/drive/folders/DIESE_ID_HIER
   ```

**Logo-Ordner erstellen:**

1. Erstelle Ordner "QM-Logos"
2. Kopiere die **Ordner-ID**

#### 1.4 Script konfigurieren

Im Google Apps Script, ändere die CONFIG Sektion:

```javascript
const CONFIG = {
  TEMPLATE_FILE_ID: 'DEINE_TEMPLATE_DOC_ID',  // Von Schritt 1.3
  OUTPUT_FOLDER_ID: 'DEIN_OUTPUT_ORDNER_ID',  // Von Schritt 1.3
  LOGO_FOLDER_ID: 'DEIN_LOGO_ORDNER_ID',      // Von Schritt 1.3
  LOG_SHEET_ID: '',  // Optional: Später erstellen
  ADMIN_EMAIL: 'holger.grosser@iso9001.info',
  QM_GURU_URL: 'https://qm-guru.de/beratung-anfragen',
  ONLINECERT_URL: 'https://onlinecert.de/zertifizierung-anfragen'
};
```

#### 1.5 Script deployen

1. Klicke **"Bereitstellen"** → **"Neue Bereitstellung"**
2. Einstellungen:
   - **Typ**: Web-App
   - **Beschreibung**: "QM-Handbuch Generator v1"
   - **Ausführen als**: Mich
   - **Zugriff haben**: **Jeder** ⚠️ WICHTIG!
3. Klicke **"Bereitstellen"**
4. **Kopiere die Web-App URL** (brauchst du für Netlify):
   ```
   https://script.google.com/macros/s/DEINE_SCRIPT_ID/exec
   ```

---

### **Schritt 2: GitHub Repository erstellen**

#### 2.1 Repository erstellen

1. Öffne https://github.com/new
2. Repository Name: `qm-handbuch-generator`
3. Public oder Private (deine Wahl)
4. Klicke "Create repository"

#### 2.2 Code hochladen

**Option A: Visual Studio Code (empfohlen)**

```bash
# Im Projektordner
git init
git add .
git commit -m "Initial commit: QM-Handbuch Generator"
git branch -M main
git remote add origin https://github.com/DEIN_USERNAME/qm-handbuch-generator.git
git push -u origin main
```

**Option B: GitHub Desktop**

1. Öffne GitHub Desktop
2. "Add Local Repository"
3. Wähle den Projektordner
4. "Publish repository"

**Option C: Direkt auf GitHub**

1. Zippe alle Dateien
2. Auf GitHub: "Upload files"
3. Zippe hochladen

---

### **Schritt 3: Netlify Deployment**

#### 3.1 Mit GitHub verbinden

1. Öffne https://app.netlify.com
2. Klicke "Add new site" → "Import an existing project"
3. Wähle **"GitHub"**
4. Autorisiere Netlify
5. Wähle dein Repository `qm-handbuch-generator`

#### 3.2 Build Settings

```
Build command: npm install && npm run build
Publish directory: dist
```

#### 3.3 Environment Variables setzen

1. Klicke "Site settings" → "Environment variables"
2. Klicke "Add a variable"
3. Füge hinzu:
   ```
   Key: VITE_GOOGLE_SCRIPT_URL
   Value: https://script.google.com/macros/s/DEINE_SCRIPT_ID/exec
   ```
   (Die URL von Schritt 1.5)

#### 3.4 Deployen

1. Klicke "Deploy site"
2. Warte 2-3 Minuten
3. Deine Site ist live! 🎉

URL Format: `https://RANDOM-NAME.netlify.app`

#### 3.5 Custom Domain (optional)

1. "Domain settings" → "Add custom domain"
2. Folge den DNS-Anweisungen
3. z.B. `qm-handbuch.qm-guru.de`

---

## 🧪 Testing

### Test 1: Formular ausfüllen

1. Öffne deine Netlify URL
2. Fülle alle Pflichtfelder aus
3. Optional: Logo hochladen
4. Klicke "QM-Handbuch jetzt kostenlos erstellen"

### Test 2: Email prüfen

1. Prüfe dein Email-Postfach
2. Email sollte ankommen mit:
   - Word-Anhang (.docx)
   - PDF-Anhang (.pdf)
   - CTAs zu QM-Guru und OnlineCert

### Test 3: Google Drive prüfen

1. Öffne deinen Output-Ordner in Google Drive
2. Beide Dateien sollten dort sein

---

## 🔧 Fehlerbehebung

### Problem: "CORS Error" im Frontend

**Lösung**: Google Apps Script Deployment überprüfen

1. Apps Script öffnen
2. "Bereitstellen" → "Bereitstellungen verwalten"
3. Prüfe: "Zugriff haben" = **Jeder**
4. Falls nicht: Neue Bereitstellung erstellen

### Problem: Keine Email kommt an

**Mögliche Ursachen**:

1. **Email-Adresse falsch**: Prüfe Formular
2. **Gmail API nicht aktiviert**: Nicht nötig, sollte funktionieren
3. **Script hat keinen Zugriff**: 
   - Apps Script → "Projekt-Einstellungen"
   - Prüfe Berechtigungen

### Problem: Template wird nicht gefunden

**Lösung**:

1. Prüfe TEMPLATE_FILE_ID in CONFIG
2. Prüfe ob Dokument in Google Drive existiert
3. Prüfe Berechtigung (Script muss Zugriff haben)

### Problem: Logo wird nicht eingefügt

**Mögliche Ursachen**:

1. Platzhalter `{{LOGO}}` fehlt im Template
2. Logo-Format nicht unterstützt (nur PNG/JPG)
3. LOGO_FOLDER_ID falsch

---

## 📊 Logging (Optional)

### Google Sheets Log erstellen

1. Erstelle neue Google Tabelle: "QM-Handbuch Logs"
2. Erste Zeile (Header):
   ```
   Datum | Firma | Ansprechpartner | Email | Telefon | Geltungsbereich | 
   Entwicklung | Prüfmittel | Dienstleister | DOCX Link | PDF Link
   ```
3. Kopiere Sheet-ID aus URL
4. Füge in CONFIG ein: `LOG_SHEET_ID: 'DEINE_SHEET_ID'`

---

## 🎨 Anpassungen

### Frontend Design ändern

Bearbeite `src/App.css`:
- Farben in `:root` CSS-Variablen
- Layout in `.form`, `.header`, etc.

### Email Template ändern

Bearbeite in `google-apps-script.gs`:
- Funktion `sendEmail()`
- HTML-Code in `htmlBody`

### Template Platzhalter erweitern

1. Neue Platzhalter in DOCX Template einfügen
2. In `createQMHandbuch()` Funktion hinzufügen:
   ```javascript
   '{{NEUER_PLATZHALTER}}': data.neues_feld || ''
   ```
3. Im Frontend (App.jsx) Formularfeld hinzufügen

---

## 📈 Marketing Integration

### QM-Guru Tracking

Füge UTM Parameter hinzu in CONFIG:
```javascript
QM_GURU_URL: 'https://qm-guru.de/beratung-anfragen?utm_source=qm-handbuch&utm_medium=email'
```

### OnlineCert Tracking

```javascript
ONLINECERT_URL: 'https://onlinecert.de/zertifizierung-anfragen?utm_source=qm-handbuch&utm_medium=email'
```

---

## 🔐 Sicherheit

### Environment Variables niemals committen

Die `.gitignore` verhindert das automatisch:
```
.env
.env.local
```

### API-URL Schutz

- Netlify Environment Variables sind server-seitig
- Google Apps Script URL ist öffentlich, aber:
  - Nur POST Requests werden akzeptiert
  - Rate Limiting durch Google
  - Keine sensiblen Daten im Frontend

---

## 📝 Maintenance

### Updates deployen

**Frontend Updates:**
```bash
git add .
git commit -m "Update: Beschreibung"
git push
```
→ Netlify deployed automatisch!

**Backend Updates:**
1. Code in Google Apps Script ändern
2. Speichern (Ctrl+S)
3. **WICHTIG**: Neue Bereitstellung erstellen!
   - "Bereitstellen" → "Bereitstellungen verwalten"
   - Bestehende Bereitstellung bearbeiten
   - Oder neue Version erstellen

---

## 🎯 Nächste Schritte

1. **Multi-Language Support**: Templates für EN, ES, etc.
2. **Payment Integration**: Premium Features
3. **Analytics**: Google Analytics einbinden
4. **A/B Testing**: Verschiedene Email-Templates testen
5. **CRM Integration**: Leads zu Pipedrive/HubSpot

---

## 📞 Support

Bei Fragen oder Problemen:
- **Email**: holger.grosser@iso9001.info
- **Website**: https://qm-guru.de

---

## 📄 Lizenz

© 2025 QM-Dienstleistungen Holger Grosser

Alle Rechte vorbehalten.
