import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities } from '@/data/cities';
import { getCategories, getServiceBySlug } from '@/data/services';
import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

type Props = {
    params: Promise<{ lang: string; state: string; city: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: citySlug, state: stateSlug, category: categorySlug } = await params;
    const city = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);
    const category = getServiceBySlug(categorySlug);

    if (!city || !category || !category.isCategory) {
        return { title: 'Nicht gefunden | Octabau' };
    }

    return {
        title: `${category.title} in ${city.name} | Octabau`,
        description: `Octabau ist Ihr professioneller Partner für ${category.title} in ${city.name} und Umgebung. Entdecken Sie unsere Leistungen.`,
    };
}

export async function generateStaticParams() {
    const params: { lang: string; state: string; city: string; category: string }[] = [];
    const categories = getCategories();

    // Only pre-build the top 5 cities, the rest are generated on-demand.
    const topCities = cities.slice(0, 5);

    for (const city of topCities) {
        for (const cat of categories) {
            for (const lang of ['de', 'en', 'ar']) {
                params.push({ lang, state: city.regionSlug, city: city.slug, category: cat.slug });
            }
        }
    }
    return params;
}

export default async function CityCategoryPage({ params }: Props) {
    const { lang, city: citySlug, state: stateSlug, category: categorySlug } = await params;
    const dict = await getDictionary(lang as Locale);

    const cityData = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);
    const categoryData = getServiceBySlug(categorySlug);

    if (!cityData || !categoryData || !categoryData.isCategory) {
        notFound();
    }

    // Get sub-services for this category
    const { getSubServices } = await import('@/data/services');
    const subServices = getSubServices(categoryData.slug);

    return (
        <div>
            {/* Hero Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', paddingTop: '8rem', paddingBottom: '4rem', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
                    <img
                        src={categoryData.image || "/images/generic.png"}
                        alt={categoryData.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{cityData.region}</Link>
                        <span>&gt;</span>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}/${cityData.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{cityData.name}</Link>
                        <span>&gt;</span>
                        <span style={{ color: 'white' }}>{categoryData.title}</span>
                    </div>

                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: 1.1 }}>
                        {categoryData.title} {dict.categoryPage.in} {cityData.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px' }}>
                        {dict.categoryPage.heroDesc1} {categoryData.title}{dict.categoryPage.heroDesc2} {cityData.name}.
                    </p>
                </div>
            </section>

            {/* General Description */}
            <section className="section-padding">
                <div className="container grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{dict.categoryPage.regExpertise} {cityData.name}</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--secondary-foreground)' }}>
                            {categoryData.description}
                        </p>
                        <p style={{ color: 'var(--secondary-foreground)' }}>
                            {dict.categoryPage.trustDesc} {cityData.name}{dict.categoryPage.trustDesc2} {categoryData.title}{dict.categoryPage.trustDesc3}
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'var(--secondary)', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{dict.categoryPage.whyTitle} {cityData.name}?</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>01</span>
                                <span>{dict.categoryPage.why1}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>02</span>
                                <span>{dict.categoryPage.why2} {cityData.region}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>03</span>
                                <span>{dict.categoryPage.why3}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Sub Services */}
            {subServices.length > 0 && (
                <section className="section-padding" style={{ backgroundColor: 'var(--secondary)' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{dict.categoryPage.specServices}</h2>
                                <p style={{ color: 'var(--secondary-foreground)', maxWidth: '600px', fontSize: '1.1rem' }}>
                                    {dict.categoryPage.chooseDetail} {cityData.name}.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3">
                            {subServices.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={`/${lang}/einsatzgebiet/${cityData.regionSlug}/${cityData.slug}/${categoryData.slug}/${sub.slug}`}
                                    style={{
                                        display: 'block',
                                        padding: '2rem',
                                        backgroundColor: 'white',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        textDecoration: 'none',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        color: 'inherit'
                                    }}
                                    className="service-card"
                                >
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{sub.title}</h3>
                                    <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                        {sub.description}
                                    </p>
                                    <span style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {dict.categoryPage.detailsFor} {cityData.name} &rarr;
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="section-padding">
                <div className="container text-center">
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '5rem 2rem', borderRadius: 'var(--radius-sm)' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>{dict.categoryPage.planProj} {categoryData.title} {dict.categoryPage.in} {cityData.name}?</h2>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            {dict.categoryPage.talkWithUs}
                        </p>
                        <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                            {dict.categoryPage.requestNow} {cityData.name}
                        </Link>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-color: var(--primary) !important;
        }
      `}} />
        </div>
    );
}
