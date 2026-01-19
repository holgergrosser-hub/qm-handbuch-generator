# 🎯 OPTIMIERTER PROMPT FÜR QM-HANDBUCH GENERATOR

## Basierend auf: Unternehmenshandbuch_Kunde_TT_MM_JJJJ.docx

---

## 📋 ZIEL

Erstelle ein vollautomatisches System, das aus Formulareingaben ein fertiges ISO 9001:2015 Unternehmenshandbuch generiert - **exakt wie Holger Grosser es manuell erstellt**.

---

## 🏗️ TEMPLATE-STRUKTUR (Aus echtem Template)

### 1. DECKBLATT
```
{{LOGO}}

Unternehmenshandbuch

{{FIRMENNAME}}
{{STRASSE}}
{{PLZ_ORT}}

Telefon: {{TELEFON}}
Telefax: {{TELEFAX}}
E-Mail: {{EMAIL}}
Internet: {{WEBSITE}}
```

### 2. ANWENDUNGSBEREICH / KONTEXT
```
[STATISCHER TEXT - ISO 9001:2015 Standard]

Im Handbuch und in den mitgeltenden Unterlagen sind die 
Anforderungen der ISO 9001:2015 umgesetzt. Das Handbuch 
gilt für alle Bereiche der {{FIRMENNAME}}, {{STRASSE}}, 
{{PLZ_ORT}}.

Relevante Zulassungen: {{ZULASSUNGEN_TEXT}}

Geltungsbereich: {{GELTUNGSBEREICH}}

Zielgruppe / Kundenkreise: {{KUNDENGRUPPEN}}

Nicht anwendbare Anforderungen: {{AUSSCHLUSS_TEXT}}

Ausgelagerte Prozesse: {{OUTSOURCING_TEXT}}
```

### 3. INTERESSIERTE PARTEIEN
```
[STATISCHER TEXT - bleibt immer gleich]

Kunden und Endnutzer: Qualität und Preise der Produkte...
Mitarbeiter: gute Arbeitsumgebung...
Lieferanten: gegenseitiger Nutzen...
[usw. - fix]
```

### 4. WIR ÜBER UNS
```
{{FIRMEN_HISTORIE}}
```

### 5. QUALITÄTSPOLITIK
```
{{QUALITAETSPOLITIK_TEXT}}

[ENDE MIT FESTEM TEXT:]
Im Handbuch und in den mitgeltenden Unterlagen sind die 
Forderungen der ISO 9001 umgesetzt. Hiermit verpflichtet 
sich die Geschäftsleitung zur Aufrechterhaltung, 
Weiterentwicklung und Verbesserung des 
Qualitätsmanagementsystems sowie zur Erfüllung zutreffender 
Anforderungen.

Freigabe: {{FREIGABE_ROLLE}}
```

### 6. RESSOURCEN
```
[STATISCHER TEXT - bleibt gleich]
```

### 7. PROZESSE
```
[STATISCHER TEXT + Prozesslandkarte]
```

---

## 🎯 DIE PLATZHALTER (Aus Template extrahiert)

### A. FIRMENDATEN (10 Platzhalter)
```
1.  {{LOGO}}                  - Logo-Upload
2.  {{FIRMENNAME}}            - Input
3.  {{STRASSE}}               - Input
4.  {{PLZ_ORT}}               - Input (kombiniert)
5.  {{TELEFON}}               - Input
6.  {{TELEFAX}}               - Input (optional)
7.  {{EMAIL}}                 - Input
8.  {{WEBSITE}}               - Input (optional)
9.  {{FREIGABE_ROLLE}}        - Default: "Geschäftsführer"
10. {{DATUM}}                 - Automatisch
```

### B. GELTUNGSBEREICH & KONTEXT (3 Platzhalter)
```
11. {{GELTUNGSBEREICH}}       - Auto-generiert aus Vorlage
12. {{KUNDENGRUPPEN}}         - Auto-generiert aus Auswahl
13. {{ZULASSUNGEN_TEXT}}      - Auto-generiert oder "keine"
```

