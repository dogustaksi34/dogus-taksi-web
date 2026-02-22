import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";
import { getPrices } from "@/lib/supabase-server";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SERVICE_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const area = SERVICE_AREAS.find((a) => a.slug === slug);
    if (!area) return {};

    return {
        title: `${area.fullName} | 7/24 Hizmet | 0545 457 27 00`,
        description: `${area.fullName} hizmeti. ${area.description} Hemen ara: 0545 457 27 00`,
        alternates: { canonical: `${SITE_CONFIG.url}/${area.slug}` },
        openGraph: {
            title: `${area.fullName} | Sabit Fiyat, 7/24`,
            description: area.description,
            url: `${SITE_CONFIG.url}/${area.slug}`,
        },
    };
}

export default async function ServiceAreaPage({ params }: Props) {
    const { slug } = await params;
    const area = SERVICE_AREAS.find((a) => a.slug === slug);
    if (!area) notFound();

    const otherAreas = SERVICE_AREAS.filter((a) => a.slug !== slug);
    const PRICE_LIST = await getPrices();

    const normalizedAreaName = area.name.replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ğ/g, 'g').toLowerCase();

    const relevantPrices = PRICE_LIST.filter((p) => {
        const normalizedFrom = p.from.replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ğ/g, 'g').toLowerCase();
        return normalizedFrom.includes((normalizedAreaName === 'esen' ? 'esenyurt' : normalizedAreaName).substring(0, 5));
    });

    return (
        <>
            {/* JSON-LD for this service area */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: area.fullName,
                        description: area.description,
                        provider: {
                            "@type": ["LocalBusiness", "TaxiService"],
                            name: SITE_CONFIG.name,
                            telephone: "+905454572700",
                            providerMobility: "dynamic",
                        },
                        areaServed: {
                            "@type": "AdministrativeArea",
                            name: area.name,
                        },
                        serviceType: "Taxi Service",
                    }),
                }}
            />

            {/* ===== HERO ===== */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[rgba(10,10,15,0.3)] to-[#0a0a0f]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]" style={{ background: "var(--gradient-gold)" }} />

                <div className="relative z-10 max-w-[800px] mx-auto text-center">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">{area.fullName}</span>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,228,115,0.1)] border border-[rgba(255,228,115,0.2)] mb-6">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                        <span className="text-sm text-[var(--color-gold)]">7/24 {area.name} Hizmeti Aktif</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        <span className="bg-gold-gradient">{area.fullName}</span>
                    </h1>

                    <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-[600px] mx-auto">
                        {area.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={SITE_CONFIG.phoneHref} className="btn-primary text-lg px-8 py-4 animate-pulse-gold">
                            📞 Hemen Ara: {SITE_CONFIG.phone}
                        </a>
                        <a
                            href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Merhaba, ${area.name} bölgesinden taksi çağırmak istiyorum.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary px-8 py-4"
                            style={{ borderColor: "#25d366", color: "#25d366" }}
                        >
                            💬 WhatsApp&apos;tan Yaz
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== NEIGHBORHOODS ===== */}
            <section className="py-16 px-4">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="section-title text-center mb-8">
                        {area.name} <span className="text-gold">Bölge Hizmeti</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                        {area.neighborhoods.map((n, i) => (
                            <div key={i} className="card text-center py-4 px-3">
                                <div className="relative z-10">
                                    <span className="text-sm text-[var(--color-text-primary)]">📍 {n}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Area content for SEO */}
                    <div className="card">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-3">
                                {area.fullName} Hizmeti Hakkında
                            </h3>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                {area.name} bölgesinde 2014 yılından bu yana güvenilir korsan taksi hizmeti vermekteyiz.
                                Sabit fiyat politikamız ile yolculuk öncesinde fiyatınızı bilir, sürpriz ücretlerle karşılaşmazsınız.
                                Profesyonel ve deneyimli şoförlerimiz B ve B1 sınıfı bakımlı araçlarımız ile konforlu bir yolculuk deneyimi sunmaktadır.
                            </p>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                {area.name} korsan taksi hizmetimiz ile havalimanı transferleri, şehir içi ve şehir dışı yolculuklarınızda
                                7 gün 24 saat yanınızdayız. Büyük bagaj, kargo ve paket taşımacılığı dahil tüm ulaşım ihtiyaçlarınızda
                                bizi arayabilirsiniz.
                            </p>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                Taksimetre açılış ücreti olmadan, sabit fiyat garantisi ile ekonomik ve konforlu ulaşım
                                için hemen <strong className="text-[var(--color-gold)]">{SITE_CONFIG.phone}</strong> numarasını arayın
                                veya WhatsApp üzerinden konumunuzu paylaşın.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PRICES FOR THIS AREA ===== */}
            {relevantPrices.length > 0 && (
                <section className="py-16 px-4 bg-[var(--color-bg-secondary)]">
                    <div className="max-w-[800px] mx-auto">
                        <h2 className="section-title text-center mb-8">
                            {area.name} <span className="text-gold">Fiyat Listesi</span>
                        </h2>
                        <div className="card overflow-hidden p-0">
                            <div className="relative z-10">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Nereden</th>
                                            <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Nereye</th>
                                            <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {relevantPrices.map((item, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                                                <td className="px-6 py-3.5 text-sm text-[var(--color-text-primary)]">{item.from}</td>
                                                <td className="px-6 py-3.5 text-sm text-[var(--color-text-secondary)]">{item.to}</td>
                                                <td className="px-6 py-3.5 text-sm text-[var(--color-gold)] font-bold text-right">{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
                            * Fiyatlar tahmini olup güzergaha göre değişiklik gösterebilir. Kesin fiyat için bizi arayın.
                        </p>
                    </div>
                </section>
            )}

            {/* ===== OTHER SERVICE AREAS ===== */}
            <section className="py-16 px-4">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="section-title text-center mb-8">
                        Diğer <span className="text-gold">Hizmet Bölgelerimiz</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {otherAreas.map((a) => (
                            <Link
                                key={a.slug}
                                href={`/${a.slug}`}
                                className="card text-center py-4 no-underline group"
                            >
                                <div className="relative z-10">
                                    <span className="text-2xl mb-2 block">📍</span>
                                    <span className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors">
                                        {a.fullName}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 px-4 bg-[var(--color-bg-secondary)] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]" style={{ background: "var(--gradient-gold)" }} />
                <div className="max-w-[600px] mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        {area.name}&apos;dan <span className="text-gold">Taksi Çağırın</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-8">
                        {area.name} bölgesinde nerede olursanız olun, tek bir aramayla kapınızdayız.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={SITE_CONFIG.phoneHref} className="btn-primary text-lg px-8 py-4">
                            📞 {SITE_CONFIG.phone}
                        </a>
                        <a
                            href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Merhaba, ${area.name} bölgesinden taksi çağırmak istiyorum.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary px-8 py-4"
                            style={{ borderColor: "#25d366", color: "#25d366" }}
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
