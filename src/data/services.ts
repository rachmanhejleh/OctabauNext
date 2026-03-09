export interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    isCategory: boolean;
    image?: string;
    parentCategorySlug?: string;
    subServices?: string[]; // Array of slugs
}

export const servicesData: Service[] = [
    // Categories
    {
        id: '1',
        slug: 'ausbau-gestaltung',
        title: 'Ausbau & Gestaltung',
        description: 'Hochwertiger Komplettausbau und Gestaltung von Gewerbe- und Industriepassagen.',
        isCategory: true,
        image: '/images/generic.png',
        subServices: ['innenausbau', 'trockenbau', 'malerarbeiten', 'bodenarbeiten', 'fliesenarbeiten', 'fassadenarbeiten']
    },
    {
        id: '2',
        slug: 'projektvorbereitung-planung',
        title: 'Projektvorbereitung & Planung',
        description: 'Wir legen den Grundstein für einen reibungslosen Ablauf Ihres Bauvorhabens.',
        isCategory: true,
        image: '/images/generic.png',
        subServices: ['projektberatung', 'baukoordination', 'baustellenorganisation']
    },
    {
        id: '3',
        slug: 'logistik-transport-service',
        title: 'Logistik, Transport & Service',
        description: 'Punktgenaue Baulogistik und Transportlösungen für Großbaustellen.',
        isCategory: true,
        image: '/images/generic.png',
        subServices: ['baulogistik', 'materialtransport', 'umzugsservice']
    },
    {
        id: '4',
        slug: 'uebergabe-reinigung-betreuung',
        title: 'Übergabe, Reinigung & Betreuung',
        description: 'Professionelle Vorbereitung zur schlüsselfertigen Übergabe Ihres Objekts.',
        isCategory: true,
        image: '/images/generic.png',
        subServices: ['bauendreinigung', 'objektvorbereitung']
    },
    {
        id: '5',
        slug: 'rueckbau-vorbereitung',
        title: 'Rückbau & Vorbereitung',
        description: 'Fachgerechter Rückbau und Vorbereitung für Neubau oder Kernsanierung.',
        isCategory: true,
        image: '/images/generic.png',
        subServices: ['abriss', 'entkernung', 'rueckbauarbeiten']
    },

    // Sub-services for Ausbau & Gestaltung
    { id: '1-1', slug: 'innenausbau', title: 'Innenausbau', description: 'Kompletter Innenausbau für Büros, Praxen und Gewerbeflächen.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung', image: '/images/generic.png' },
    { id: '1-2', slug: 'trockenbau', title: 'Trockenbau', description: 'Flexible und brandschutzgerechte Trockenbaulösungen.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung' },
    { id: '1-3', slug: 'malerarbeiten', title: 'Malerarbeiten', description: 'Professionelle Anstriche und Wandbeschichtungen.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung' },
    { id: '1-4', slug: 'bodenarbeiten', title: 'Bodenarbeiten', description: 'Verlegung von Industrieböden und hochwertigen Belägen.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung' },
    { id: '1-5', slug: 'fliesenarbeiten', title: 'Fliesenarbeiten', description: 'Großflächige Fliesenverlegung für Sanitär- und Nutzbereiche.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung' },
    { id: '1-6', slug: 'fassadenarbeiten', title: 'Fassadenarbeiten', description: 'Energetische Fassadensanierung und Neugestaltung.', isCategory: false, parentCategorySlug: 'ausbau-gestaltung' },

    // Sub-services for Projektvorbereitung
    { id: '2-1', slug: 'projektberatung', title: 'Projektberatung', description: 'Strategische Beratung vor Baubeginn zur Optimierung von Zeit und Budget.', isCategory: false, parentCategorySlug: 'projektvorbereitung-planung' },
    { id: '2-2', slug: 'baukoordination', title: 'Baukoordination', description: 'Schnittstellenmanagement zwischen allen beteiligten Gewerken.', isCategory: false, parentCategorySlug: 'projektvorbereitung-planung' },
    { id: '2-3', slug: 'baustellenorganisation', title: 'Baustellenorganisation', description: 'Effiziente Einrichtung und Organisation der Baustelle.', isCategory: false, parentCategorySlug: 'projektvorbereitung-planung' },

    // Sub-services for Logistik
    { id: '3-1', slug: 'baulogistik', title: 'Baulogistik', description: 'Steuerung der Material- und Personenströme auf der Baustelle.', isCategory: false, parentCategorySlug: 'logistik-transport-service' },
    { id: '3-2', slug: 'materialtransport', title: 'Materialtransport', description: 'Sichere Anlieferung und Verbringung von Baumaterialien.', isCategory: false, parentCategorySlug: 'logistik-transport-service' },
    { id: '3-3', slug: 'umzugsservice', title: 'Umzugsservice für Baustellen oder Gebäude', description: 'Kommerzielle Umzüge und Standortverlagerungen während der Bauphase.', isCategory: false, parentCategorySlug: 'logistik-transport-service' },

    // Sub-services for Übergabe
    { id: '4-1', slug: 'bauendreinigung', title: 'Bauendreinigung', description: 'Tiefenreine Beseitigung aller Bauverschmutzungen vor dem Einzug.', isCategory: false, parentCategorySlug: 'uebergabe-reinigung-betreuung' },
    { id: '4-2', slug: 'objektvorbereitung', title: 'Objektvorbereitung zur Übergabe', description: 'Mängelbeseitigung und letzte Feinabnahme für den Bauherren.', isCategory: false, parentCategorySlug: 'uebergabe-reinigung-betreuung' },

    // Sub-services for Rückbau
    { id: '5-1', slug: 'abriss', title: 'Abriss', description: 'Kontrollierter und maschineller Abbruch von Gebäudestrukturen.', isCategory: false, parentCategorySlug: 'rueckbau-vorbereitung' },
    { id: '5-2', slug: 'entkernung', title: 'Entkernung', description: 'Schonende Entkernung zur Vorbereitung von Revitalisierungen.', isCategory: false, parentCategorySlug: 'rueckbau-vorbereitung' },
    { id: '5-3', slug: 'rueckbauarbeiten', title: 'Rückbauarbeiten', description: 'Selektiver Rückbau und fachgerechte Schadstoffentsorgung nach TRGS.', isCategory: false, parentCategorySlug: 'rueckbau-vorbereitung' },
];

export function getServiceBySlug(slug: string): Service | undefined {
    return servicesData.find(s => s.slug === slug);
}

export function getCategories(): Service[] {
    return servicesData.filter(s => s.isCategory);
}

export function getSubServices(categorySlug: string): Service[] {
    return servicesData.filter(s => s.parentCategorySlug === categorySlug);
}