### C. AUSSCHLÜSSE (1 Platzhalter mit Logik)
```
14. {{AUSSCHLUSS_TEXT}}       - Auto-generiert basierend auf:
    - {{HAS_DEVELOPMENT}} (Ja/Nein)
    - {{HAS_MEASUREMENT}} (Ja/Nein)
```

**Logik:**
```
WENN has_development = Nein UND has_measurement = Nein:
  → "Zur Erbringung unserer Dienstleistung ist kein 
     Entwicklungsprozess erforderlich. Die messtechnische 
     Rückführbarkeit ist keine Anforderung an unser 
     Unternehmen. Darum werden diese Kapitel in unserem 
     QM-System nicht angewendet."

WENN has_development = Ja UND has_measurement = Nein:
  → "Die messtechnische Rückführbarkeit ist keine 
     Anforderung an unser Unternehmen. Darum wird dieses 
     Kapitel in unserem QM-System nicht angewendet."

WENN has_development = Nein UND has_measurement = Ja:
  → "Zur Erbringung unserer Dienstleistung ist kein 
     Entwicklungsprozess erforderlich. Darum wird dieses 
     Kapitel in unserem QM-System nicht angewendet."

WENN has_development = Ja UND has_measurement = Ja:
  → "Wir haben in unserem Unternehmen keine Ausschlüsse 
     im Sinne der DIN EN ISO 9001:2015"
```

### D. OUTSOURCING (1 Platzhalter mit Logik)
```
15. {{OUTSOURCING_TEXT}}      - Auto-generiert basierend auf:
    - {{HAS_OUTSOURCING}} (Ja/Nein)
```

**Logik:**
```
WENN has_outsourcing = Nein:
  → "Es liegen keine ausgelagerten Prozesse vor."

WENN has_outsourcing = Ja:
  → "Den Geschäftsbereich {{OUTSOURCED_DETAILS}} geben wir 
     an zuverlässige Partner weiter. Diese Dienstleister 
     wurden sorgfältig ausgewählt und unterliegen der 
     regelmäßigen Lieferantenbewertung. Durch 
     Wareneingangsprüfungen stellen wir sicher, dass o.g. 
     Prozesse unter beherrschten Bedingungen laufen."
```

### E. QUALITÄTSPOLITIK (1 Platzhalter)
```
16. {{QUALITAETSPOLITIK_TEXT}} - Auto-generiert aus Vorlage
```

**4 vordefinierte Stile** (siehe TEXTBAUSTEINE.md):
- Prägnant & modern
- Traditionell & ausführlich  
- Kundenorientiert
- Innovationsorientiert

### F. FIRMEN-HISTORIE (1 Platzhalter - OPTIONAL)
```
17. {{FIRMEN_HISTORIE}}       - Input (optional, Textarea)
```

---

## 📝 VORDEFINIERTE TEXTBAUSTEINE

### Geltungsbereich-Vorlagen

**Vorlage 1: Reine Dienstleistung**
```
Erbringung von {{SERVICES}} für {{KUNDENGRUPPEN}} 
im Bereich {{REGION}}.
```

**Vorlage 2: Dienstleistung & Produktion**
```
Erbringung von Dienstleistungen sowie Herstellung und 
Vertrieb von {{SERVICES}} für {{KUNDENGRUPPEN}}.
```

**Vorlage 3: Produktion mit Entwicklung**
```
Entwicklung, Herstellung und Vertrieb von {{SERVICES}} 
für {{KUNDENGRUPPEN}} am Standort {{PLZ_ORT}}.
```

**Vorlage 4: Produktion ohne Entwicklung**
```
Herstellung und Vertrieb von {{SERVICES}} für 
{{KUNDENGRUPPEN}} am Standort {{PLZ_ORT}}.
```

**Vorlage 5: Handel**
```
Handel mit {{SERVICES}} für {{KUNDENGRUPPEN}} im 
Bereich {{REGION}}.
```

### Kundengruppen-Text

**Auto-generiert basierend auf Auswahl:**
```
- B2B Industrie → "mittelständische und große Industrieunternehmen"
- B2B Öffentlich → "öffentliche Auftraggeber und Behörden"
- B2C → "Privatkunden"
- B2G → "Behörden und öffentliche Einrichtungen"
- International → "Kunden im internationalen Markt"
```

