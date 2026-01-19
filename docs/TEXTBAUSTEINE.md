# 📝 TEXTBAUSTEINE - Vordefinierte Inhalte für QM-Handbuch

## Prinzip: 90% vordefiniert, 10% editierbar

Jede Auswahl im Frontend generiert einen fertigen Textbaustein für das Template.

---

## 1. GELTUNGSBEREICH (`{{SCOPE_TEXT}}`)

### Vorlagen (Nutzer wählt eine + editiert)

**Vorlage 1: Dienstleistung**
```
Entwicklung und Erbringung von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}} 
im Bereich {{MARKET_REGION}}.
```

**Vorlage 2: Produktion mit Entwicklung**
```
Entwicklung, Herstellung und Vertrieb von {{SERVICES_PRODUCTS}} für 
{{CUSTOMER_GROUPS}} am Standort {{COMPANY_CITY}}, {{COMPANY_COUNTRY}}.
```

**Vorlage 3: Produktion ohne Entwicklung**
```
Herstellung und Vertrieb von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}} 
am Standort {{COMPANY_CITY}}, {{COMPANY_COUNTRY}}.
```

**Vorlage 4: Handel**
```
Handel mit {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}} im Bereich 
{{MARKET_REGION}}.
```

**Vorlage 5: Gemischt**
```
Erbringung von Dienstleistungen sowie Herstellung und Vertrieb von 
{{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}}.
```

---

## 2. INTERESSIERTE PARTEIEN (`{{STAKEHOLDER_CUSTOMERS}}`)

### Auto-generiert basierend auf `{{CUSTOMER_GROUPS}}` Auswahl

**Wenn "B2B - Industrie" ausgewählt:**
```
Unsere Hauptkunden sind mittelständische und große Industrieunternehmen. 
Wir verstehen ihre spezifischen Anforderungen an Qualität, Liefertreue 
und technische Kompetenz.
```

**Wenn "B2B - Öffentliche Auftraggeber" ausgewählt:**
```
Wir arbeiten mit öffentlichen Auftraggebern und Behörden zusammen. 
Dabei berücksichtigen wir die besonderen Anforderungen an Dokumentation, 
Transparenz und Vergaberichtlinien.
```

**Wenn "B2C - Privatkunden" ausgewählt:**
```
Unsere Kunden sind Privatkunden mit hohen Erwartungen an Service, 
Beratung und Produktqualität. Kundenzufriedenheit steht im Mittelpunkt 
unseres Handelns.
```

**Wenn "B2G - Behörden" ausgewählt:**
```
Als Partner von Behörden und öffentlichen Einrichtungen erfüllen wir 
strenge Vorgaben zu Compliance, Datenschutz und Qualitätssicherung.
```

**Wenn "International" ausgewählt:**
```
Wir beliefern Kunden im internationalen Markt. Dabei berücksichtigen 
wir unterschiedliche Standards, Normen und kulturelle Anforderungen.
```

**Wenn mehrere ausgewählt:**
```
Unsere Kundengruppen umfassen: [LISTE]. Wir passen unsere Leistungen 
flexibel an die spezifischen Anforderungen jeder Kundengruppe an.
```

---

## 3. AUSSCHLUSS ENTWICKLUNG (`{{EXCLUSION_DEVELOPMENT}}`)

### Wenn `{{HAS_DEVELOPMENT}}` = Nein

**Textbaustein:**
```
Ein Entwicklungsprozess ist für die Erbringung unserer Leistungen nicht 
erforderlich und wird daher gemäß ISO 9001:2015 Kapitel 8.3 ausgeschlossen. 

Sollte sich die Notwendigkeit eines Entwicklungsprozesses ergeben, wird 
dieser in das QM-System integriert und dokumentiert.
```

### Wenn `{{HAS_DEVELOPMENT}}` = Ja

**Textbaustein:**
```
Die Entwicklung neuer Produkte/Dienstleistungen erfolgt gemäß definiertem 
Entwicklungsprozess. Dabei werden Kundenanforderungen systematisch erfasst, 
Konzepte entwickelt, validiert und freigegeben.

Die Entwicklungsdokumentation umfasst:
• Anforderungsspezifikationen
• Entwicklungspläne
• Validierungsnachweise
• Freigabedokumente
```

