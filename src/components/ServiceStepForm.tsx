"use client";

import { useState, useMemo, useEffect } from 'react';
import { servicesData } from '@/data/services';

type StepFormData = {
    selectedService: string;
    q1: string;
    q2: string;
    q3: string;
    timeline: string;
    company: string;
    name: string;
    email: string;
    phone: string;
};

const getQuestionSet = (serviceSlug: string) => {
    const s = servicesData.find(s => s.slug === serviceSlug);
    const parent = s?.parentCategorySlug || '';

    if (parent === 'ausbau-gestaltung') {
        return {
            title: "Objektdetails & Ausbau",
            q1: { label: "Ungefähre Fläche in m²", options: ["< 50 m²", "50 - 200 m²", "200 - 500 m²", "> 500 m²"] },
            q2: { label: "Gebäudezustand", options: ["Neubau", "Altbausanierung", "Gewerbe im Bestand"] },
            q3: { label: "Besondere Anforderungen", options: ["Brandschutz (z.B. F90)", "Schallschutz / Akustik", "Spezielle Klimaanforderungen", "Keine Besonderheiten"] }
        };
    } else if (parent === 'rueckbau-vorbereitung') {
        return {
            title: "Angaben zum Rückbau",
            q1: { label: "Art des Bauwerks", options: ["Einfamilienhaus / Privat", "Mehrfamilienhaus / Block", "Industrie / Gewerbehalle", "Öffentlicher Bau"] },
            q2: { label: "Schadstoffbelastung bekannt?", options: ["Keine Schadstoffe vermutet", "Ja, Schadstoffe vorhanden (z.B. Asbest)", "Muss von Octabau geprüft werden"] },
            q3: { label: "Maschinenzugänglichkeit", options: ["Frei zugänglich für schweres Gerät", "Beengte Platzverhältnisse", "Kein Maschinen-Zugang möglich (Handabbruch)"] }
        };
    } else if (parent === 'logistik-transport-service') {
        return {
            title: "Logistik & Transportanforderungen",
            q1: { label: "Dauer der Leistung", options: ["Einmaliger Einsatz", "1 bis 3 Monate", "Längerfristig (> 3 Monate)"] },
            q2: { label: "Baustellenumgebung", options: ["Innenstadt (beengt/eingeschränkt)", "Industrieanlage / Großbaustelle", "Sicherheitsbereich"] },
            q3: { label: "Benötigte Ausstattung", options: ["Nur Personal", "Transportfahrzeuge (Sprinter/LKW)", "Schwerlast / Hebewerkzeuge", "Noch unklar"] }
        };
    } else if (parent === 'projektvorbereitung-planung') {
        return {
            title: "Planungsstand des Projekts",
            q1: { label: "Aktuelle Bauphase", options: ["Ideenfindung / Konzept", "Planung abgeschlossen (LPH 5)", "Bau läuft bereits", "Sanierung im Bestand"] },
            q2: { label: "Komplexitätsgrad", options: ["Standard Gewerbebau", "Hochkomplexer Spezialbau", "Öffentliche Ausschreibung"] },
            q3: { label: "Art des Auftraggebers", options: ["Gewerblich", "Öffentliche Hand", "Industrie", "Privat (Großprojekt)"] }
        };
    } else if (parent === 'uebergabe-reinigung-betreuung') {
        return {
            title: "Reinigungs- & Übergabedetails",
            q1: { label: "Betroffene Nutzfläche", options: ["< 500 m²", "500 - 2000 m²", "2000 - 5000 m²", "> 5000 m²"] },
            q2: { label: "Art der Verschmutzung", options: ["Standard Bauendreinigung", "Starke Verschmutzung (Farbe/Kleber etc.)", "Sonderreinigung / Fassade"] },
            q3: { label: "Dienstleistungs-Turnus", options: ["Einmalige Bauendreinigung", "Baubegleitende Zwischenreinigung", "Regelmäßige Unterhaltsreinigung"] }
        };
    } else {
        // Fallback
        return {
            title: "Spezifische Projektdaten",
            q1: { label: "Projektumfang", options: ["Klein", "Mittel", "Großprojekt"] },
            q2: { label: "Ist die Planung abgeschlossen?", options: ["Ja", "Nein", "Teilweise"] },
            q3: { label: "Art des Auftraggebers", options: ["Gewerblich", "Öffentliche Hand", "Industrie", "Privat"] }
        };
    }
};

