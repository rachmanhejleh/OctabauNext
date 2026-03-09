import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { cities } from '@/data/cities';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <img
          src="/images/hero.png"
          alt="Großbaustelle von Octabau"
          className={styles.heroBgImage}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
          <div className={styles.heroContent}>
            <h1 dangerouslySetInnerHTML={{ __html: dict.homePage.heroTitle }} />
            <p className={styles.lead}>
              {dict.homePage.heroSubtitle}
            </p>
            <div className={styles.heroActions}>
              <Link href={`/${lang}/projekte`} className="btn btn-primary">
                {dict.homePage.heroProjectsBtn}
              </Link>
              <Link href={`/${lang}/kontakt`} className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                {dict.homePage.heroContactBtn}
              </Link>
            </div>
          </div>

          {/* Floating Icons Strip */}
          <div className={`${styles.floatingIcons} container`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dict.services?.['ausbau-gestaltung']?.title || 'Ausbau & Gestaltung'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dict.services?.['projektvorbereitung-planung']?.title || 'Projektplanung'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dict.services?.['logistik-transport-service']?.title || 'Baulogistik'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: '50px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{dict.services?.['uebergabe-reinigung-betreuung']?.title || 'Übergabe & Betreuung'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bauphasen (Services Overview) */}
      <section className={`section-padding ${styles.bauphasen}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 className={styles.sectionTitle}>{dict.homePage.phasesTitle}</h2>
            <p>{dict.homePage.phasesSubtitle}</p>
          </div>

          <div className="grid grid-cols-3">
            {dict.homePage.phases.map((phase: { title: string, desc: string, link: string }, i: number) => (
              <div key={i} className={styles.serviceCard}>
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
                <Link href={`/${lang}/leistungen/${phase.link}`} className={styles.serviceLink}>
                  {dict.common.readMore} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Warum Octabau */}
      < section className={`section-padding ${styles.warum}`}>
        <div className="container grid grid-cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 className={styles.sectionTitle}>{dict.homePage.whyTitle}</h2>
            <p>
              {dict.homePage.whyText}
            </p>
            <ul className={styles.benefitsList}>
              {dict.homePage.whyList.map((item: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
          <div className={styles.warumImagePlaceholder} style={{ position: 'relative' }}>
            <img
              src="/images/about.png"
              alt="Octabau Projektplanung"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section >

      {/* Projekte (Teaser) */}
      <section className={`section-padding ${styles.projekte}`}>
        <div className="container">
          <div className={styles.projectsHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{dict.homePage.projectsTitle}</h2>
              <p>{dict.homePage.projectsSubtitle}</p>
            </div>
            <Link href={`/${lang}/projekte`} className="btn btn-outline">{dict.homePage.projectsBtn}</Link>
          </div>

          <div className="grid grid-cols-2">
            {dict.homePage.shortProjects.map((proj: { id: number, title: string, desc: string }, idx: number) => (
              <div key={proj.id} className={styles.projectCard}>
                <div className={styles.projectImage} style={{ position: 'relative' }}>
                  <img
                    src={idx === 0 ? '/images/project1.png' : '/images/project2.png'}
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Einsatzgebiet (Local SEO) */}
      < section className={`section-padding ${styles.einsatzgebiet}`}>
        <div className="container text-center">
          <h2 className={styles.sectionTitle}>{dict.homePage.regionsTitle}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            {dict.homePage.regionsSubtitle}
          </p>

          <div className={styles.cityGrid}>
            {cities.slice(0, 6).map(city => (
              <Link key={city.slug} href={`/${lang}/einsatzgebiet/${city.regionSlug}/${city.slug}`} className={styles.cityLink}>
                {city.name}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <Link href={`/${lang}/einsatzgebiet`} style={{ textDecoration: 'underline' }}>{dict.homePage.regionsBtn}</Link>
          </div>
        </div>
      </section >

      {/* CTA */}
      < section className={`section-padding ${styles.cta}`}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{dict.homePage.ctaTitle}</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>
            {dict.homePage.ctaSubtitle}
          </p>
          <Link href={`/${lang}/kontakt`} className="btn" style={{ backgroundColor: 'white', color: 'black' }}>
            {dict.homePage.ctaBtn}
          </Link>
        </div>
      </section >
    </div >
  );
}
