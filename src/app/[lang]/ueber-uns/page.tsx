import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function UeberUns({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem' }}>
                <div className="container text-center">
                    <h1>{dict.aboutus.heroTitle}</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
                        {dict.aboutus.heroSubtitle}
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container grid grid-cols-2" style={{ alignItems: 'center' }}>
                    <div style={{ height: '500px', position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                        <img
                            src="/images/about.png"
                            alt="Octabau Team und Baustelle"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ paddingLeft: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{dict.aboutus.visionTitle}</h2>
                        <p>
                            {dict.aboutus.visionText1}
                        </p>
                        <p>
                            {dict.aboutus.visionText2}
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
                            <div>
                                <strong style={{ fontSize: '2.5rem', display: 'block' }}>15+</strong>
                                <span className="text-muted">{dict.aboutus.stats.years}</span>
                            </div>
                            <div>
                                <strong style={{ fontSize: '2.5rem', display: 'block' }}>250+</strong>
                                <span className="text-muted">{dict.aboutus.stats.projects}</span>
                            </div>
                            <div>
                                <strong style={{ fontSize: '2.5rem', display: 'block' }}>100%</strong>
                                <span className="text-muted">{dict.aboutus.stats.punctuality}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>{dict.aboutus.qualityTitle}</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.8)' }}>
                        {dict.aboutus.qualityText}
                    </p>
                    <div className="grid grid-cols-4" style={{ gap: '1rem', opacity: '0.7' }}>
                        <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>ISO 9001</div>
                        <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>DGNB Zertifiziert</div>
                        <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>TÜV Geprüft</div>
                        <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>VOB/A</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