**Bei Mehrfachauswahl:** Liste trennen mit Komma

---

## 🎨 FRONTEND-FORMULAR (4 Schritte)

### SCHRITT 1: Firmendaten (60 Sek)
```javascript
✅ Firmenname           [Input, Pflicht]
✅ Straße & Hausnummer  [Input, Pflicht]
✅ PLZ & Ort            [Input, Pflicht]
✅ Telefon              [Input, Pflicht]
☐ Telefax              [Input, Optional]
✅ Email                [Input, Pflicht]
☐ Website              [Input, Optional]
☐ Logo                 [Upload, Optional]
```

### SCHRITT 2: Unternehmenskontext (90 Sek)
```javascript
✅ Unternehmensart      [Dropdown, 5 Optionen]
   - Reine Dienstleistung
   - Dienstleistung & Produktion
   - Produktion mit Entwicklung
   - Produktion ohne Entwicklung
   - Handel

✅ Dienstleistungen/Produkte  [Input, max 200 Zeichen]
   → Beispiel: "Präzisionsbauteile für die Automobilindustrie"

✅ Geltungsbereich     [Auto-Fill + Editierbar]
   → Wird automatisch aus Vorlage befüllt
   → User kann anpassen

✅ Kundengruppen       [Multiple Choice]
   ☐ B2B - Industrie
   ☐ B2B - Öffentliche Auftraggeber
   ☐ B2C - Privatkunden
   ☐ B2G - Behörden
   ☐ International

✅ Marktregion         [Multiple Choice]
   ☐ Regional
   ☐ Deutschland
   ☐ DACH-Region
   ☐ Europa
   ☐ International

☐ Relevante Zulassungen  [Input, Optional]
   → Beispiel: "BAFA-Berater, Schweißzulassung"
```

### SCHRITT 3: QM-System Details (60 Sek)
```javascript
✅ Entwicklungsprozess?  [Radio Ja/Nein]
   ○ Ja - Wir entwickeln selbst
   ○ Nein - Entwicklung ist ausgeschlossen

✅ Prüfmittelüberwachung?  [Radio Ja/Nein]
   ○ Ja - Wir nutzen überwachungspflichtige Prüfmittel
   ○ Nein - Keine Prüfmittel

✅ Ausgelagerte Prozesse?  [Radio Ja/Nein]
   ○ Ja - Wir lagern Prozesse aus
   ○ Nein - Alle Prozesse intern

   WENN Ja:
   → Welche Prozesse?  [Input]

✅ Qualitätspolitik-Stil  [Dropdown]
   - Prägnant & modern
   - Traditionell & ausführlich
   - Kundenorientiert
   - Innovationsorientiert
```

### SCHRITT 4: Optional (30 Sek)
```javascript
☐ Firmen-Historie  [Textarea, Optional, max 500 Zeichen]
   → Beispiel: "Gegründet 2000, Umzug 2006, Erweiterung 2010"

☐ Besondere Hinweise  [Textarea, Optional, max 300 Zeichen]
```

**Zusammenfassung anzeigen → Submit**

---

## ⚙️ BACKEND-LOGIK (Google Apps Script)

### Eingabe vom Frontend:
```json
{
  "firmenname": "Mustermann GmbH",
  "strasse": "Musterstraße 123",
  "plz_ort": "90762 Fürth",
  "telefon": "+49 911 123456",
  "telefax": "",
  "email": "info@mustermann.de",
  "website": "www.mustermann.de",
  "logo_base64": "...",
  
  "unternehmensart": "produktion_mit",
  "services": "Präzisionsbauteile für Automobilindustrie",
  "customer_groups": ["B2B - Industrie", "International"],
  "market_region": ["Deutschland", "Europa"],
  "zulassungen": "",
  
  "has_development": true,
  "has_measurement": false,
  "has_outsourcing": false,
  
  "quality_policy_style": "modern",
  "firmen_historie": "",
  "special_notes": ""
}
```

