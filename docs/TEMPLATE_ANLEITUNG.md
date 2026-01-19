# QM-HANDBUCH TEMPLATE - Struktur und Platzhalter

## 📋 Übersicht

Dieses Dokument beschreibt, wie dein DOCX Template in Google Docs aussehen sollte.

## 🏗️ Template-Struktur

### 1. Deckblatt

```
{{LOGO}}

QUALITÄTSMANAGEMENT-HANDBUCH
nach ISO 9001:2015

{{FIRMENNAME}}
{{STANDORT}}

Erstellt am: {{DATUM}}
```

### 2. Dokumentenlenkung

```
Dokument-Information:

Firma:              {{FIRMENNAME}}
Geltungsbereich:    {{GELTUNGSBEREICH}}
Version:            1.0
Erstellt am:        {{DATUM}}
Erstellt von:       {{ANSPRECHPARTNER}}
Kontakt:            {{EMAIL}}
Telefon:            {{TELEFON}}
```

### 3. Unternehmensprofil

```
1. UNTERNEHMENSPROFIL

1.1 Firmenbezeichnung
{{FIRMENNAME}}

1.2 Standort
{{STANDORT}}

1.3 Branche
{{BRANCHE}}

1.4 Mitarbeiteranzahl
{{MITARBEITERANZAHL}}

1.5 Geltungsbereich des QM-Systems
{{GELTUNGSBEREICH}}

1.6 Kundengruppen
{{KUNDENGRUPPEN}}
```

### 4. Prozesslandschaft

```
2. PROZESSLANDSCHAFT

2.1 Entwicklung / Konstruktion
Entwicklungsprozesse: {{ENTWICKLUNG}}

2.2 Prüfmittelmanagement
Prüfmittel vorhanden: {{PRUEFMITTEL}}

2.3 Unternehmensart
Dienstleistungsunternehmen: {{DIENSTLEISTER}}
```

### 5. Qualitätspolitik

```
3. QUALITÄTSPOLITIK

Die {{FIRMENNAME}} verpflichtet sich zur Einhaltung 
höchster Qualitätsstandards in allen Bereichen:

[Hier kommt dein Standard-Text für Qualitätspolitik]
```

### 6. Prozessbeschreibungen

```
4. FÜHRUNGSPROZESSE

4.1 Managementbewertung
[Standard-Text]

4.2 Qualitätsziele
[Standard-Text]

5. KERNPROZESSE

5.1 Kundenanforderungen
Unsere Kundengruppen: {{KUNDENGRUPPEN}}

5.2 Entwicklung (falls zutreffend)
Entwicklungsprozess: {{ENTWICKLUNG}}

5.3 Beschaffung
[Standard-Text]

5.4 Produktion / Dienstleistungserbringung
Art des Unternehmens: {{DIENSTLEISTER}}

5.5 Prüfung
Prüfmittelmanagement: {{PRUEFMITTEL}}

6. UNTERSTÜTZENDE PROZESSE

6.1 Personalmanagement
[Standard-Text]

6.2 Infrastruktur
[Standard-Text]
```

### 7. Dokumentation

```
7. DOKUMENTIERTE INFORMATION

7.1 Dokumente
- Qualitätsmanagement-Handbuch (dieses Dokument)
- Verfahrensanweisungen
- Arbeitsanweisungen
- Formulare und Checklisten

7.2 Aufzeichnungen
[Standard-Text]
```

### 8. Anhänge

```
ANHANG A: PROZESSLANDKARTE
[Hier kannst du ein Bild/Diagramm einfügen]

ANHANG B: ORGANISATIONSSTRUKTUR
[Organigramm]

ANHANG C: VERANTWORTLICHKEITEN
[Tabelle]
```

---

## 🔤 Vollständige Platzhalter-Liste

### Unternehmensdaten
- `{{FIRMENNAME}}` - Name des Unternehmens
- `{{STANDORT}}` - Adresse/Ort
- `{{BRANCHE}}` - Industriezweig
- `{{MITARBEITERANZAHL}}` - Anzahl der Mitarbeiter
- `{{LOGO}}` - Firmenlogo (wird als Bild eingefügt)

