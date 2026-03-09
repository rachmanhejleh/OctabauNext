import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function Projekte({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const projekte = dict.projectsPage.projectsList;


    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <h1>{dict.projectsPage.heroTitle}</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
                        {dict.projectsPage.heroSubtitle}
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="grid grid-cols-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {projekte.map((projekt: any) => (
                            <div key={projekt.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '350px', position: 'relative' }}>
                                    <Image src={projekt.image} alt={projekt.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', fontWeight: 600 }}>{projekt.type}</span>
                                    <h2 style={{ fontSize: '1.75rem', marginTop: '0.5rem', marginBottom: '1rem' }}>{projekt.title}</h2>
                                    <p style={{ marginBottom: '2rem' }}>{projekt.beschreibung}</p>
                                    <Link href={`/${lang}/projekte/${projekt.slug}`} className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}>
                                        {lang === 'de' ? 'Details ansehen' : lang === 'en' ? 'View Details' : 'عرض التفاصيل'}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>{dict.projectsPage.ctaTitle}</h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                        {dict.projectsPage.ctaSubtitle}
                    </p>
                    <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'black' }}>
                        {dict.projectsPage.ctaButton}
                    </Link>
                </div>
            </section>
        </div>
    );
}
