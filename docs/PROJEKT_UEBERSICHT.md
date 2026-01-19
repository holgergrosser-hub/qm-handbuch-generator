# 📁 QM-HANDBUCH GENERATOR - DATEIÜBERSICHT

## 🎯 Projektziel

Vollautomatisches System zur Erstellung individueller QM-Handbücher für ISO 9001:
- Frontend: React/Vite auf Netlify
- Backend: Google Apps Script
- Output: Word + PDF per Email
- Marketing: CTAs zu QM-Guru und OnlineCert

---

## 📂 DATEISTRUKTUR

```
qm-handbuch-generator/
│
├── 📄 README.md ⭐ LIES MICH ZUERST!
│   └─ Vollständige Dokumentation & Deployment-Anleitung
│
├── 📄 QUICK_START.html ⭐ SCHNELLSTART
│   └─ 15-Minuten Deployment Guide (öffne im Browser)
│
├── 📄 TEMPLATE_ANLEITUNG.md
│   └─ Wie du das DOCX Template erstellst
│
├── 📄 PROJEKT_UEBERSICHT.md
│   └─ Diese Datei - Übersicht aller Komponenten
│
├── ⚙️ GOOGLE APPS SCRIPT
│   └── google-apps-script.gs ⭐ BACKEND CODE
│       └─ In https://script.google.com hochladen
│
├── 🎨 NETLIFY FRONTEND
│   ├── package.json              # NPM Dependencies
│   ├── vite.config.js             # Vite Build Config
│   ├── netlify.toml               # Netlify Deploy Settings
│   ├── index.html                 # HTML Entry Point
│   ├── .env.example               # Environment Variables Template
│   ├── .gitignore                 # Git Ignore Rules
│   │
│   └── src/
│       ├── App.jsx ⭐ HAUPTFORMULAR
│       │   └─ React Component mit Formular
│       ├── App.css                # App Styles
│       ├── main.jsx               # React Entry Point
│       └── index.css              # Global Styles
│
└── 📚 DOKUMENTATION
    ├── README.md
    ├── QUICK_START.html
    └── TEMPLATE_ANLEITUNG.md
```

---

## 🔄 WORKFLOW

```
┌─────────────────────┐
│  1. KUNDE           │
│  Füllt Formular aus │
│  (Netlify Frontend) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. REACT APP       │
│  Sendet JSON an     │
│  Google Apps Script │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. APPS SCRIPT     │
│  - Template füllen  │
│  - PDF generieren   │
│  - Email senden     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  4. KUNDE           │
│  Erhält Email mit:  │
│  - Word (.docx)     │
│  - PDF (.pdf)       │
│  - CTAs             │
└─────────────────────┘
```

---

## 🚀 DEPLOYMENT CHECKLIST

### ✅ Schritt 1: Google Apps Script

- [ ] Neues Projekt auf script.google.com erstellen
- [ ] Code aus `google-apps-script.gs` einfügen
- [ ] Google Drive Ordner erstellen:
  - [ ] Templates Ordner (für DOCX Vorlage)
  - [ ] Output Ordner (für generierte Dateien)
  - [ ] Logos Ordner (für Kundenlogos)
- [ ] DOCX Template erstellen (siehe TEMPLATE_ANLEITUNG.md)
- [ ] CONFIG Sektion im Script ausfüllen:
  - [ ] TEMPLATE_FILE_ID
  - [ ] OUTPUT_FOLDER_ID
  - [ ] LOGO_FOLDER_ID
  - [ ] ADMIN_EMAIL
  - [ ] QM_GURU_URL
  - [ ] ONLINECERT_URL
- [ ] Als Web-App deployen (Zugriff: Jeder!)
- [ ] Webhook URL kopieren

### ✅ Schritt 2: GitHub Repository

- [ ] Neues Repo auf github.com erstellen
- [ ] Alle Dateien hochladen:
  - [ ] package.json
  - [ ] vite.config.js
  - [ ] netlify.toml
  - [ ] index.html
  - [ ] .gitignore
  - [ ] src/ Ordner
  - [ ] README.md