### Kontaktdaten
- `{{ANSPRECHPARTNER}}` - Name der Kontaktperson
- `{{EMAIL}}` - Email-Adresse
- `{{TELEFON}}` - Telefonnummer

### QM-System Details
- `{{GELTUNGSBEREICH}}` - Was macht das Unternehmen?
- `{{KUNDENGRUPPEN}}` - Wen beliefert das Unternehmen?

### Prozess-Flags (Ja/Nein)
- `{{ENTWICKLUNG}}` - Hat Entwicklung/Konstruktion
- `{{PRUEFMITTEL}}` - Nutzt Prüfmittel
- `{{DIENSTLEISTER}}` - Ist Dienstleister

### System-Felder
- `{{DATUM}}` - Erstellungsdatum (automatisch)

---

## 💡 Tipps für gute Templates

### 1. Konsistente Formatierung
- Überschriften: Arial, 16pt, Fett, Blau
- Fließtext: Arial, 11pt, Schwarz
- Platzhalter: Arial, 11pt, Rot (zum einfachen Erkennen)

### 2. Seitenlayout
- Seitenränder: 2.5cm oben/unten, 2cm links/rechts
- Kopfzeile: Firmenname + Logo
- Fußzeile: Seitenzahl + Datum

### 3. Logo-Platzierung
Der Platzhalter `{{LOGO}}` sollte:
- In einem eigenen Absatz stehen
- Linksbündig oder zentriert sein
- Genug Platz für das Bild haben (min. 2cm Höhe)

### 4. Bedingte Abschnitte

Für Prozesse die nur manchmal relevant sind:

```
5.2 ENTWICKLUNG

{{ENTWICKLUNG}}

[Wenn "Ja", dann detaillierte Prozessbeschreibung hier]
[Wenn "Nein", dann kurzer Text: "Nicht relevant"]
```

### 5. Tabellen

Nutze Tabellen für strukturierte Info:

```
┌──────────────────────┬─────────────────────┐
│ Unternehmen:         │ {{FIRMENNAME}}      │
├──────────────────────┼─────────────────────┤
│ Standort:            │ {{STANDORT}}        │
├──────────────────────┼─────────────────────┤
│ Branche:             │ {{BRANCHE}}         │
└──────────────────────┴─────────────────────┘
```

---

## 📤 Template in Google Docs hochladen

1. Erstelle dein Template in Word (.docx)
2. Öffne Google Drive
3. Upload → Datei hochladen
4. Rechtsklick → "Öffnen mit Google Docs"
5. Google Docs konvertiert es automatisch

**ODER**

1. Erstelle direkt in Google Docs
2. Nutze die Platzhalter wie oben beschrieben
3. Speichere und kopiere die Dokument-ID

---

## ✅ Template-Checkliste

Vor dem Go-Live prüfen:

- [ ] Alle Platzhalter korrekt geschrieben (Case-sensitive!)
- [ ] Logo-Platzhalter `{{LOGO}}` vorhanden
- [ ] Formatierung konsistent
- [ ] Seitenzahlen funktionieren
- [ ] Kopf- und Fußzeilen korrekt
- [ ] Inhaltsverzeichnis aktualisiert
- [ ] Test-Export als PDF funktioniert
- [ ] Alle Platzhalter werden ersetzt (keine "{{" mehr sichtbar)

---

## 🎨 Design-Vorlagen

### Minimalistische Variante
- Wenig Farbe, viel Weißraum
- Arial/Calibri Schriftart
- Nur Überschriften farbig (Blau)

### Corporate Variante
- Firmenfarben durchgängig
- Logo auf jeder Seite (Kopfzeile)
- Eigene Schriftart

### Professionelle Variante
- Deckblatt mit großem Logo
- Zweispalten-Layout für Prozesse
- Icons für verschiedene Abschnitte

---

## 📖 Beispiel-Inhalte

### Guter Geltungsbereich
```
"Entwicklung, Herstellung und Vertrieb von 
Präzisionsbauteilen für die Automobilindustrie 
am Standort Fürth, Deutschland"
```

### Gute Kundengruppen
```
"Automobilhersteller (Tier 1)
Maschinenbau-Unternehmen
Luft- und Raumfahrt"
```

---

Dieses Template-Format garantiert professionelle, 
konsistente QM-Handbücher für alle Kunden! 🎯