---

## 4. AUSSCHLUSS PRÜFMITTEL (`{{EXCLUSION_MEASUREMENT}}`)

### Wenn `{{HAS_MEASUREMENT}}` = Nein

**Textbaustein:**
```
Überwachungspflichtige Prüfmittel werden nicht eingesetzt. Die Leistungserbringung 
erfordert keine messtechnische Überwachung. Daher wird ISO 9001:2015 Kapitel 7.1.5.2 
als nicht zutreffend betrachtet.
```

### Wenn `{{HAS_MEASUREMENT}}` = Ja

**Textbaustein:**
```
Überwachungspflichtige Prüfmittel werden gemäß Kalibrierplan regelmäßig kalibriert 
und überwacht. Die Kalibrierung erfolgt durch akkreditierte Kalibrierlabore oder 
durch Werkskalibrierung mit rückführbaren Normalen.

Kalibrierte Prüfmittel werden gekennzeichnet mit:
• Kalibrierungsdatum
• Nächstem Kalibriertermin
• Eindeutiger Identifikation
```

---

## 5. QUALITÄTSPOLITIK (`{{QUALITY_POLICY_TEXT}}`)

### Stil 1: "Prägnant & modern"

**Textbaustein:**
```
Qualität bedeutet für {{COMPANY_NAME}}:

• Kundenerwartungen übertreffen
  Wir hören zu, verstehen Anforderungen und liefern Lösungen, die begeistern.

• Prozesse kontinuierlich verbessern
  Wir hinterfragen etablierte Abläufe und optimieren systematisch.

• Verantwortung leben
  Jeder Mitarbeiter trägt zur Qualität bei und handelt eigenverantwortlich.

Diese Grundsätze sind verbindlich für alle Mitarbeiter und Führungskräfte.
```

### Stil 2: "Traditionell & ausführlich"

**Textbaustein:**
```
Die Geschäftsführung der {{COMPANY_NAME}} verpflichtet sich zur Einhaltung 
höchster Qualitätsstandards in allen Unternehmensbereichen.

Unsere Qualitätspolitik basiert auf folgenden Grundsätzen:

1. Kundenorientierung
   Kundenzufriedenheit ist unser oberstes Ziel. Wir erfüllen vereinbarte 
   Anforderungen zuverlässig und termingerecht.

2. Mitarbeiterqualifikation
   Qualifizierte und motivierte Mitarbeiter sind die Grundlage unseres Erfolgs. 
   Wir fördern kontinuierliche Weiterbildung.

3. Prozessorientierung
   Unsere Prozesse sind klar definiert, dokumentiert und werden regelmäßig 
   auf Wirksamkeit überprüft.

4. Lieferantenmanagement
   Wir arbeiten mit qualifizierten Lieferanten zusammen und stellen sicher, 
   dass eingekaufte Produkte unseren Anforderungen entsprechen.

5. Kontinuierliche Verbesserung
   Wir fördern eine Kultur der ständigen Verbesserung durch systematische 
   Analyse von Kennzahlen und Ableitung von Verbesserungsmaßnahmen.

Diese Qualitätspolitik wird allen Mitarbeitern kommuniziert und ist 
verbindliche Grundlage unseres Handelns.
```

### Stil 3: "Kundenorientiert"

**Textbaustein:**
```
Bei {{COMPANY_NAME}} steht der Kunde im Mittelpunkt.

Unsere Versprechen:

✓ Qualität, die überzeugt
  Wir liefern Produkte/Dienstleistungen, die Erwartungen nicht nur erfüllen, 
  sondern übertreffen.

✓ Verlässlichkeit, auf die Sie zählen können
  Vereinbarte Termine und Spezifikationen halten wir ein – garantiert.

✓ Service, der begeistert
  Wir sind erreichbar, reagieren schnell und lösen Probleme proaktiv.

✓ Partnerschaft auf Augenhöhe
  Ihr Feedback ist wertvoll. Wir hören zu und entwickeln uns gemeinsam weiter.

Diese Kundenversprechen leben wir jeden Tag – messbar, nachweisbar, erlebbar.
```

### Stil 4: "Innovationsorientiert"

