import Link from 'next/link';
import { getCategories } from '@/data/services';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function LeistungenOverview({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const categories = getCategories();
    const dict = await getDictionary(lang as Locale);

    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <h1 style={{ color: 'white' }}>{dict.leistungenPage.heroTitle}</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>
                        {dict.leistungenPage.heroSubtitle}
                    </p>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
                        {categories.map((category, index) => (
                            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: index % 2 === 0 ? 'var(--secondary)' : 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                                {category.image && (
                                    <div style={{ position: 'relative', height: '250px', width: '100%' }}>
                                        <img src={category.image} alt={category.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                )}
                                <div style={{ padding: '3rem' }}>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                        {dict.services[category.slug as keyof typeof dict.services]?.title || category.title}
                                    </h2>
                                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                                        {dict.services[category.slug as keyof typeof dict.services]?.description || category.description}
                                    </p>

                                    <Link href={`/${lang}/leistungen/${category.slug}`} className="btn btn-primary">
                                        {dict.leistungenPage.detailsButton}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', borderTop: '1px solid var(--border)' }}>
                <div className="container text-center">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{dict.leistungenPage.serviceTitle}</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
                        {dict.leistungenPage.serviceText}
                    </p>
                    <Link href={`/${lang}/kontakt`} className="btn btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        {dict.leistungenPage.serviceButton}
                    </Link>
                </div>
            </section>
        </div>
    );
}
