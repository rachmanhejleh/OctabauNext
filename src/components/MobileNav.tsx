'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './MobileNav.module.css';

interface MobileNavProps {
    lang: string;
    dict: {
        navigation: {
            services: string;
            projects: string;
            regions: string;
            about: string;
            contact: string;
        }
    };
}

export default function MobileNav({ lang, dict }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className={styles.mobileNavContainer}>
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
                <span className={`${styles.line} ${isOpen ? styles.open : ''}`}></span>
                <span className={`${styles.line} ${isOpen ? styles.open : ''}`}></span>
                <span className={`${styles.line} ${isOpen ? styles.open : ''}`}></span>
            </button>

            {isOpen && (
                <div className={styles.drawer}>
                    <button className={styles.closeBtn} onClick={toggleMenu} aria-label="Close Menu">
                        &times;
                    </button>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li><Link href={`/${lang}/leistungen`} onClick={toggleMenu}>{dict.navigation.services}</Link></li>
                            <li><Link href={`/${lang}/projekte`} onClick={toggleMenu}>{dict.navigation.projects}</Link></li>
                            <li><Link href={`/${lang}/einsatzgebiet`} onClick={toggleMenu}>{dict.navigation.regions}</Link></li>
                            <li><Link href={`/${lang}/ueber-uns`} onClick={toggleMenu}>{dict.navigation.about}</Link></li>
                            <li><Link href={`/${lang}/kontakt`} onClick={toggleMenu} className={styles.contactLink}>{dict.navigation.contact}</Link></li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}