**Textbaustein:**
```
Innovation und Qualität sind bei {{COMPANY_NAME}} untrennbar verbunden.

Unsere Innovationsgrundsätze:

→ Denken Sie voraus
  Wir antizipieren Marktentwicklungen und entwickeln Lösungen, bevor 
  Anforderungen entstehen.

→ Lernen Sie aus Fehlern
  Fehler sind Chancen. Wir analysieren systematisch, lernen und verbessern 
  kontinuierlich.

→ Fördern Sie Kreativität
  Jeder Mitarbeiter kann Verbesserungsvorschläge einbringen. Gute Ideen 
  werden umgesetzt.

→ Messen Sie Erfolg
  Innovation ohne Kennzahlen ist Zufall. Wir messen, bewerten und steuern 
  unsere Innovationskraft.

Qualität von heute ist der Standard von morgen – deshalb verbessern wir uns täglich.
```

---

## 6. QMB-ROLLE (`{{QMB_TEXT}}`)

### Wenn `{{ROLE_QMB}}` = Ja

**Textbaustein:**
```
Die Funktion des Qualitätsmanagementbeauftragten (QMB) ist etabliert.

Aufgaben des QMB:
• Sicherstellung der Wirksamkeit des QM-Systems
• Berichterstattung an die Geschäftsführung
• Koordination interner Audits
• Schulung und Beratung der Mitarbeiter
• Pflege der QM-Dokumentation

Der QMB berichtet direkt an die Geschäftsführung und verfügt über die 
erforderlichen Befugnisse zur Durchsetzung von Qualitätsanforderungen.
```

### Wenn `{{ROLE_QMB}}` = Nein

**Textbaustein:**
```
Die Verantwortung für das Qualitätsmanagementsystem liegt bei der Geschäftsführung.

Aufgrund der Unternehmensgröße von {{EMPLOYEE_COUNT}} ist keine separate 
QMB-Funktion erforderlich. Die Geschäftsführung nimmt die Aufgaben des 
Qualitätsmanagements direkt wahr:

• Festlegung der Qualitätspolitik
• Bereitstellung von Ressourcen
• Durchführung von Managementbewertungen
• Sicherstellung der Kundenfokussierung
• Förderung der kontinuierlichen Verbesserung
```

---

## 7. OUTSOURCING (`{{OUTSOURCED_PROCESS_TEXT}}`)

### Wenn `{{HAS_OUTSOURCING}}` = Nein

**Textbaustein:**
```
Alle wesentlichen Prozesse werden intern durchgeführt. Es erfolgt keine 
Auslagerung von Prozessen, die direkten Einfluss auf die Produktqualität 
oder Leistungserbringung haben.

Unterstützende Dienstleistungen wie Gebäudereinigung, IT-Support oder 
Wartung werden durch externe Dienstleister erbracht, unterliegen jedoch 
nicht der QM-Überwachung gemäß ISO 9001:2015 Kapitel 8.4.
```

### Wenn `{{HAS_OUTSOURCING}}` = Ja

**Textbaustein:**
```
Folgende Prozesse werden teilweise oder vollständig ausgelagert:
[LISTE DER AUSGELAGERTEN PROZESSE]

Für ausgelagerte Prozesse gilt:

• Qualitätsanforderungen werden vertraglich vereinbart
• Regelmäßige Bewertung der Lieferantenleistung
• Eingangskontrollen stellen Konformität sicher
• Bei kritischen Prozessen: Audits beim Lieferanten

Die Verantwortung für die Qualität ausgelagerter Prozesse verbleibt 
bei {{COMPANY_NAME}}.
```

---

## 8. STANDARD-TEXTBAUSTEINE (immer gleich)

### Interessierte Parteien - Mitarbeiter
```
**Mitarbeiter:**
Qualifizierte und motivierte Mitarbeiter sind die Grundlage unseres Erfolgs. 
Wir bieten sichere Arbeitsplätze, faire Bezahlung und fördern kontinuierliche 
Weiterbildung. Das Betriebsklima ist geprägt von gegenseitigem Respekt und 
offener Kommunikation.
```

