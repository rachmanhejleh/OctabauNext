import Link from 'next/link';
import styles from './Footer.module.css';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function Footer({ lang }: { lang: string }) {
    const dict = await getDictionary(lang as Locale);

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <strong>OCTA</strong>BAU
                    </div>
                    <p className={styles.description}>
                        Ihr zuverlässiger Partner für Großbauprojekte, Gewerbebau und öffentliche Ausschreibungen.
                    </p>
                </div>

                <div className={styles.links}>
                    <h4>Schnelllinks</h4>
                    <ul>
                        <li><Link href={`/${lang}/leistungen/projektvorbereitung-planung`}>{dict.navigation.services} - Planung</Link></li>
                        <li><Link href={`/${lang}/leistungen/ausbau-gestaltung`}>{dict.navigation.services} - Ausbau</Link></li>
                        <li><Link href={`/${lang}/projekte`}>{dict.navigation.projects}</Link></li>
                        <li><Link href={`/${lang}/kontakt`}>{dict.navigation.contact}</Link></li>
                    </ul>
                </div>

                <div className={styles.contact}>
                    <h4>Kontakt</h4>
                    <p>Musterstraße 123<br />12345 Musterstadt</p>
                    <p>Tel: +49 (0) 123 456789</p>
                    <p>Email: info@octabau.de</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Octabau GmbH. {dict.footer.rights}</p>
                    <div className={styles.legalLinks}>
                        <Link href={`/${lang}/impressum`}>{dict.footer.impressum}</Link>
                        <Link href={`/${lang}/datenschutz`}>{dict.footer.datenschutz}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
