import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function Kontakt({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <h1>{dict.contactPage.heroTitle}</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.25rem' }}>
                        {dict.contactPage.heroSubtitle}
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container grid grid-cols-2">
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{dict.contactPage.officeTitle}</h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.contactPage.hq}</h3>
                            <p className="text-muted">
                                Octabau GmbH<br />
                                Musterstraße 123<br />
                                12345 Musterstadt<br />
                                Deutschland
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.contactPage.communication}</h3>
                            <p className="text-muted">
                                Telefon: +49 (0) 123 456789<br />
                                Telefax: +49 (0) 123 456790<br />
                                E-Mail: info@octabau.de
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{dict.contactPage.hours}</h3>
                            <p className="text-muted">
                                {dict.contactPage.hoursText1}<br />
                                {dict.contactPage.hoursText2}
                            </p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '3rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{dict.contactPage.formTitle}</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="name" style={{ fontWeight: 500, fontSize: '0.9rem' }}>{dict.contactPage.nameLabel}</label>
                                    <input type="text" id="name" style={{ padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="email" style={{ fontWeight: 500, fontSize: '0.9rem' }}>{dict.contactPage.emailLabel}</label>
                                    <input type="email" id="email" style={{ padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="subject" style={{ fontWeight: 500, fontSize: '0.9rem' }}>{dict.contactPage.subjectLabel}</label>
                                <select id="subject" style={{ padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'white' }}>
                                    <option>{dict.contactPage.subjectOptions.commercial}</option>
                                    <option>{dict.contactPage.subjectOptions.public}</option>
                                    <option>{dict.contactPage.subjectOptions.residential}</option>
                                    <option>{dict.contactPage.subjectOptions.other}</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="message" style={{ fontWeight: 500, fontSize: '0.9rem' }}>{dict.contactPage.messageLabel}</label>
                                <textarea id="message" rows={5} style={{ padding: '0.8rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', resize: 'vertical' }}></textarea>
                            </div>

                            <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                {dict.contactPage.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
