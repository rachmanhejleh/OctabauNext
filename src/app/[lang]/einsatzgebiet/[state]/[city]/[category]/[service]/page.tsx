import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities } from '@/data/cities';
import { getServiceBySlug, getCategories } from '@/data/services';
import type { Metadata } from 'next';
import ServiceStepForm from '@/components/ServiceStepForm';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

type Props = {
    params: Promise<{ lang: string; state: string; city: string; category: string; service: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: citySlug, state: stateSlug, category: categorySlug, service: serviceSlug } = await params;
    const city = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);
    const category = getServiceBySlug(categorySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!city || !category || !service || service.isCategory) {
        return { title: 'Nicht gefunden | Octabau' };
    }

    return {
        title: `${service.title} in ${city.name} | Octabau Bauunternehmen`,
        description: `Experten für ${service.title} in ${city.name}. Zuverlässige und professionelle Bauausführung durch Octabau in der Region ${city.region}.`,
    };
}

export async function generateStaticParams() {
    const params: { lang: string; state: string; city: string; category: string; service: string }[] = [];
    const { getSubServices } = await import('@/data/services');
    const categories = getCategories();

    // Only pre-build the top 5 cities to prevent build crashes
    const topCities = cities.slice(0, 5);

    for (const city of topCities) {
        for (const cat of categories) {
            const subServices = getSubServices(cat.slug);
            for (const sub of subServices) {
                for (const lang of ['de', 'en', 'ar']) {
                    params.push({ lang, state: city.regionSlug, city: city.slug, category: cat.slug, service: sub.slug });
                }
            }
        }
    }
    return params;
}

export default async function CityServicePage({ params }: Props) {
    const { lang, city: citySlug, state: stateSlug, category: categorySlug, service: serviceSlug } = await params;
    const dict = await getDictionary(lang as Locale);

    const cityData = cities.find(c => c.slug === citySlug && c.regionSlug === stateSlug);
    const categoryData = getServiceBySlug(categorySlug);
    const serviceData = getServiceBySlug(serviceSlug);

    if (!cityData || !categoryData || !serviceData || serviceData.isCategory) {
        notFound();
    }

    return (
        <div>
            {/* Minimalist Hero */}
            <section style={{ backgroundColor: 'var(--secondary)', paddingTop: '8rem', paddingBottom: '5rem', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', rowGap: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.5' }}>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}`} style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}>{cityData.region}</Link>
                        <span>/</span>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}/${cityData.slug}`} style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}>{cityData.name}</Link>
                        <span>/</span>
                        <Link href={`/${lang}/einsatzgebiet/${cityData.regionSlug}/${cityData.slug}/${categoryData.slug}`} style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}>{categoryData.title}</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--primary)', whiteSpace: 'nowrap' }}>{serviceData.title}</span>
                    </div>

                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', maxWidth: '900px', lineHeight: 1.1 }}>
                        {serviceData.title} {dict.servicePage.in} {cityData.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--secondary-foreground)', maxWidth: '700px' }}>
                        {dict.servicePage.heroDesc} {serviceData.title}{dict.servicePage.heroDesc2} {cityData.name}.
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container grid grid-cols-2" style={{ gap: '5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{dict.servicePage.profExecution} {cityData.name}</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--secondary-foreground)' }}>
                            {serviceData.description}
                        </p>
                        <p style={{ color: 'var(--secondary-foreground)', marginBottom: '1.5rem' }}>
                            {dict.servicePage.projBegin} {cityData.region} {dict.servicePage.projBegin2} {serviceData.title} {dict.servicePage.projBegin3} {cityData.name}.
                        </p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary-foreground)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> {dict.servicePage.onTime}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary-foreground)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> {dict.servicePage.safety}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary-foreground)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> {dict.servicePage.contacts}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary-foreground)' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span> {dict.servicePage.transparency}
                            </li>
                        </ul>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'sticky', top: '2rem', backgroundColor: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-sm)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>{dict.servicePage.projInq} {cityData.name}</h3>
                            <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                                {dict.servicePage.needSupport} {serviceData.title} {dict.servicePage.in} {cityData.name}?
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{dict.servicePage.hotline}</span>
                                    <a href="tel:+49000000000" style={{ fontSize: '1.25rem', fontWeight: 600, textDecoration: 'none' }}>+49 (0) 800 000 000</a>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{dict.servicePage.emailDisp}</span>
                                    <a href={`mailto:anfrage-${cityData.slug}@octabau.de`} style={{ fontSize: '1.25rem', fontWeight: 600, textDecoration: 'none' }}>anfrage@{cityData.slug}.octabau.de</a>
                                </div>
                            </div>

                            <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', width: '100%' }}>
                                {dict.servicePage.toContact}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <ServiceStepForm initialServiceSlug={serviceData.slug} />
                </div>
            </section>
        </div>
    );
}
