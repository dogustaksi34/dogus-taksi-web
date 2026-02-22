import { SITE_CONFIG, FAQ_ITEMS } from "@/lib/constants";

export default function SchemaMarkup() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "TaxiService"],
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        providerMobility: "dynamic",
        description:
            "Beylikdüzü ve Beykent korsan taksi hizmeti. Sabit fiyat, 7/24 ulaşım, konforlu araçlar.",
        url: SITE_CONFIG.url,
        telephone: "+905454572700",
        foundingDate: `${SITE_CONFIG.foundedYear}`,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Beykent Mahallesi",
            addressLocality: "Beylikdüzü",
            addressRegion: "İstanbul",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 41.0042,
            longitude: 28.6437,
        },
        areaServed: [
            { "@type": "City", name: "İstanbul" },
            { "@type": "AdministrativeArea", name: "Beylikdüzü" },
            { "@type": "AdministrativeArea", name: "Esenyurt" },
            { "@type": "AdministrativeArea", name: "Büyükçekmece" },
            { "@type": "AdministrativeArea", name: "Avcılar" },
        ],
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
        priceRange: "₺₺",
        currenciesAccepted: "TRY",
        paymentAccepted: "Cash, Credit Card",
        image: `${SITE_CONFIG.url}/og-image.jpg`,
        sameAs: [SITE_CONFIG.whatsapp],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Anasayfa",
                item: SITE_CONFIG.url,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
