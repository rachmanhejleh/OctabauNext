"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cities } from '@/data/cities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StateClient({ stateSlug, lang, dict }: { stateSlug: string, lang: string, dict: any }) {
    // Find cities belonging to this state
    const stateCities = useMemo(() => {
        return cities.filter(city => city.regionSlug === stateSlug)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [stateSlug]);

    const stateName = stateCities.length > 0 ? stateCities[0].region : 'Bundesland';

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCities = stateCities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (stateCities.length === 0) {
        return (
            <div className="section-padding container text-center" style={{ paddingTop: '8rem' }}>
                <div className="section-padding container text-center" style={{ paddingTop: '8rem' }}>
                    <h1>{dict.seoPages.stateNotFound}</h1>
                    <Link href={`/${lang}/einsatzgebiet`} className="btn btn-primary" style={{ marginTop: '2rem' }}>{dict.seoPages.backToOverview}</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <section className="section-padding" style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Link href={`/${lang}/einsatzgebiet`} style={{ textDecoration: 'none', color: 'inherit' }}>{dict.seoPages.locations}</Link>
                        <span>&gt;</span>
                        <span style={{ color: 'var(--primary)' }}>{stateName}</span>
                    </div>

                    <h1>{dict.seoPages.cityHeroTitle} {stateName}</h1>
                    <p style={{ maxWidth: '800px', margin: '0 auto 2rem', fontSize: '1.25rem' }}>
                        {dict.seoPages.stateDesc} {stateName}.
                    </p>

                    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="text"
                            placeholder={dict.seoPages.searchCityPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1.1rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                        />
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    {filteredCities.length > 0 ? (
                        <div className="grid grid-cols-4" style={{ gap: '1.5rem' }}>
                            {filteredCities.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${lang}/einsatzgebiet/${stateSlug}/${city.slug}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1.5rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: 'white'
                                    }}
                                    className="city-card"
                                >
                                    <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>{city.name}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center" style={{ padding: '3rem', backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius-sm)' }}>
                            <p style={{ fontSize: '1.25rem', color: 'var(--secondary-foreground)' }}>
                                {dict.seoPages.noCityMatches} {stateName} {dict.seoPages.noCityFound} &quot;{searchTerm}&quot; {dict.seoPages.noCityMatches2}
                            </p>
                            <p style={{ marginTop: '1rem' }}>
                                {dict.seoPages.howeverWeDo} <Link href={`/${lang}/kontakt`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{dict.seoPages.askDirectly}</Link>
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .city-card:hover {
          border-color: var(--primary) !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
      `}} />
        </div>
    );
}
