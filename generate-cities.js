/* eslint-disable */
const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/pensnarik/german-cities/master/germany.json';

const transformString = (str) => {
    return str
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const records = JSON.parse(data);
            const uniqueCities = new Map();

            // Ensure we keep the top 6 cities first, as they were in the original array
            const initialCities = [
                { name: 'Köln', slug: 'koeln', region: 'Nordrhein-Westfalen', regionSlug: 'nordrhein-westfalen' },
                { name: 'Düsseldorf', slug: 'duesseldorf', region: 'Nordrhein-Westfalen', regionSlug: 'nordrhein-westfalen' },
                { name: 'Dortmund', slug: 'dortmund', region: 'Nordrhein-Westfalen', regionSlug: 'nordrhein-westfalen' },
                { name: 'Essen', slug: 'essen', region: 'Nordrhein-Westfalen', regionSlug: 'nordrhein-westfalen' },
                { name: 'Frankfurt am Main', slug: 'frankfurt', region: 'Hessen', regionSlug: 'hessen' },
                { name: 'München', slug: 'muenchen', region: 'Bayern', regionSlug: 'bayern' }
            ];

            initialCities.forEach(city => uniqueCities.set(city.name, city));

            records.forEach(record => {
                if (!record.name) return;

                const cityName = record.name;
                // The Pensnarik json uses 'state' instead of 'bundesland'
                let regionName = record.state || 'Deutschland';

                if (!uniqueCities.has(cityName)) {
                    uniqueCities.set(cityName, {
                        name: cityName,
                        slug: transformString(cityName),
                        region: regionName,
                        regionSlug: transformString(regionName)
                    });
                }
            });

            const allCitiesList = Array.from(uniqueCities.values());

            // Deduplicate by slug just in case
            const uniqueSlugs = new Set();
            const finalCities = [];

            allCitiesList.forEach(city => {
                if (!uniqueSlugs.has(city.slug)) {
                    uniqueSlugs.add(city.slug);
                    finalCities.push(city);
                }
            });

            let fileContent = `export const cities = [\n`;
            finalCities.forEach(city => {
                fileContent += `    { name: ${JSON.stringify(city.name)}, slug: '${city.slug}', region: ${JSON.stringify(city.region)}, regionSlug: '${city.regionSlug}' },\n`;
            });
            fileContent += `];\n`;

            const targetPath = path.join(__dirname, 'src', 'data', 'cities.ts');
            fs.writeFileSync(targetPath, fileContent, 'utf8');

            console.log(`Successfully wrote ${finalCities.length} unique cities and villages to src/data/cities.ts`);

        } catch (e) {
            console.error('Error parsing JSON or writing file:', e.message);
        }
    });
}).on('error', (e) => {
    console.error('Network Error:', e.message);
});
