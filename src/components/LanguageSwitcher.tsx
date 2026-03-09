"use client";

import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/i18n-config';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale; // Replace the first path segment (the lang)
        return segments.join('/');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
                onChange={(e) => {
                    const newLocale = e.target.value;
                    router.push(redirectedPathname(newLocale));
                }}
                value={currentLang}
                style={{
                    padding: '0.4rem 1.8rem 0.4rem 0.6rem', // Extra right padding for the arrow
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    outline: 'none',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '0.6rem',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                }}
                aria-label="Select Language"
            >
                {i18n.locales.map((locale: string) => (
                    <option key={locale} value={locale}>
                        {locale === 'de' ? '🇩🇪 DE' : locale === 'en' ? '🇬🇧 EN' : '🇸🇦 AR'}
                    </option>
                ))}
            </select>
        </div>
    );
}