- [ ] `.env` NICHT committen! (schon in .gitignore)

### ✅ Schritt 3: Netlify Deployment

- [ ] Auf netlify.com einloggen
- [ ] "New site from Git" → GitHub verbinden
- [ ] Repository auswählen
- [ ] Build Settings:
  - [ ] Build command: `npm install && npm run build`
  - [ ] Publish directory: `dist`
- [ ] Environment Variable setzen:
  - [ ] Key: `VITE_GOOGLE_SCRIPT_URL`
  - [ ] Value: Deine Apps Script Webhook URL
- [ ] Deploy!
- [ ] Warten auf Build (2-3 Min)
- [ ] Site URL kopieren

### ✅ Schritt 4: Testing

- [ ] Netlify Site öffnen
- [ ] Formular ausfüllen
- [ ] Submit
- [ ] Email erhalten?
- [ ] Word Anhang da?
- [ ] PDF Anhang da?
- [ ] CTAs funktionieren?
- [ ] Google Drive: Dateien erstellt?

---

## 🔧 KONFIGURATION

### Google Apps Script CONFIG

```javascript
const CONFIG = {
  // Google Drive IDs
  TEMPLATE_FILE_ID: '1abc...xyz',     // Aus Google Docs URL
  OUTPUT_FOLDER_ID: '1def...uvw',     // Aus Google Drive URL
  LOGO_FOLDER_ID: '1ghi...rst',       // Aus Google Drive URL
  
  // Optional: Logging
  LOG_SHEET_ID: '',                    // Leer lassen oder Sheet ID
  
  // Email
  ADMIN_EMAIL: 'holger.grosser@iso9001.info',
  
  // Marketing URLs
  QM_GURU_URL: 'https://qm-guru.de/beratung-anfragen',
  ONLINECERT_URL: 'https://onlinecert.de/zertifizierung-anfragen'
};
```

