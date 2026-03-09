import Link from 'next/link';
import { cities } from '@/data/cities';
import CitySearchBox from '@/components/CitySearchBox';
import type { Metadata } from 'next';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export const metadata: Metadata = {
    title: 'Unsere Einsatzgebiete nach Bundesland | Octabau',
    description: 'Octabau realisiert Bauprojekte in ganz Deutschland. Wählen Sie Ihr Bundesland, um regionale Ansprechpartner und Standorte zu finden.',
};

export default async function EinsatzgebietOverview({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    // Extract unique states from the cities array
    const uniqueStatesMap = new Map();
    cities.forEach(city => {
        if (!uniqueStatesMap.has(city.regionSlug)) {
            uniqueStatesMap.set(city.regionSlug, {
                name: city.region,
                slug: city.regionSlug
            });
        }
    });

    const states = Array.from(uniqueStatesMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <h1>{dict.regionsPage.heroTitle}</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto 2rem', fontSize: '1.25rem' }}>
                        {dict.regionsPage.heroSubtitle}
                    </p>
                    <div style={{ marginTop: '2.5rem' }}>
                        <CitySearchBox lang={lang} dict={dict.citySearchBox} />
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="grid grid-cols-4" style={{ gap: '2rem' }}>
                        {states.map((state) => (
                            <Link
                                key={state.slug}
                                href={`/${lang}/einsatzgebiet/${state.slug}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '2rem 1.5rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'all 0.2s ease',
                                    backgroundColor: 'white'
                                }}
                                className="state-card"
                            >
                                <h2 style={{ fontSize: '1.25rem', marginBottom: 0 }}>{state.name}</h2>
                                <span style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>&rarr;</span>
                            </Link>
                        ))}
                    </div>

                    <div style={{ marginTop: '5rem', backgroundColor: 'var(--primary)', color: 'white', padding: '4rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>{dict.regionsPage.nationalProject}</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'rgba(255,255,255,0.8)' }}>
                            {dict.regionsPage.nationalDesc}
                        </p>
                        <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                            {dict.regionsPage.nationalBtn}
                        </Link>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .state-card:hover {
          border-color: var(--primary) !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
      `}} />
        </div>
    );
}
