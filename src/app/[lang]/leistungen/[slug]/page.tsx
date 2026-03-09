import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getSubServices, getCategories, servicesData } from '@/data/services';
import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return { title: 'Leistung nicht gefunden | Octabau' };
    }

    return {
        title: `${service.title} | Octabau Leistungen`,
        description: service.description,
    };
}

export async function generateStaticParams() {
    return servicesData.flatMap((service) => (
        ['de', 'en', 'ar'].map(lang => ({
            lang,
            slug: service.slug,
        }))
    ));
}

export default async function ServicePage({ params }: Props) {
    const { lang, slug } = await params;
    const service = getServiceBySlug(slug);
    const dict = await getDictionary(lang as Locale);

    if (!service) {
        notFound();
    }

    const isCategory = service.isCategory;
    const subServices = isCategory ? getSubServices(service.slug) : [];

    // If it's a sub-service, we might want to show its parent category
    const parentCategory = !isCategory && service.parentCategorySlug
        ? getServiceBySlug(service.parentCategorySlug)
        : null;

    return (
        <div>
            {/* Hero Section for the Service */}
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        {parentCategory && (
                            <Link
                                href={`/${lang}/leistungen/${parentCategory.slug}`}
                                style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}
                            >
                                &larr; {dict.common.readMore.replace('...', '')} {dict.services[parentCategory.slug as keyof typeof dict.services]?.title || parentCategory.title}
                            </Link>
                        )}
                        {!parentCategory && (
                            <Link
                                href={`/${lang}/leistungen`}
                                style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}
                            >
                                &larr; {dict.leistungenPage.title}
                            </Link>
                        )}
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {dict.services[service.slug as keyof typeof dict.services]?.title || service.title}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--secondary-foreground)' }}>
                            {dict.services[service.slug as keyof typeof dict.services]?.description || service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="section-padding">
                <div className="container grid grid-cols-2" style={{ gap: '4rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                            {isCategory ? 'Umfassende Expertise in dieser Bauphase' : 'Professionelle Ausführung für Ihr Projekt'}
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Als Experten für Großprojekte wissen wir, dass {dict.services[service.slug as keyof typeof dict.services]?.title || service.title} eine präzise Planung und Ausführung erfordert. Wir setzen auf modernste Techniken, hochwertige Materialien und ein bestens geschultes Team, um höchste Qualitätsstandards zu gewährleisten.
                        </p>
                        <p>
                            Egal ob für industrielle Anlagen, gewerbliche Komplexe oder öffentliche Bauten – Octabau ist Ihr zuverlässiger Partner. Wir integrieren diese Leistung nahtlos in den Gesamtablauf Ihres Bauvorhabens.
                        </p>

                        <ul style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                                Termingerechte Ausführung
                            </li>
                            <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                                Fachgerechte Qualitätskontrolle
                            </li>
                            <li style={{ paddingLeft: '1.5rem', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                                Transparente Kostenstruktur
                            </li>
                        </ul>
                    </div>

                    <div>
                        {/* If Category: Show Grid of Sub-Services */}
                        {isCategory && subServices.length > 0 && (
                            <div style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', padding: '2.5rem', borderRadius: 'var(--radius-sm)' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Spezialisierte Fachbereiche</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {subServices.map(sub => (
                                        <Link key={sub.id} href={`/${lang}/leistungen/${sub.slug}`} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', transition: 'background-color 0.2s', alignItems: 'center' }}>
                                            {sub.image && (
                                                <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                                                    <img src={sub.image} alt={sub.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--foreground)' }}>
                                                    {dict.services[sub.slug as keyof typeof dict.services]?.title || sub.title}
                                                </strong>
                                                <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                                    {dict.services[sub.slug as keyof typeof dict.services]?.description || sub.description}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* If Sub-Service: Show Contact/CTA box */}
                        {!isCategory && (
                            <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'white' }}>{dict.categoryPage.planProj.replace('...', '')}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                                    {dict.categoryPage.talkWithUs}
                                </p>
                                <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', width: '100%' }}>
                                    {dict.leistungenPage.serviceButton}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