### Interessierte Parteien - Lieferanten
```
**Lieferanten:**
Unsere Lieferanten sind Partner, mit denen wir langfristige, faire 
Geschäftsbeziehungen pflegen. Wir erwarten Zuverlässigkeit, Qualität und 
Termintreue. Im Gegenzug bieten wir Planungssicherheit und partnerschaftliche 
Zusammenarbeit.
```

### Interessierte Parteien - Behörden
```
**Behörden und Aufsichtsbehörden:**
Wir erfüllen alle gesetzlichen und behördlichen Anforderungen. Die 
Zusammenarbeit mit Aufsichtsbehörden ist transparent und kooperativ. 
Änderungen rechtlicher Anforderungen werden zeitnah umgesetzt.
```

### Interessierte Parteien - Eigentümer
```
**Gesellschafter/Eigentümer:**
Die Geschäftsführung stellt sicher, dass die Interessen der Eigentümer 
gewahrt werden. Dies umfasst wirtschaftlichen Erfolg, Risikomanagement 
und nachhaltige Unternehmensentwicklung.
```

### Kundenzufriedenheit (immer gleich)
```
Die Kundenzufriedenheit wird systematisch erfasst durch:

• Direkte Kundenbefragungen (jährlich)
• Auswertung von Reklamationen und Beschwerden
• Analyse von Kundenfeedback bei Projektabschlüssen
• Messung von Liefertreue und Qualitätskennzahlen

Ergebnisse werden in der Managementbewertung analysiert und Maßnahmen 
zur Verbesserung abgeleitet.
```

### Interne Audits (immer gleich)
```
Interne Audits werden gemäß Auditprogramm mindestens einmal jährlich 
durchgeführt. Das Auditprogramm berücksichtigt:

• Wichtigkeit der Prozesse
• Änderungen der Organisation
• Ergebnisse vorheriger Audits

Auditoren sind unabhängig vom zu auditierenden Bereich. Festgestellte 
Abweichungen werden dokumentiert, Ursachen analysiert und Korrekturmaßnahmen 
eingeleitet.
```

### Managementbewertung (immer gleich)
```
Die Geschäftsführung führt mindestens einmal jährlich eine Managementbewertung 
durch. Eingaben sind:

• Auditergebnisse (intern und extern)
• Kundenfeedback und Reklamationen
• Prozessleistung und Produktkonformität
• Status von Korrektur- und Verbesserungsmaßnahmen
• Änderungen interner und externer Themen
• Ergebnisse der Risikobeurteilung

Ausgaben sind:
• Entscheidungen zur Verbesserung des QM-Systems
• Änderungen der Qualitätspolitik
• Ressourcenbedarf
```

### Kontinuierliche Verbesserung (immer gleich)
```
Kontinuierliche Verbesserung ist integraler Bestandteil unseres QM-Systems.

Verbesserungen werden initiiert durch:
• Mitarbeitervorschläge
• Auditergebnisse
• Reklamationsanalysen
• Kennzahlenauswertungen
• Managementbewertungen

Jede Verbesserungsmaßnahme wird dokumentiert mit:
• Beschreibung des Problems
• Ursachenanalyse
• Geplante Maßnahme
• Verantwortlicher und Termin
• Wirksamkeitsprüfung
```

---

## 📊 VERWENDUNG IM BACKEND

Das Google Apps Script erhält vom Frontend:

```json
{
  "company_type": "Produktionsunternehmen mit Entwicklung",
  "quality_policy_style": "Prägnant & modern",
  "has_development": true,
  "has_measurement": false,
  "customer_groups": ["B2B - Industrie", "International"],
  ...
}
```

**Backend-Logik:**
1. Liest Auswahl
2. Holt passenden Textbaustein aus dieser Datei
3. Ersetzt Platzhalter im DOCX Template
4. Generiert PDF

**Beispiel:**
```javascript
if (data.quality_policy_style === "Prägnant & modern") {
  replacements['{{QUALITY_POLICY_TEXT}}'] = TEXTBAUSTEINE.quality_policy_modern;
}
```

---

Diese Textbausteine garantieren:
✅ Professionelle Sprache
✅ ISO 9001 konform
✅ Auditfest
✅ Sofort verwendbar
✅ Keine Nacharbeit nötig