export default function ServiceStepForm({ initialServiceSlug = 'innenausbau' }: { initialServiceSlug?: string }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<StepFormData>({
        selectedService: initialServiceSlug,
        q1: '',
        q2: '',
        q3: '',
        timeline: '',
        company: '',
        name: '',
        email: '',
        phone: ''
    });

    // Reset handled natively in onChange now

    const updateData = (field: keyof StepFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 5));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted dynamically:", formData);
        setStep(5);
    };

    const progressPercentage = ((step - 1) / 4) * 100;

    const allSelectableServices = useMemo(() => {
        return servicesData.filter(s => !s.isCategory).sort((a, b) => a.title.localeCompare(b.title));
    }, []);

    const selectedServiceData = useMemo(() => {
        return servicesData.find(s => s.slug === formData.selectedService) || servicesData[0];
    }, [formData.selectedService]);

    const activeQuestions = useMemo(() => {
        return getQuestionSet(formData.selectedService);
    }, [formData.selectedService]);

    return (
        <div style={{
            background: 'white',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border)'
        }}>
            {/* Progress Bar */}
            {step < 5 && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--secondary)' }}>
                    <div style={{
                        height: '100%',
                        background: 'var(--primary)',
                        width: `${progressPercentage}%`,
                        transition: 'width 0.4s ease'
                    }} />
                </div>
            )}

            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 600 }}>
                    Kostenlose Ersteinschätzung
                </span>
                <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Projektanfrage Octabau</h2>
                {step < 5 && <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Schritt {step} von 4</p>}
            </div>

            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>

                {/* Step 1: Select Service */}
                {step === 1 && (
                    <div className="animation-fade-in">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Welche Bauleistung benötigen Sie primär?</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--muted)' }}>Gewünschte Leistungklasse</label>
                            <select
                                value={formData.selectedService}
                                onChange={(e) => {
                                    updateData('selectedService', e.target.value);
                                    setFormData(prev => ({ ...prev, q1: '', q2: '', q3: '' }));
                                }}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--border)',
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    backgroundColor: '#f8f9fa',
                                    fontWeight: 500
                                }}
                            >
                                {allSelectableServices.map(service => (
                                    <option key={service.slug} value={service.slug}>
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--secondary-foreground)' }}>
                                {selectedServiceData.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Dynamic Questions */}
                {step === 2 && (
                    <div className="animation-fade-in">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Eckdaten für &quot;{selectedServiceData.title}&quot;</h3>
                        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Damit unsere Projektleiter eine fachgerechte Kalkulation erstellen können, benötigen wir folgende projektspezifische Angaben.
                        </p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>1. {activeQuestions.q1.label}</label>
                            <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                                {activeQuestions.q1.options.map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => updateData('q1', opt)}
                                        style={{
                                            padding: '0.8rem',
                                            border: `2px solid ${formData.q1 === opt ? 'var(--primary)' : 'var(--border)'}`,
                                            background: formData.q1 === opt ? '#f0f0f0' : 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>2. {activeQuestions.q2.label}</label>
                            <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                                {activeQuestions.q2.options.map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => updateData('q2', opt)}
                                        style={{
                                            padding: '0.8rem',
                                            border: `2px solid ${formData.q2 === opt ? 'var(--primary)' : 'var(--border)'}`,
                                            background: formData.q2 === opt ? '#f0f0f0' : 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>3. {activeQuestions.q3.label}</label>
                            <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
                                {activeQuestions.q3.options.map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => updateData('q3', opt)}
                                        style={{
                                            padding: '0.8rem',
                                            border: `2px solid ${formData.q3 === opt ? 'var(--primary)' : 'var(--border)'}`,
                                            background: formData.q3 === opt ? '#f0f0f0' : 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Timeline */}
                {step === 3 && (
                    <div className="animation-fade-in">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Gesamter Zeitplan</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Gewünschter Baubeginn / Einsatzstart</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['Asap / Schnellstmöglich', 'In 1 bis 3 Monaten', 'In 3 bis 6 Monaten', 'Noch nicht absehbar / Ausschreibungsphase'].map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => updateData('timeline', time)}
                                        style={{
                                            padding: '1rem',
                                            border: `2px solid ${formData.timeline === time ? 'var(--primary)' : 'var(--border)'}`,
                                            background: formData.timeline === time ? '#f0f0f0' : 'white',
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            transition: 'all 0.2s ease',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                    <div className="animation-fade-in">
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Kontaktdaten für die Angebotserfassung</h3>
                        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Wir bearbeiten Großprojekte diskret. Ihre Angaben werden vertraulich behandelt und direkt an unsere Projektleitung übergeben.
                        </p>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Firma / Institution</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => updateData('company', e.target.value)}
                                    placeholder="Ihre Firma GmbH"
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Ansprechpartner *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => updateData('name', e.target.value)}
                                    placeholder="Vorname Nachname"
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>E-Mail *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => updateData('email', e.target.value)}
                                    placeholder="name@firma.de"
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Telefon Rückruf</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateData('phone', e.target.value)}
                                    placeholder="+49 000 000000"
                                    style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                    <div className="animation-fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ width: '80px', height: '80px', background: '#e6f4ea', color: '#137333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
                            ✓
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Anfrage erfolgreich empfangen!</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                            Wir danken Ihnen für das Vertrauen in Octabau. Unsere technischen Projektleiter berechnen nun intern anhand Ihrer Angaben ({selectedServiceData.title}) die Eckdaten und kontaktieren Sie zeitnah für den weiteren Ablauf.
                        </p>
                    </div>
                )}

                {/* Navigation Buttons */}
                {step < 5 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                style={{ padding: '0.8rem 1.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}
                            >
                                Zurück
                            </button>
                        ) : (
                            <div></div>
                        )}

                        <button
                            type="submit"
                            style={{ padding: '0.8rem 2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}
                            disabled={
                                (step === 2 && (!formData.q1 || !formData.q2 || !formData.q3)) ||
                                (step === 3 && !formData.timeline)
                            }
                        >
                            {step === 4 ? 'Angebot für Sie berechnen lassen' : 'Weiter'}
                        </button>
                    </div>
                )}
            </form>

            <style dangerouslySetInnerHTML={{
                __html: `
                .animation-fade-in {
                    animation: fadeIn 0.4s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
}
