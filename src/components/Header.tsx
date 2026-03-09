import Link from 'next/link';
import styles from './Header.module.css';
import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';

export default async function Header({ lang }: { lang: string }) {
    const dict = await getDictionary(lang as Locale);
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContent}`}>
                <div className={styles.logo}>
                    <Link href={`/${lang}`}>
                        <strong>OCTA</strong>BAU
                    </Link>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href={`/${lang}/leistungen`}>{dict.navigation.services}</Link></li>
                        <li><Link href={`/${lang}/projekte`}>{dict.navigation.projects}</Link></li>
                        <li><Link href={`/${lang}/einsatzgebiet`}>{dict.navigation.regions}</Link></li>
                        <li><Link href={`/${lang}/ueber-uns`}>{dict.navigation.about}</Link></li>
                    </ul>
                </nav>

                <div className={styles.cta}>
                    <LanguageSwitcher currentLang={lang} />
                    <Link href={`/${lang}/kontakt`} className="btn btn-primary">
                        {dict.navigation.contact}
                    </Link>
                </div>

                <MobileNav lang={lang} dict={dict} />
            </div>
        </header>
    );
}
