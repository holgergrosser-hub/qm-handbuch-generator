# 🎯 Die 25 finalen Platzhalter - ISO 9001 QM-Handbuch

## Prinzip: 1 Platzhalter = 1 Nutzerentscheidung oder 1 automatischer Wert

---

## A. FIRMENDATEN (7 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 1 | `{{COMPANY_NAME}}` | Input | Text | Ja |
| 2 | `{{COMPANY_ADDRESS}}` | Input | Text | Ja |
| 3 | `{{COMPANY_CITY}}` | Input | Text | Ja |
| 4 | `{{COMPANY_COUNTRY}}` | Default: "Deutschland" | Text | Ja |
| 5 | `{{CONTACT_PERSON}}` | Input | Text | Ja |
| 6 | `{{CONTACT_EMAIL}}` | Input | Email | Ja |
| 7 | `{{LOGO}}` | Upload (optional) | Image | Nein |

**Automatisch generiert:**
- `{{DOC_VERSION}}` = "1.0" (fix)
- `{{DOC_DATE}}` = Erstellungsdatum (automatisch)
- `{{APPROVAL_ROLE}}` = "Geschäftsführung" (fix)

---

## B. GELTUNGSBEREICH (3 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 8 | `{{COMPANY_TYPE}}` | Dropdown | Auswahl | Ja |
| 9 | `{{SCOPE_TEXT}}` | Vorlage + Edit | Text | Ja |
| 10 | `{{SERVICES_PRODUCTS}}` | Input | Text | Ja |

**Werte für `{{COMPANY_TYPE}}`:**
- "Dienstleistungsunternehmen"
- "Produktionsunternehmen mit Entwicklung"
- "Produktionsunternehmen ohne Entwicklung"
- "Handelsunternehmen"
- "Gemischtes Unternehmen"

---

## C. MARKT & KUNDEN (3 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 11 | `{{CUSTOMER_GROUPS}}` | Multiple Choice | Array | Ja |
| 12 | `{{STAKEHOLDER_CUSTOMERS}}` | Auto-generiert | Text | - |
| 13 | `{{MARKET_REGION}}` | Multiple Choice | Array | Ja |

**Werte für `{{CUSTOMER_GROUPS}}`:**
- "B2B - Industrie"
- "B2B - Öffentliche Auftraggeber"
- "B2B - Handel"
- "B2C - Privatkunden"
- "B2G - Behörden"
- "International"

**`{{STAKEHOLDER_CUSTOMERS}}` wird automatisch generiert aus Auswahl**

---

## D. ORGANISATION (3 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 14 | `{{EMPLOYEE_COUNT}}` | Dropdown | Auswahl | Ja |
| 15 | `{{ROLE_QMB}}` | Ja/Nein | Boolean | Ja |
| 16 | `{{QMB_TEXT}}` | Auto-generiert | Text | - |

**Werte für `{{EMPLOYEE_COUNT}}`:**
- "1-5 Mitarbeiter"
- "6-10 Mitarbeiter"
- "11-50 Mitarbeiter"
- "51-250 Mitarbeiter"
- "Über 250 Mitarbeiter"

---

## E. PROZESSE & AUSSCHLÜSSE (4 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 17 | `{{HAS_DEVELOPMENT}}` | Ja/Nein | Boolean | Ja |
| 18 | `{{EXCLUSION_DEVELOPMENT}}` | Auto-generiert | Text | - |
| 19 | `{{HAS_MEASUREMENT}}` | Ja/Nein | Boolean | Ja |
| 20 | `{{EXCLUSION_MEASUREMENT}}` | Auto-generiert | Text | - |

**Logik:**
- `{{HAS_DEVELOPMENT}}` = Nein → `{{EXCLUSION_DEVELOPMENT}}` = Standardtext
- `{{HAS_DEVELOPMENT}}` = Ja → `{{EXCLUSION_DEVELOPMENT}}` = leer

---

## F. QUALITÄTSPOLITIK (2 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 21 | `{{QUALITY_POLICY_STYLE}}` | Dropdown | Auswahl | Ja |
| 22 | `{{QUALITY_POLICY_TEXT}}` | Auto-generiert | Text | - |

**Werte für `{{QUALITY_POLICY_STYLE}}`:**
- "Prägnant & modern"
- "Traditionell & ausführlich"
- "Kundenorientiert"
- "Innovationsorientiert"

**Jeder Stil = fertiger Textbaustein**

---

## G. OUTSOURCING (2 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 23 | `{{HAS_OUTSOURCING}}` | Ja/Nein | Boolean | Ja |
| 24 | `{{OUTSOURCED_PROCESS_TEXT}}` | Auto-generiert | Text | - |

---

## H. SONSTIGES (1 Platzhalter)

| # | Platzhalter | Quelle | Typ | Pflicht |
|---|-------------|--------|-----|---------|
| 25 | `{{SPECIAL_NOTES}}` | Textarea (optional) | Text | Nein |

---

## 📊 ZUSAMMENFASSUNG

**Total: 25 Platzhalter**

**Davon:**
- 10 direkte User-Inputs (Firmendaten, Freitexte)
- 8 Dropdown/Auswahl-Felder
- 7 automatisch generiert (basierend auf Auswahl)

**Pflichtfelder: 18**
**Optionale Felder: 7**

**Formular-Seiten:**
1. Firmendaten (6 Felder)
2. Unternehmensprofil (6 Felder)
3. QM-System Details (5 Felder)
4. Zusammenfassung & Submit (1 Feld optional)

**Ausfüllzeit: 5-7 Minuten**