### Netlify Environment Variables

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/DEINE_ID/exec
```

---

## 📋 PLATZHALTER IM TEMPLATE

### Kundendaten
- `{{FIRMENNAME}}` - Firmenname
- `{{ANSPRECHPARTNER}}` - Kontaktperson
- `{{EMAIL}}` - Email
- `{{TELEFON}}` - Telefon
- `{{STANDORT}}` - Adresse/Ort
- `{{BRANCHE}}` - Industriezweig
- `{{MITARBEITERANZAHL}}` - Anzahl Mitarbeiter

### QM-System
- `{{GELTUNGSBEREICH}}` - Was macht das Unternehmen?
- `{{KUNDENGRUPPEN}}` - Wen beliefern sie?

### Prozesse (Ja/Nein)
- `{{ENTWICKLUNG}}` - Hat Entwicklung/Konstruktion
- `{{PRUEFMITTEL}}` - Nutzt Prüfmittel
- `{{DIENSTLEISTER}}` - Ist Dienstleister

### System
- `{{DATUM}}` - Erstellungsdatum (automatisch)
- `{{LOGO}}` - Firmenlogo (wird als Bild eingefügt)

---

## 🎨 ANPASSUNGEN

### Frontend Design ändern

Bearbeite `src/App.css`:
```css
:root {
  --primary-color: #0066cc;  /* Deine Hauptfarbe */
  --secondary-color: #004a99;
  ...
}
```

### Formular-Felder ändern

Bearbeite `src/App.jsx`:
```javascript
const [formData, setFormData] = useState({
  // Füge hier neue Felder hinzu
  neues_feld: '',
  ...
});
```

### Email-Template ändern

Bearbeite `google-apps-script.gs`, Funktion `sendEmail()`:
```javascript
const htmlBody = `
  <!DOCTYPE html>
  <html>
  ...
  </html>
`;
```

### Template erweitern

1. Füge Platzhalter in DOCX ein: `{{NEUER_PLATZHALTER}}`
2. In `google-apps-script.gs`, Funktion `createQMHandbuch()`:
```javascript
const replacements = {
  ...
  '{{NEUER_PLATZHALTER}}': data.neues_feld || '',
};
```

---

## 📊 LOGGING (OPTIONAL)

### Google Sheets Log erstellen

1. Neue Tabelle: "QM-Handbuch Logs"
2. Header:
   ```
   Datum | Firma | Ansprechpartner | Email | Telefon | 
   Geltungsbereich | Entwicklung | Prüfmittel | 
   Dienstleister | DOCX Link | PDF Link
   ```
3. Sheet-ID kopieren
4. In CONFIG eintragen: `LOG_SHEET_ID: 'DEINE_ID'`

---

## 🔐 SICHERHEIT

### Was NICHT in Git gehört

✅ Bereits in .gitignore:
- `.env` (Environment Variables)
- `node_modules/` (Dependencies)
- `dist/` (Build Output)

### Was öffentlich sein kann

✅ Sicher in GitHub:
- Source Code (src/)
- Config Files (package.json, etc.)
- README & Docs

⚠️ Google Apps Script URL ist öffentlich, aber:
- Nur POST Requests erlaubt
- Rate Limiting durch Google
- Keine sensiblen Daten im Frontend

---

## 🛠️ MAINTENANCE

### Frontend Updates

```bash
# Änderungen machen in src/
git add .
git commit -m "Update: Beschreibung"
git push
```
→ Netlify deployed automatisch!

### Backend Updates

1. Code in Google Apps Script ändern
2. Speichern (Ctrl+S)
3. **WICHTIG**: Neue Bereitstellung!
   - "Bereitstellen" → "Bereitstellungen verwalten"
   - Bestehende bearbeiten ODER neue Version

### Template Updates

1. Google Doc öffnen
2. Änderungen machen
3. Speichern
→ Sofort aktiv (gleiche ID!)

---

## 📈 ERFOLGSMETRIKEN

### Was tracken?

- Anzahl Formulare ausgefüllt
- Conversion Rate (Formular → Email gesendet)
- Klickrate QM-Guru CTA
- Klickrate OnlineCert CTA
- Durchschnittliche Formular-Completion-Zeit

### Wie tracken?

1. Google Analytics in Netlify einbinden
2. UTM Parameter in CTAs:
   ```javascript
   QM_GURU_URL: 'https://qm-guru.de?utm_source=qm-handbuch&utm_medium=email'
   ```
3. Google Sheets Logging aktivieren

---

## 🎯 NEXT STEPS

### Phase 1: MVP (Jetzt)
- [x] Grundsystem aufsetzen
- [x] Deployment funktioniert
- [x] Erste Tests erfolgreich

### Phase 2: Optimierung (Woche 1-2)
- [ ] Custom Domain (qm-handbuch.qm-guru.de)
- [ ] Google Analytics
- [ ] A/B Testing Email-Templates
- [ ] Logo-Upload optimieren

### Phase 3: Skalierung (Monat 1-3)
- [ ] Multi-Language (EN, ES)
- [ ] Premium Features (Payment)
- [ ] API für Drittanbieter
- [ ] CRM Integration

---

## 💬 SUPPORT

### Wenn etwas nicht funktioniert:

1. **QUICK_START.html** öffnen → Fehlerbehebung
2. **README.md** lesen → Detaillierte Docs
3. **Google Apps Script Logs** prüfen:
   - Ansicht → Logs
   - Ausführungen → Letzte Fehler

### Kontakt

- Email: holger.grosser@iso9001.info
- Website: https://qm-guru.de

---

## 🎉 READY TO GO!

Du hast jetzt ein vollständiges, produktionsreifes System!

**Was du erstellt hast:**
✅ Professional Frontend (React/Vite)
✅ Robustes Backend (Google Apps Script)
✅ Automatische Dokumenten-Generierung
✅ Email-Versand mit Attachments
✅ Marketing CTAs integriert
✅ Vollständig dokumentiert
✅ GitHub & Netlify ready

**Viel Erfolg! 🚀**
