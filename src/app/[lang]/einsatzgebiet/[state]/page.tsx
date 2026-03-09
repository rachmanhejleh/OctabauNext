import { getDictionary } from '@/get-dictionary';
import type { Locale } from '@/i18n-config';
import StateClient from './StateClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Standorte | Octabau',
};

export default async function StateOverview({ params }: { params: Promise<{ lang: string, state: string }> }) {
    const { lang, state } = await params;
    const dict = await getDictionary(lang as Locale);

    return <StateClient stateSlug={state} lang={lang} dict={dict} />;
}
