import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import { notFound } from 'next/navigation';

export default async function ProjectDetail({
    params
}: {
    params: Promise<{ lang: string, slug: string }>
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const project = dict.projectsPage.projectsList.find((p: any) => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Reuse general translations for the layout
    const t = dict.leistungenPage;

    return (
        <div>
            {/* Hero Section */}
            <section style={{ position: 'relative', backgroundColor: 'var(--secondary)', color: 'var(--primary-foreground)', padding: '8rem 0 5rem 0', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 0, opacity: 0.2 }}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '48rem' }}>
                        <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {project.type}
                        </span>
                        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            {project.title}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)' }}>
                            {project.beschreibung}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-padding py-16">
                <div className="container">

                    {/* Project Statistics Bar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', backgroundColor: 'var(--background)', borderRadius: '1rem', padding: '2.5rem', marginBottom: '6rem', boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1)', border: '1px solid var(--border)', marginTop: '2rem', position: 'relative', zIndex: 20 }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '2.25rem', fontWeight: 300, color: 'var(--primary)', marginBottom: '0.5rem' }}>{project.duration || '-'}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{lang === 'de' ? 'Dauer' : lang === 'en' ? 'Duration' : 'المدة'}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '2.25rem', fontWeight: 300, color: 'var(--primary)', marginBottom: '0.5rem' }}>{project.workers || '-'}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{lang === 'de' ? 'Personal' : lang === 'en' ? 'Team' : 'العمال'}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '2.25rem', fontWeight: 300, color: 'var(--primary)', marginBottom: '0.5rem' }}>{project.area || '-'}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{lang === 'de' ? 'Fläche' : lang === 'en' ? 'Area' : 'المساحة'}</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '2.25rem', fontWeight: 300, color: 'var(--primary)', marginBottom: '0.5rem' }}>{project.type ? project.type.split('/')[0].trim() : '-'}</span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{lang === 'de' ? 'Typ' : lang === 'en' ? 'Type' : 'النوع'}</span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'flex-start', marginBottom: '5rem' }}>
                        {/* Text column */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem' }}>{project.title}</h2>
                            <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', marginBottom: '2rem', lineHeight: 1.75 }}>
                                {project.beschreibung}
                            </p>

                            <hr style={{ margin: '2rem 0', borderColor: 'var(--border)' }} />

                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{dict.homePage.whyTitle}</h3>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ minWidth: '24px', color: 'var(--primary)', marginRight: lang === 'ar' ? '0' : '0.75rem', marginLeft: lang === 'ar' ? '0.75rem' : '0', marginTop: '0.25rem', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <div>
                                        <span style={{ fontWeight: 600, display: 'block' }}>{dict.aboutus?.qualityTitle || 'Qualität'}</span>
                                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{dict.aboutus?.qualityText || 'Höchste Standards'}</span>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ minWidth: '24px', color: 'var(--primary)', marginRight: lang === 'ar' ? '0' : '0.75rem', marginLeft: lang === 'ar' ? '0.75rem' : '0', marginTop: '0.25rem', flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <div>
                                        <span style={{ fontWeight: 600, display: 'block' }}>{dict.aboutus?.stats?.punctuality || 'Pünktlichkeit'}</span>
                                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{lang === 'de' ? 'Wir übergeben pünktlich' : lang === 'en' ? 'Punctual Handover' : 'التسليم في الموعد بدقة'}</span>
                                    </div>
                                </li>
                            </ul>

                            <div style={{ marginTop: '1rem' }}>
                                <Link href={`/${lang}/kontakt`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.125rem', padding: '1rem 2rem' }}>
                                    {dict.projectsPage.planSimilar}
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ minWidth: '20px', marginLeft: lang === 'ar' ? '0' : '0.5rem', marginRight: lang === 'ar' ? '0.5rem' : '0', transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Main Image */}
                        <div style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Image Gallery Grid */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', textAlign: 'center' }}>{lang === 'de' ? 'Projektgalerie' : lang === 'en' ? 'Project Gallery' : 'معرض الصور'}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                {project.gallery.map((imgSrc: string, idx: number) => {
                                    return (
                                        <div key={idx} style={{ position: 'relative', height: '350px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.15)' }}>
                                            <Image
                                                src={imgSrc}
                                                alt={`${project.title} Detail ${idx + 1}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6rem 0', margin: '4rem 0' }}>
                <div className="container max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{dict.projectsPage.ctaTitle}</h2>
                    <p className="text-xl mb-10 text-primary-foreground/80 opacity-90">
                        {dict.projectsPage.ctaSubtitle}
                    </p>
                    <Link href={`/${lang}/kontakt`} className="btn btn-outline bg-white text-primary hover:bg-gray-100 text-lg px-10 py-4" style={{ backgroundColor: 'white', color: 'black' }}>
                        {dict.projectsPage.ctaButton}
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Generate static params so the dynamic pages are pre-built (SSG)
export async function generateStaticParams() {
    const i18nConfig = await import('@/i18n-config');
    const locales = i18nConfig.i18n.locales;
    const { getDictionary } = await import('@/get-dictionary');

    const params: { lang: string; slug: string }[] = [];

    // The slugs are the same across languages based on the keys we put into projectsList
    // But evaluating german dict is easiest
    const dictDe = await getDictionary('de');
    const projects = dictDe.projectsPage.projectsList;

    locales.forEach((locale) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        projects.forEach((proj: any) => {
            if (proj.slug) {
                params.push({ lang: locale, slug: proj.slug });
            }
        });
    });

    return params;
}