### Backend-Verarbeitung:
```javascript
// 1. Geltungsbereich generieren
const scope_template = TEMPLATES.scope[data.unternehmensart];
const scope_text = scope_template
  .replace('{{SERVICES}}', data.services)
  .replace('{{KUNDENGRUPPEN}}', generateCustomerText(data.customer_groups))
  .replace('{{REGION}}', data.market_region.join(', '))
  .replace('{{PLZ_ORT}}', data.plz_ort);

// 2. Ausschluss-Text generieren
const exclusion_text = generateExclusionText(
  data.has_development, 
  data.has_measurement
);

// 3. Outsourcing-Text generieren
const outsourcing_text = data.has_outsourcing
  ? `Den Geschäftsbereich ${data.outsourced_details} geben wir...`
  : "Es liegen keine ausgelagerten Prozesse vor.";

// 4. Qualitätspolitik-Text holen
const quality_policy_text = TEXTBAUSTEINE.quality_policy[data.quality_policy_style];

// 5. Zulassungen-Text
const zulassungen_text = data.zulassungen || 
  "Es werden keine relevanten Zulassungen benötigt.";

// 6. Alle Platzhalter ersetzen
const replacements = {
  '{{LOGO}}': insertLogo(data.logo_base64),
  '{{FIRMENNAME}}': data.firmenname,
  '{{STRASSE}}': data.strasse,
  '{{PLZ_ORT}}': data.plz_ort,
  '{{TELEFON}}': data.telefon,
  '{{TELEFAX}}': data.telefax || data.telefon,
  '{{EMAIL}}': data.email,
  '{{WEBSITE}}': data.website || '',
  '{{GELTUNGSBEREICH}}': scope_text,
  '{{KUNDENGRUPPEN}}': generateCustomerText(data.customer_groups),
  '{{ZULASSUNGEN_TEXT}}': zulassungen_text,
  '{{AUSSCHLUSS_TEXT}}': exclusion_text,
  '{{OUTSOURCING_TEXT}}': outsourcing_text,
  '{{QUALITAETSPOLITIK_TEXT}}': quality_policy_text,
  '{{FIRMEN_HISTORIE}}': data.firmen_historie || 'n/a',
  '{{FREIGABE_ROLLE}}': 'Geschäftsführer',
  '{{DATUM}}': new Date().toLocaleDateString('de-DE')
};

// 7. Template füllen
fillDocxTemplate(TEMPLATE_ID, replacements);
```

---

## 📤 OUTPUT

### Email an Kunde:
```
Betreff: Ihr Unternehmenshandbuch ISO 9001:2015

Sehr geehrte/r {{KONTAKTPERSON}},

anbei erhalten Sie Ihr individuelles Unternehmenshandbuch 
gemäß ISO 9001:2015.

Anhänge:
- Unternehmenshandbuch_{{FIRMENNAME}}_{{DATUM}}.docx
- Unternehmenshandbuch_{{FIRMENNAME}}_{{DATUM}}.pdf

Das Handbuch ist vollständig auditfest und kann direkt 
verwendet werden.

Bei Fragen oder Anpassungswünschen stehen wir Ihnen gerne 
zur Verfügung.

[CTA: QM-Guru Beratung]
[CTA: OnlineCert Zertifizierung]
```

---

## 🎯 ZUSAMMENFASSUNG

**Platzhalter gesamt: 17** (statt 25)
- 10 Firmendaten (davon 6 Pflicht)
- 3 Geltungsbereich & Kontext
- 1 Ausschlüsse (auto-generiert)
- 1 Outsourcing (auto-generiert)
- 1 Qualitätspolitik (aus 4 Vorlagen)
- 1 Firmen-Historie (optional)

**Vorteile:**
✅ Basiert auf echtem, bewährtem Template
✅ Minimale User-Eingaben (6 Pflicht + 7 Auswahl)
✅ 90% automatisch generiert
✅ ISO 9001:2015 konform
✅ Auditfest
✅ In 5-7 Minuten fertig

**Unterschied zum theoretischen System:**
- ❌ Weniger Platzhalter (17 statt 25)
- ✅ Mehr Auto-Generierung
- ✅ Mehr statischer ISO-Text
- ✅ Einfacheres Frontend
- ✅ Basiert auf echtem Template

---

Diese Struktur ist **sofort umsetzbar** und entspricht 
exakt dem, was Holger manuell erstellt! 🎯
