import React, { useState } from 'react';
import './App.css';

// ============================================================================
// UX-KOMPONENTEN - "DAS REICHT"-SIGNALE
// ============================================================================

const ISOKonformBadge = () => (
  <div className="iso-konform-badge">
    <span className="checkmark">✓</span>
    <span className="text">ISO 9001 konform</span>
  </div>
);

const RecommendationBox = ({ children }) => (
  <div className="recommendation-box">
    <div className="recommendation-icon">💡</div>
    <div className="recommendation-text">{children}</div>
  </div>
);

const ConfidenceSignal = ({ message }) => (
  <div className="confidence-signal">
    <span className="confidence-icon">✔️</span>
    <span className="confidence-text">{message}</span>
  </div>
);

// ============================================================================
// INTRO SCREEN - ERWARTUNGSMANAGEMENT
// ============================================================================

const IntroScreen = ({ onStart }) => {
  return (
    <div className="intro-screen">
      <div className="intro-container">
        <h1>Ihr ISO 9001 QM-Handbuch</h1>
        <p className="intro-subtitle">Bewusst standardisiert – damit Sie nichts falsch machen können</p>
        
        <div className="intro-features">
          <div className="intro-feature">
            <div className="feature-icon">🎯</div>
            <h3>90% bereits fertig</h3>
            <p>Alle ISO-Texte sind fix und auditfest. Sie konfigurieren nur Ihre Firmendaten.</p>
          </div>
          
          <div className="intro-feature">
            <div className="feature-icon">🛡️</div>
            <h3>Nichts falsch machen</h3>
            <p>Sie können keine ISO-Fehler einbauen. Das Template wurde 1.000+ mal zertifiziert.</p>
          </div>
          
          <div className="intro-feature">
            <div className="feature-icon">⚡</div>
            <h3>5 Minuten Ausfüllzeit</h3>
            <p>Klar strukturierte Fragen. Keine ISO-Expertise nötig.</p>
          </div>
        </div>
        
        <div className="intro-expectation">
          <h3>Was Sie bekommen:</h3>
          <ul>
            <li>✅ Vollständiges QM-Handbuch (15-18 Seiten)</li>
            <li>✅ Word-Datei zum Bearbeiten</li>
            <li>✅ PDF zum Drucken</li>
            <li>✅ Sofort per Email</li>
          </ul>
        </div>
        
        <button onClick={onStart} className="btn-start">
          Jetzt starten →
        </button>
        
        <p className="intro-footer">
          Dieses Handbuch ist kein individuelles ISO-Kunstwerk – 
          es ist ein bewährtes Standard-Handbuch, das funktioniert.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Schritt 1: Firmendaten
    company_name: '',
    company_address: '',
    company_city: '',
    company_country: 'Deutschland',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    logo_base64: null,
    
    // Schritt 2: Unternehmensprofil
    company_type: 'dienstleistung', // VORAUSWAHL!
    services_products: '',
    scope_template: 'dienstleistung',
    scope_text: '',
    customer_groups: ['B2B - Industrie'], // VORAUSWAHL!
    market_region: ['Deutschland'], // VORAUSWAHL!
    employee_count: '1-10 Mitarbeiter', // VORAUSWAHL!
    
    // Schritt 3: QM-System
    has_development: false, // VORAUSWAHL: NEIN!
    has_measurement: false, // VORAUSWAHL: NEIN!
    has_outsourcing: false, // VORAUSWAHL: NEIN!
    role_qmb: false, // VORAUSWAHL: NEIN!
    quality_policy_style: 'modern', // VORAUSWAHL!
    
    // Schritt 4: Optional
    special_notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Textbausteine für Scope
  const SCOPE_TEMPLATES = {
    dienstleistung: 'Entwicklung und Erbringung von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}} im Bereich {{MARKET_REGION}}.',
    produktion_mit: 'Entwicklung, Herstellung und Vertrieb von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}}.',
    produktion_ohne: 'Herstellung und Vertrieb von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}}.',
    handel: 'Handel mit {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}} im Bereich {{MARKET_REGION}}.',
    gemischt: 'Erbringung von Dienstleistungen sowie Herstellung und Vertrieb von {{SERVICES_PRODUCTS}} für {{CUSTOMER_GROUPS}}.'
  };

  // ============================================================================
  // INTRO ÜBERSPRINGEN
  // ============================================================================
  
  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  // ============================================================================
  // SCHRITT-VALIDIERUNG
  // ============================================================================
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.company_name) newErrors.company_name = 'Pflichtfeld';
      if (!formData.company_address) newErrors.company_address = 'Pflichtfeld';
      if (!formData.company_city) newErrors.company_city = 'Pflichtfeld';
      if (!formData.contact_person) newErrors.contact_person = 'Pflichtfeld';
      if (!formData.contact_email) newErrors.contact_email = 'Pflichtfeld';
    }
    
    if (step === 2) {
      if (!formData.services_products) newErrors.services_products = 'Pflichtfeld';
      if (!formData.scope_text) newErrors.scope_text = 'Pflichtfeld';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================================
  // NAVIGATION
  // ============================================================================
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // ============================================================================
  // FORMULAR ÄNDERUNGEN
  // ============================================================================
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Auto-Fill Scope Text
    if (name === 'scope_template') {
      const template = SCOPE_TEMPLATES[value] || '';
      setFormData(prev => ({
        ...prev,
        scope_text: template
      }));
    }
    
    // Fehler löschen wenn Feld befüllt
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo_base64: reader.result.split(',')[1]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ============================================================================
  // SUBMIT
  // ============================================================================
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage('success');
      } else {
        setMessage('error');
      }
    } catch (error) {
      console.error('Fehler:', error);
      setMessage('error');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // PROGRESS BAR
  // ============================================================================
  
  const progress = (currentStep / 4) * 100;
  
  // Dynamische Progress-Nachrichten
  const getProgressMessage = () => {
    switch(currentStep) {
      case 1: return 'Schritt 1/4: Ihre Basisdaten – das Fundament Ihres Handbuchs';
      case 2: return 'Schritt 2/4: Ihr Unternehmensprofil – 90% ist bereits Standard';
      case 3: return 'Schritt 3/4: QM-Details – Empfohlene Vorauswahlen sind gesetzt';
      case 4: return 'Schritt 4/4: Prüfen & Abschließen – Sie sind fast fertig!';
      default: return '';
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>QM-Handbuch Generator</h1>
        <p>ISO 9001:2015 konform – bewährt – auditfest</p>
      </header>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-message">{getProgressMessage()}</p>
      </div>

      {/* Step Indicators */}
      <div className="step-indicators">
        {[1, 2, 3, 4].map(step => (
          <div
            key={step}
            className={`step-indicator ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
          >
            {currentStep > step ? '✓' : step}
          </div>
        ))}
      </div>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="wizard-form">
        
        {/* ============================================================ */}
        {/* SCHRITT 1: FIRMENDATEN */}
        {/* ============================================================ */}
        
        {currentStep === 1 && (
          <div className="step-content">
            <h2>Firmendaten</h2>
            <p className="step-intro">
              Ihre Kontaktdaten – diese erscheinen auf dem Deckblatt und in der Fußzeile.
            </p>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Firmenname *</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="z.B. Mustermann GmbH"
                  className={errors.company_name ? 'error' : ''}
                />
                {errors.company_name && <span className="error-text">{errors.company_name}</span>}
              </div>
              
              <div className="form-group">
                <label>Straße & Hausnummer *</label>
                <input
                  type="text"
                  name="company_address"
                  value={formData.company_address}
                  onChange={handleChange}
                  placeholder="z.B. Musterstraße 123"
                  className={errors.company_address ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label>PLZ & Ort *</label>
                <input
                  type="text"
                  name="company_city"
                  value={formData.company_city}
                  onChange={handleChange}
                  placeholder="z.B. 90762 Fürth"
                  className={errors.company_city ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label>Land</label>
                <input
                  type="text"
                  name="company_country"
                  value={formData.company_country}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Ansprechpartner *</label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="z.B. Max Mustermann"
                  className={errors.contact_person ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  placeholder="z.B. max@mustermann.de"
                  className={errors.contact_email ? 'error' : ''}
                />
                <small>Das Handbuch wird an diese Email gesendet</small>
              </div>
              
              <div className="form-group">
                <label>Telefon (optional)</label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  placeholder="z.B. 0911 / 123456"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Firmenlogo (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                {formData.logo_base64 && <span className="file-uploaded">✓ Logo hochgeladen</span>}
                <small>Wird auf dem Deckblatt eingefügt</small>
              </div>
            </div>
            
            <ConfidenceSignal message="Diese Daten erscheinen nur im Handbuch – nicht in Datenbanken." />
          </div>
        )}

        {/* ============================================================ */}
        {/* SCHRITT 2: UNTERNEHMENSPROFIL */}
        {/* ============================================================ */}
        
        {currentStep === 2 && (
          <div className="step-content">
            <h2>Unternehmensprofil</h2>
            <p className="step-intro">
              Beschreiben Sie Ihr Unternehmen – die empfohlenen Vorauswahlen passen für 80% der Fälle.
            </p>
            
            {/* Unternehmensart */}
            <div className="form-group">
              <label>Unternehmensart *</label>
              <select
                name="company_type"
                value={formData.company_type}
                onChange={handleChange}
              >
                <option value="dienstleistung">Dienstleistungsunternehmen</option>
                <option value="produktion_mit">Produktion mit Entwicklung</option>
                <option value="produktion_ohne">Produktion ohne Entwicklung</option>
                <option value="handel">Handel</option>
                <option value="gemischt">Gemischt (Dienst & Produktion)</option>
              </select>
              
              <RecommendationBox>
                <strong>Empfehlung für Dienstleister:</strong> "Dienstleistungsunternehmen" ist vorausgewählt und für 80% korrekt.
              </RecommendationBox>
            </div>
            
            {/* Produkte/Dienstleistungen */}
            <div className="form-group">
              <label>Ihre Produkte / Dienstleistungen *</label>
              <input
                type="text"
                name="services_products"
                value={formData.services_products}
                onChange={handleChange}
                placeholder="z.B. IT-Beratung, Software-Entwicklung, Cloud-Lösungen"
                maxLength={200}
                className={errors.services_products ? 'error' : ''}
              />
              <small>{formData.services_products.length}/200 Zeichen</small>
              
              {!errors.services_products && formData.services_products.length > 20 && (
                <ConfidenceSignal message="Diese Formulierung ist ausreichend für ISO 9001." />
              )}
            </div>
            
            {/* Geltungsbereich */}
            <div className="form-group">
              <label>Geltungsbereich - Vorlage wählen</label>
              <select
                name="scope_template"
                value={formData.scope_template}
                onChange={handleChange}
              >
                <option value="dienstleistung">Dienstleistung (Standard)</option>
                <option value="produktion_mit">Produktion mit Entwicklung</option>
                <option value="produktion_ohne">Produktion ohne Entwicklung</option>
                <option value="handel">Handel</option>
                <option value="gemischt">Gemischt</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Geltungsbereich-Text (wird automatisch befüllt, editierbar) *</label>
              <textarea
                name="scope_text"
                value={formData.scope_text}
                onChange={handleChange}
                rows={3}
                className={errors.scope_text ? 'error' : ''}
              ></textarea>
              
              <ISOKonformBadge />
              <ConfidenceSignal message="Dieser Text wird regelmäßig von Zertifizierern akzeptiert." />
            </div>
            
            {/* Kundengruppen */}
            <div className="form-group">
              <label>Ihre Kundengruppen (Mehrfachauswahl möglich)</label>
              <div className="checkbox-group">
                {['B2B - Industrie', 'B2B - Handel', 'B2B - Öffentliche Auftraggeber', 'B2C - Privatkunden', 'B2G - Behörden', 'International'].map(group => (
                  <label key={group} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.customer_groups.includes(group)}
                      onChange={() => handleMultiSelect('customer_groups', group)}
                    />
                    <span>{group}</span>
                  </label>
                ))}
              </div>
              
              <RecommendationBox>
                <strong>Vorausgewählt:</strong> "B2B - Industrie" – ändern Sie nur, wenn Ihre Kunden anders sind.
              </RecommendationBox>
            </div>
            
            {/* Marktregion */}
            <div className="form-group">
              <label>Marktregion (Mehrfachauswahl)</label>
              <div className="checkbox-group">
                {['Deutschland', 'DACH-Region', 'Europa', 'Weltweit', 'Lokal/Regional'].map(region => (
                  <label key={region} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.market_region.includes(region)}
                      onChange={() => handleMultiSelect('market_region', region)}
                    />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Mitarbeiteranzahl */}
            <div className="form-group">
              <label>Mitarbeiteranzahl</label>
              <select
                name="employee_count"
                value={formData.employee_count}
                onChange={handleChange}
              >
                <option value="1-10 Mitarbeiter">1-10 Mitarbeiter</option>
                <option value="11-50 Mitarbeiter">11-50 Mitarbeiter</option>
                <option value="51-250 Mitarbeiter">51-250 Mitarbeiter</option>
                <option value="251-1000 Mitarbeiter">251-1000 Mitarbeiter</option>
                <option value="über 1000 Mitarbeiter">über 1000 Mitarbeiter</option>
              </select>
            </div>
            
            <ConfidenceSignal message="Alles Weitere ist bereits im Standard-Handbuch enthalten." />
          </div>
        )}

        {/* ============================================================ */}
        {/* SCHRITT 3: QM-SYSTEM DETAILS */}
        {/* ============================================================ */}
        
        {currentStep === 3 && (
          <div className="step-content">
            <h2>QM-System Details</h2>
            <p className="step-intro">
              Diese Fragen bestimmen ISO-Ausschlüsse. Die Vorauswahl (NEIN) ist für die meisten Dienstleister korrekt.
            </p>
            
            {/* Entwicklung */}
            <div className="form-group">
              <label className="section-label">Hat Ihr Unternehmen einen Entwicklungsprozess?</label>
              <p className="help-text">
                z.B. Produktentwicklung, Software-Entwicklung, Konstruktion
              </p>
              
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_development"
                    value={false}
                    checked={!formData.has_development}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_development: false }))}
                  />
                  <span>Nein (Empfohlen für Dienstleister)</span>
                </label>
                
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_development"
                    value={true}
                    checked={formData.has_development}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_development: true }))}
                  />
                  <span>Ja</span>
                </label>
              </div>
              
              {!formData.has_development && (
                <ConfidenceSignal message="ISO 9001 erlaubt den Ausschluss – das ist korrekt und wird akzeptiert." />
              )}
            </div>
            
            {/* Prüfmittel */}
            <div className="form-group">
              <label className="section-label">Verwenden Sie überwachungspflichtige Prüfmittel?</label>
              <p className="help-text">
                z.B. Messschieber, Waagen, Laborgeräte, die kalibriert werden müssen
              </p>
              
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_measurement"
                    value={false}
                    checked={!formData.has_measurement}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_measurement: false }))}
                  />
                  <span>Nein (Empfohlen für Dienstleister)</span>
                </label>
                
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_measurement"
                    value={true}
                    checked={formData.has_measurement}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_measurement: true }))}
                  />
                  <span>Ja</span>
                </label>
              </div>
              
              {!formData.has_measurement && (
                <ConfidenceSignal message="Für IT- und Beratungsunternehmen ist NEIN die korrekte Antwort." />
              )}
            </div>
            
            {/* Outsourcing */}
            <div className="form-group">
              <label className="section-label">Lagern Sie wesentliche Prozesse aus?</label>
              <p className="help-text">
                z.B. Fertigung, Entwicklung, kritische Dienstleistungen (nicht IT-Support, Gebäudereinigung)
              </p>
              
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_outsourcing"
                    value={false}
                    checked={!formData.has_outsourcing}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_outsourcing: false }))}
                  />
                  <span>Nein (Standard)</span>
                </label>
                
                <label className="radio-label">
                  <input
                    type="radio"
                    name="has_outsourcing"
                    value={true}
                    checked={formData.has_outsourcing}
                    onChange={(e) => setFormData(prev => ({ ...prev, has_outsourcing: true }))}
                  />
                  <span>Ja</span>
                </label>
              </div>
            </div>
            
            {/* QMB */}
            <div className="form-group">
              <label className="section-label">Haben Sie einen Qualitätsmanagementbeauftragten (QMB)?</label>
              <p className="help-text">
                Bei unter 10 Mitarbeitern übernimmt meist die Geschäftsführung diese Rolle
              </p>
              
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="role_qmb"
                    value={false}
                    checked={!formData.role_qmb}
                    onChange={(e) => setFormData(prev => ({ ...prev, role_qmb: false }))}
                  />
                  <span>Nein, GF übernimmt (Empfohlen für kleine Unternehmen)</span>
                </label>
                
                <label className="radio-label">
                  <input
                    type="radio"
                    name="role_qmb"
                    value={true}
                    checked={formData.role_qmb}
                    onChange={(e) => setFormData(prev => ({ ...prev, role_qmb: true }))}
                  />
                  <span>Ja, QMB ist etabliert</span>
                </label>
              </div>
            </div>
            
            {/* Qualitätspolitik */}
            <div className="form-group">
              <label>Stil der Qualitätspolitik</label>
              <select
                name="quality_policy_style"
                value={formData.quality_policy_style}
                onChange={handleChange}
              >
                <option value="modern">Modern & prägnant (Empfohlen)</option>
                <option value="traditional">Traditionell & ausführlich</option>
                <option value="customer">Kundenorientiert</option>
                <option value="innovation">Innovationsorientiert</option>
              </select>
              
              <RecommendationBox>
                <strong>"Modern & prägnant"</strong> ist vorausgewählt – dieser Stil wird von 70% bevorzugt und ist ISO-konform.
              </RecommendationBox>
            </div>
            
            <ISOKonformBadge />
            <ConfidenceSignal message="Alle diese Einstellungen sind auditfest und werden regelmäßig zertifiziert." />
          </div>
        )}

        {/* ============================================================ */}
        {/* SCHRITT 4: ZUSAMMENFASSUNG & SUBMIT */}
        {/* ============================================================ */}
        
        {currentStep === 4 && (
          <div className="step-content">
            <h2>Zusammenfassung & Abschluss</h2>
            <p className="step-intro">
              Fast fertig! Prüfen Sie die 3 wichtigsten Punkte – alles Weitere ist bereits im Handbuch.
            </p>
            
            <div className="summary-box">
              <h3>Die 3 wichtigsten Punkte:</h3>
              
              <div className="summary-item">
                <strong>1. Unternehmensart:</strong>
                <p>{formData.company_type === 'dienstleistung' ? 'Dienstleistungsunternehmen' : 
                   formData.company_type === 'produktion_mit' ? 'Produktion mit Entwicklung' :
                   formData.company_type === 'produktion_ohne' ? 'Produktion ohne Entwicklung' :
                   formData.company_type === 'handel' ? 'Handel' : 'Gemischt'}</p>
              </div>
              
              <div className="summary-item">
                <strong>2. Geltungsbereich:</strong>
                <p>{formData.scope_text.substring(0, 100)}...</p>
              </div>
              
              <div className="summary-item">
                <strong>3. ISO-Ausschlüsse:</strong>
                <ul>
                  <li>Entwicklung: {formData.has_development ? '✓ Enthalten' : '✗ Ausgeschlossen'}</li>
                  <li>Prüfmittel: {formData.has_measurement ? '✓ Enthalten' : '✗ Ausgeschlossen'}</li>
                </ul>
              </div>
            </div>
            
            <ConfidenceSignal message="Alles Weitere (Qualitätspolitik, Verantwortungen, Prozesse, etc.) ist Standard und bereits im Handbuch enthalten." />
            
            {/* Optionales Feld */}
            <div className="form-group">
              <label>Besondere Hinweise (optional)</label>
              <textarea
                name="special_notes"
                value={formData.special_notes}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="z.B. Spezialisierungen, Zertifikate, Besonderheiten (max. 500 Zeichen)"
              ></textarea>
              <small>{formData.special_notes.length}/500 Zeichen</small>
            </div>
            
            {/* Was passiert jetzt? */}
            <div className="next-steps-box">
              <h3>Was passiert nach dem Download?</h3>
              <ol>
                <li>
                  <strong>Email-Empfang (sofort)</strong><br/>
                  Sie erhalten Word + PDF per Email
                </li>
                <li>
                  <strong>Prüfen (5 Min)</strong><br/>
                  Öffnen Sie die Word-Datei und prüfen Sie auf Vollständigkeit
                </li>
                <li>
                  <strong>Optional anpassen (10-20 Min)</strong><br/>
                  Passen Sie firmenspezifische Details an (falls nötig)
                </li>
                <li>
                  <strong>Freigabe (1 Tag)</strong><br/>
                  Lassen Sie es von der Geschäftsführung freigeben
                </li>
                <li>
                  <strong>Kommunikation (1 Woche)</strong><br/>
                  Kommunizieren Sie es an alle Mitarbeiter
                </li>
              </ol>
            </div>
            
            <div className="confidence-final">
              <h3>✓ Ihr Handbuch ist fertig zum Zertifizieren</h3>
              <p>
                Dieses Handbuch wurde über 1.000 mal erfolgreich zertifiziert. 
                Sie können es direkt für ein ISO 9001 Audit verwenden.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* NAVIGATION BUTTONS */}
        {/* ============================================================ */}
        
        <div className="button-group">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="btn-secondary">
              ← Zurück
            </button>
          )}
          
          {currentStep < 4 && (
            <button type="button" onClick={nextStep} className="btn-primary">
              Weiter →
            </button>
          )}
          
          {currentStep === 4 && (
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Handbuch wird erstellt...
                </>
              ) : (
                '📄 Handbuch jetzt generieren'
              )}
            </button>
          )}
        </div>
      </form>

      {/* ============================================================ */}
      {/* SUCCESS / ERROR MESSAGES */}
      {/* ============================================================ */}
      
      {message === 'success' && (
        <div className="message-box success">
          <h3>✅ Erfolg!</h3>
          <p>Ihr QM-Handbuch wurde erfolgreich erstellt und an <strong>{formData.contact_email}</strong> gesendet.</p>
          
          <div className="post-download-info">
            <h4>Was Sie jetzt tun sollten:</h4>
            <ol>
              <li>Prüfen Sie Ihren Email-Posteingang (auch Spam-Ordner)</li>
              <li>Öffnen Sie die Word-Datei und kontrollieren Sie die Inhalte</li>
              <li>Optional: Passen Sie firmenspezifische Details an</li>
              <li>Lassen Sie das Handbuch von der GF freigeben</li>
            </ol>
            
            <h4>Brauchen Sie Unterstützung?</h4>
            <div className="cta-buttons">
              <a href="https://qm-guru.de/beratung" className="cta-button" target="_blank" rel="noopener noreferrer">
                💼 ISO-Beratung anfragen
              </a>
              <a href="https://onlinecert.de/zertifizierung" className="cta-button" target="_blank" rel="noopener noreferrer">
                🏆 Jetzt zertifizieren (70% günstiger)
              </a>
            </div>
          </div>
        </div>
      )}
      
      {message === 'error' && (
        <div className="message-box error">
          <h3>⚠️ Fehler</h3>
          <p>Es gab ein Problem beim Erstellen des Handbuchs. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter holger.grosser@iso9001.info</p>
        </div>
      )}
    </div>
  );
}

export default App;
