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
  const searchParams = new URLSearchParams(window.location.search);
  const appMode = searchParams.get('app') === 'generator' ? 'generator' : 'landing';

  const siteUrl = import.meta?.env?.VITE_SITE_URL || 'https://qm-handbuch.qm-guru.de';
  const generatorUrl = import.meta?.env?.VITE_GENERATOR_URL || 'https://qm-handbuch-generator.netlify.app';
  const expressUrl = import.meta?.env?.VITE_EXPRESS_URL || 'https://express.qm-guru.de';
  const mainUrl = import.meta?.env?.VITE_MAIN_URL || 'https://qm-guru.de';
  const phone = import.meta?.env?.VITE_PHONE || '';
  const email = import.meta?.env?.VITE_EMAIL || '';
  const whatsapp = import.meta?.env?.VITE_WHATSAPP || '';

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
    logo_mime: '',
    logo_filename: '',
    
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
    outsourced_details: '',
    role_qmb: false, // VORAUSWAHL: NEIN!
    quality_policy_style: 'modern', // VORAUSWAHL!
    
    // Schritt 4: Optional
    special_notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorDetail, setErrorDetail] = useState('');

  if (appMode === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white/90 backdrop-blur border-b sticky top-0 z-50">
          <div className="container-custom py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a href={mainUrl} className="font-extrabold text-xl text-primary-700">
                QM-Guru
              </a>
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-200">
                <img
                  src="/holger-grosser.webp"
                  alt="Holger Grosser"
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-600 shadow-sm"
                  loading="lazy"
                />
                <div className="leading-tight">
                  <div className="text-sm font-bold text-gray-900">Holger Grosser</div>
                  <div className="text-xs text-gray-600">QM-Experte seit 1994</div>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
              <a href="#generator" className="hover:text-primary-700">Generator</a>
              <a href="#experte" className="hover:text-primary-700">Experte</a>
              <a href="#vorlagen" className="hover:text-primary-700">Muster</a>
              <a href="#faq" className="hover:text-primary-700">FAQ</a>
              <a href="#services" className="hover:text-primary-700">Beratung</a>
            </nav>
            <div className="flex items-center gap-2">
              <a href="?app=generator" className="btn-secondary py-2 px-4">
                Generator öffnen
              </a>
              <a href={expressUrl} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-4">
                Express-Zertifizierung
              </a>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600 text-white">
          <div className="container-custom section">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                100% kostenlos • Keine Anmeldung • Sofort-Download
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                QM-Handbuch Muster kostenlos erstellen
              </h1>
              <p className="text-lg md:text-2xl opacity-95 mb-10">
                Erstellen Sie ein normnahes <strong>ISO 9001:2015</strong> QM-Handbuch in wenigen Minuten –
                als Grundlage für Ihr Qualitätsmanagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="?app=generator" className="btn-primary text-lg inline-flex items-center justify-center gap-2">
                  <span>🚀</span>
                  <span>Jetzt kostenlos erstellen</span>
                </a>
                <a href="#vorlagen" className="btn-secondary text-lg inline-flex items-center justify-center gap-2">
                  <span>📋</span>
                  <span>Muster ansehen</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/20">
                <div>
                  <div className="text-4xl font-extrabold">0 €</div>
                  <div className="opacity-90">kostenlos</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold">10–15</div>
                  <div className="opacity-90">Minuten</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold">ISO</div>
                  <div className="opacity-90">9001:2015</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-b">
          <div className="container-custom py-6 flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Normnahe Struktur</span></div>
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>PDF/Word-Ausgabe</span></div>
            <div className="flex items-center gap-2"><span className="text-green-600">✓</span><span>Ideal als Einstieg</span></div>
          </div>
        </section>

        <section id="generator" className="section">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    QM-Handbuch Generator: in 3 Schritten
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Sie geben Firmendaten ein, wählen passende Optionen – und erhalten eine saubere Grundlage
                    für Ihr QM-Handbuch.
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <div className="card"><strong>1.</strong> Firmendaten & Ansprechpartner</div>
                    <div className="card"><strong>2.</strong> Unternehmensprofil & Geltungsbereich</div>
                    <div className="card"><strong>3.</strong> Download als PDF/Word</div>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a href="?app=generator" className="btn-primary text-center">Generator starten →</a>
                    <a href={generatorUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-center">
                      Generator (separat) öffnen
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Tipp: Bookmark {siteUrl}/?app=generator
                  </p>
                </div>

                <div className="card border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Für wen ist das geeignet?</h3>
                  <p className="text-gray-600 mb-4">
                    Für KMU, Handwerk, Dienstleister und Produktion – ideal als Startpunkt.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Keine ISO-Vorkenntnisse nötig</li>
                    <li>✓ Klar strukturierte Eingaben</li>
                    <li>✓ Ergebnis direkt nutzbar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vorlagen" className="section bg-gray-50">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">QM-Handbuch Muster & Vorlagen</h2>
                <p className="text-gray-600 text-lg">Wählen Sie die passende Vorlage für Ihre Branche.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[ 
                  { icon: '📘', title: 'Standard (KMU)', items: ['Alle ISO-Kapitel', 'Prozessorientiert', 'Sofort einsetzbar'] },
                  { icon: '🏭', title: 'Produktion', items: ['Fertigung & Prüfen', 'Lieferantenmanagement', 'Lenkung von Abweichungen'] },
                  { icon: '🛠️', title: 'Handwerk', items: ['Auftragsabwicklung', 'Material/Werkzeug', 'Kundenzufriedenheit'] },
                  { icon: '💼', title: 'Dienstleister', items: ['Projekt/Service', 'Wissensmanagement', 'Messung & Verbesserungen'] }
                ].map((card, idx) => (
                  <div key={idx} className="card border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{card.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <ul className="space-y-1 text-gray-700">
                          {card.items.map((it, i) => (
                            <li key={i} className="flex items-center gap-2"><span className="text-green-600">✓</span><span>{it}</span></li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <a href="?app=generator" className="text-primary-700 font-bold hover:underline">Jetzt erstellen →</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experte" className="section bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Ihr QM-Experte
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Qualitätsmanagement mit Erfahrung seit 1994</h2>
                <p className="text-gray-600 text-lg">Pragmatisch, auditfest, ohne Bürokratie.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl rotate-2" />
                    <img
                      src="/holger-grosser.webp"
                      alt="Holger Grosser – QM-Berater und Auditor seit 1994"
                      className="relative rounded-2xl shadow-2xl w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-4 border border-gray-200">
                      <div className="text-3xl font-extrabold text-primary-700">30+</div>
                      <div className="text-sm text-gray-600 font-semibold">Jahre Erfahrung</div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold mb-4">Holger Grosser</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Wenn Sie aus dem QM-Handbuch eine erfolgreiche Zertifizierung machen wollen, hilft Erfahrung.
                    Ich begleite Unternehmen seit 1994 beim Aufbau von Qualitätsmanagementsystemen – vom pragmatischen
                    Start bis zum Audit.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="card border border-gray-200">
                      <div className="font-bold">Audits & Praxis</div>
                      <div className="text-gray-600">Erfahrung aus vielen Projekten</div>
                    </div>
                    <div className="card border border-gray-200">
                      <div className="font-bold">ISO 9001 Fokus</div>
                      <div className="text-gray-600">Normnah, verständlich, umsetzbar</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {whatsapp ? (
                      <a href={whatsapp} target="_blank" rel="noopener" className="btn-primary text-center">
                        WhatsApp Beratung
                      </a>
                    ) : (
                      <a href={mainUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
                        Beratung anfragen
                      </a>
                    )}
                    <a href="#services" className="btn-secondary text-center">Leistungen ansehen</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Häufige Fragen</h2>
                <p className="text-gray-600 text-lg">Kurz beantwortet – damit Sie sofort starten können.</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: 'Was ist ein QM-Handbuch?',
                    a: 'Das QM-Handbuch ist das zentrale Dokument Ihres Qualitätsmanagementsystems. Es beschreibt Struktur, Verantwortlichkeiten und verweist auf Prozesse/Nachweise.'
                  },
                  {
                    q: 'Ist der Generator kostenlos?',
                    a: 'Ja. Sie können die Inhalte erstellen und als PDF/Word exportieren.'
                  },
                  {
                    q: 'Ist das ISO 9001:2015 konform?',
                    a: 'Die Struktur orientiert sich an ISO 9001:2015. Für eine erfolgreiche Zertifizierung sind zusätzlich gelebte Prozesse und Nachweise wichtig.'
                  }
                ].map((faq, idx) => (
                  <details key={idx} className="rounded-lg border border-gray-200 bg-white p-5">
                    <summary className="font-bold cursor-pointer">{faq.q}</summary>
                    <p className="text-gray-700 mt-3">{faq.a}</p>
                  </details>
                ))}
              </div>

              {(whatsapp || email || phone) && (
                <div className="mt-10 card border border-primary-200 bg-primary-50">
                  <h3 className="text-xl font-bold mb-2">Noch Fragen?</h3>
                  <p className="text-gray-700 mb-5">Kostenlos und unverbindlich: kurz schreiben oder anrufen.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {whatsapp && (
                      <a href={whatsapp} target="_blank" rel="noopener" className="btn-primary text-center">WhatsApp</a>
                    )}
                    {email && (
                      <a href={`mailto:${email}`} className="btn-secondary text-center">E-Mail</a>
                    )}
                    {phone && (
                      <a href={`tel:${phone}`} className="btn-secondary text-center">Anrufen</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="services" className="section bg-gray-900 text-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Beratung & Zertifizierung</h2>
                <p className="opacity-90 text-lg">Vom Muster zur erfolgreichen ISO 9001 Zertifizierung.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl flex flex-col">
                  <div className="text-4xl mb-3">📘</div>
                  <h3 className="text-xl font-bold mb-2">Generator</h3>
                  <p className="text-gray-600 mb-6">Kostenlos starten – perfekte Grundlage.</p>
                  <div className="mt-auto">
                    <a href="?app=generator" className="btn-primary w-full block text-center">Starten →</a>
                  </div>
                </div>

                <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl flex flex-col border-4 border-primary-500">
                  <div className="text-4xl mb-3">👨‍💼</div>
                  <h3 className="text-xl font-bold mb-2">QM-Beratung</h3>
                  <p className="text-gray-600 mb-6">Individuelle Unterstützung: Dokumentation, Auditvorbereitung, Umsetzung.</p>
                  <div className="mt-auto">
                    <a href={mainUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full block text-center">
                      Beratung anfragen →
                    </a>
                  </div>
                </div>

                <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl flex flex-col">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-xl font-bold mb-2">Express-Zertifizierung</h3>
                  <p className="text-gray-600 mb-6">Komplettpaket für schnelle Ergebnisse – ideal für Ausschreibungen.</p>
                  <div className="mt-auto">
                    <a href={expressUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full block text-center">
                      Jetzt zertifizieren →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-950 text-gray-300">
          <div className="container-custom py-10 flex flex-col md:flex-row justify-between gap-4">
            <div className="text-sm">
              © {new Date().getFullYear()} QM-Guru • Holger Grosser
            </div>
            <div className="flex gap-4 text-sm">
              <a href="/impressum" className="hover:text-white hover:underline">Impressum</a>
              <a href="/datenschutz" className="hover:text-white hover:underline">Datenschutz</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

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

  const compressImageToJpegBase64 = async (file, { maxDimension = 600, quality = 0.85 } = {}) => {
    // Uses ObjectURL + Canvas to reduce memory pressure vs. huge base64 strings.
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.decoding = 'async';
      img.src = objectUrl;

      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Bild konnte nicht geladen werden.'));
      });

      const { width, height } = img;
      const scale = Math.min(1, maxDimension / Math.max(width, height));
      const targetWidth = Math.max(1, Math.round(width * scale));
      const targetHeight = Math.max(1, Math.round(height * scale));

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas wird nicht unterstützt.');
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const commaIndex = dataUrl.indexOf(',');
      if (commaIndex === -1) throw new Error('Komprimierung fehlgeschlagen (DataURL).');
      return {
        base64: dataUrl.slice(commaIndex + 1),
        mime: 'image/jpeg',
        filename: (file.name || 'logo').replace(/\.[^.]+$/, '') + '.jpg'
      };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate early to avoid huge in-memory base64 strings causing crashes/reloads
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, logo_base64: 'Bitte nur PNG oder JPG hochladen.' }));
        setFormData(prev => ({ ...prev, logo_base64: null, logo_mime: '', logo_filename: '' }));
        return;
      }

      const maxBytes = 1 * 1024 * 1024; // 1 MB

      const setLogoError = (msg) => {
        setErrors(prev => ({ ...prev, logo_base64: msg }));
        setFormData(prev => ({ ...prev, logo_base64: null, logo_mime: '', logo_filename: '' }));
      };

      const clearLogoError = () => {
        setErrors(prev => {
          const next = { ...prev };
          delete next.logo_base64;
          return next;
        });
      };

      // If file is large, compress it first (prevents mobile Safari/low-memory reloads)
      if (file.size > maxBytes) {
        (async () => {
          try {
            const compressed = await compressImageToJpegBase64(file, { maxDimension: 600, quality: 0.85 });
            clearLogoError();
            setFormData(prev => ({
              ...prev,
              logo_base64: compressed.base64,
              logo_mime: compressed.mime,
              logo_filename: compressed.filename
            }));
          } catch (err) {
            setLogoError(err?.message || 'Logo konnte nicht verarbeitet werden.');
          }
        })();
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => {
        setLogoError('Logo konnte nicht gelesen werden.');
      };
      reader.onloadend = () => {
        try {
          const result = reader.result;
          if (typeof result !== 'string') {
            setLogoError('Logo konnte nicht gelesen werden (unerwartetes Format).');
            return;
          }
          const commaIndex = result.indexOf(',');
          if (commaIndex === -1) {
            setLogoError('Logo konnte nicht gelesen werden (DataURL).');
            return;
          }

          clearLogoError();
          setFormData(prev => ({
            ...prev,
            logo_base64: result.slice(commaIndex + 1),
            logo_mime: file.type,
            logo_filename: file.name
          }));
        } catch (err) {
          setLogoError(err?.message || 'Logo konnte nicht verarbeitet werden.');
        }
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
    setErrorDetail('');
    
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        setMessage('error');
        setErrorDetail('Backend-URL fehlt: VITE_GOOGLE_SCRIPT_URL ist nicht gesetzt.');
        return;
      }

      // Backward-compatible Payload (unterstützt alte + optimierte Apps-Script Version)
      const payload = {
        ...formData,

        // Legacy keys (google-apps-script.gs)
        firmenname: formData.company_name,
        email: formData.contact_email,
        telefon: formData.contact_phone,
        ansprechpartner: formData.contact_person,
        standort: [formData.company_city, formData.company_country].filter(Boolean).join(', '),
        mitarbeiteranzahl: formData.employee_count,
        branche: formData.company_type,
        kundengruppen: Array.isArray(formData.customer_groups) ? formData.customer_groups.join(', ') : formData.customer_groups,
        geltungsbereich: formData.scope_text,
        hat_entwicklung: formData.has_development,
        hat_pruefmittel: formData.has_measurement,
        ist_dienstleister: formData.has_outsourcing
      };

      // IMPORTANT: Google Apps Script web apps often fail CORS preflight.
      // Using a "simple" request (text/plain) avoids the OPTIONS preflight.
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      let result;
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(
          `Backend-Antwort ist nicht JSON (HTTP ${response.status}). ` +
            `Prüfe Apps Script Deployment (Zugriff: Jeder) und URL. Antwort: ${text.slice(0, 200)}`
        );
      }

      if (!response.ok) {
        throw new Error(result?.error || result?.message || `HTTP ${response.status}`);
      }

      if (result?.success) {
        setMessage('success');
      } else {
        setMessage('error');
        setErrorDetail(result?.error || result?.message || 'Unbekannter Fehler im Backend.');
      }
    } catch (error) {
      console.error('Fehler:', error);
      setMessage('error');
      const rawMessage = error?.message || String(error);
      if (rawMessage === 'Failed to fetch') {
        setErrorDetail(
          'Failed to fetch (Netzwerk/CORS). Prüfe: (1) VITE_GOOGLE_SCRIPT_URL ist korrekt (endet meist auf /exec), (2) Apps Script Deployment: Zugriff = Jeder, (3) du nutzt HTTPS, (4) kein AdBlock/Tracking-Blocker, (5) Script ist erreichbar.'
        );
      } else {
        setErrorDetail(rawMessage);
      }
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
                  className={errors.logo_base64 ? 'error' : ''}
                />
                {formData.logo_base64 && <span className="file-uploaded">✓ Logo hochgeladen</span>}
                {errors.logo_base64 && <span className="error-text">{errors.logo_base64}</span>}
                <small>PNG/JPG. Große Dateien werden automatisch verkleinert.</small>
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
                    onChange={(e) => setFormData(prev => ({ ...prev, has_outsourcing: false, outsourced_details: '' }))}
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

            {/* Conditional: Welche Prozesse ausgelagert? */}
            {formData.has_outsourcing === true && (
              <div className="form-group conditional-field">
                <label className="section-label">
                  Welche Prozesse werden ausgelagert?
                  <span className="required">*</span>
                </label>
                <p className="help-text">
                  z.B. "Fertigung von Bauteilen", "IT-Support", "Logistik und Versand"
                </p>
                <textarea
                  value={formData.outsourced_details || ''}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, outsourced_details: e.target.value }))
                  }
                  placeholder="Beschreiben Sie welche Prozesse ausgelagert werden und an wen (z.B. 'Fertigung von Metallteilen an ABC GmbH')..."
                  rows={4}
                  maxLength={500}
                  required
                />
                <span className="char-count">
                  {formData.outsourced_details?.length || 0} / 500 Zeichen
                </span>
              </div>
            )}
            
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
          {errorDetail && (
            <p style={{ marginTop: '10px', fontSize: '13px', opacity: 0.9 }}>
              <strong>Technische Details:</strong> {errorDetail}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
