import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities } from '@/data/cities';
import { getCategories } from '@/data/services';
import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

type Props = {
    params: Promise<{ lang: string; state: string; city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: citySlug, state: stateSlug } = await params;
    const city = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);

    if (!city) {
        return { title: 'Standort nicht gefunden | Octabau' };
    }

    return {
        title: `Bauunternehmen in ${city.name} | Octabau`,
        description: `Ihr professionelles Bauunternehmen für Großprojekte und gewerblichen Bau in ${city.name} und der Region ${city.region}.`,
    };
}

export async function generateStaticParams() {
    // Only pre-build the first 5 cities to save build time.
    // The rest of the 2,000+ cities are generated on-demand.
    return cities.slice(0, 5).flatMap((city) => (
        ['de', 'en', 'ar'].map(lang => ({
            lang,
            state: city.regionSlug,
            city: city.slug,
        }))
    ));
}

export default async function CityPage({ params }: Props) {
    const { lang, city: citySlug, state: stateSlug } = await params;
    const cityData = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);
    const dict = await getDictionary(lang as Locale);

    if (!cityData) {
        notFound();
    }

    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15 }}>
                    <img
                        src="/images/hero.png"
                        alt="Stadtlandschaft"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
                        <Link href={`/${lang}/einsatzgebiet`} style={{ textDecoration: 'none', color: 'inherit' }}>{dict.seoPages.locations}</Link>
                        <span>&gt;</span>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{cityData.region}</Link>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                        {dict.cityPage.heroTitle} {cityData.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--secondary-foreground)', maxWidth: '800px' }}>
                        {dict.cityPage.heroDesc1} {cityData.name} {dict.cityPage.heroDesc2} {cityData.region} {dict.cityPage.heroDesc3}
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                            {dict.cityPage.buildIn} {cityData.name} {dict.cityPage.withOctabau}
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            {dict.cityPage.p1_1} {cityData.name} {dict.cityPage.p1_2}
                        </p>
                        <p>
                            {dict.cityPage.p2}
                        </p>

                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <strong>{dict.cityPage.localExpertise}</strong>
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{dict.cityPage.localExpertiseDesc} {cityData.region}.</p>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <strong>{dict.cityPage.strongNetwork}</strong>
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{dict.cityPage.strongNetworkDesc} {cityData.name}.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'white' }}>{dict.cityPage.ourServicesIn} {cityData.name}</h3>

                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
                            {getCategories().map(category => (
                                <li key={category.id} style={{ paddingLeft: '2rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>&rarr;</span>
                                    <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}/${cityData.slug}/${category.slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '1.1rem' }}>
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem' }}>
                            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                                {dict.cityPage.discussInfo} {cityData.name} {dict.cityPage.discussInfo2}
                            </p>
                            <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', width: '100%' }}>
                                {dict.cityPage.requestConsultation}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
