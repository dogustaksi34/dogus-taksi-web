import { MetadataRoute } from "next";
import { SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url;

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
        { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `${baseUrl}/hizmetlerimiz`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
        { url: `${baseUrl}/fiyat-listesi`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
        { url: `${baseUrl}/sss`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    ];

    const serviceAreaPages = SERVICE_AREAS.map((area) => ({
        url: `${baseUrl}/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    return [...staticPages, ...serviceAreaPages];
}
