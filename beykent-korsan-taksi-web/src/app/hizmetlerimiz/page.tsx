import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Hizmetlerimiz | Korsan Taksi Hizmet Bölgelerimiz",
    description: "Beylikdüzü, Beykent, Yakuplu, Esenyurt, Gürpınar, Büyükçekmece, Avcılar ve Bahçeşehir korsan taksi hizmetlerimiz.",
    alternates: { canonical: `${SITE_CONFIG.url}/hizmetlerimiz` },
};

export default function ServicesPage() {
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">Hizmetlerimiz</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Hizmet <span className="text-gold">Bölgelerimiz</span>
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        İstanbul&apos;un birçok bölgesinde 7/24 korsan taksi hizmeti
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SERVICE_AREAS.map((area) => (
                        <Link
                            key={area.slug}
                            href={`/${area.slug}`}
                            className="card no-underline group"
                        >
                            <div className="relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--color-gold-glow)" }}>
                                        📍
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                                            {area.fullName}
                                        </h2>
                                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                                            {area.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {area.neighborhoods.slice(0, 4).map((n, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-[var(--color-text-muted)]">
                                                    {n}
                                                </span>
                                            ))}
                                            {area.neighborhoods.length > 4 && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-[var(--color-gold)]">
                                                    +{area.neighborhoods.length - 4} bölge
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm text-[var(--color-gold)] font-semibold">
                                            Detayları Gör →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Service types */}
            <section className="py-20 px-4 bg-[var(--color-bg-secondary)]">
                <div className="max-w-[800px] mx-auto text-center">
                    <h2 className="section-title mb-8">
                        Taksi <span className="text-gold">Servislerimiz</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: "🏙️", title: "Şehir İçi Ulaşım", desc: "İstanbul'un her noktasına sabit fiyatla" },
                            { icon: "✈️", title: "Havalimanı Transfer", desc: "İstanbul Havalimanı ve Sabiha Gökçen" },
                            { icon: "🚗", title: "VIP Servis", desc: "Özel konforlu araçlarla premium yolculuk" },
                            { icon: "📦", title: "Kargo & Paket", desc: "Hızlı ve güvenilir teslimat hizmeti" },
                            { icon: "🐾", title: "Evcil Hayvan Taşıma", desc: "Dostlarınızla güvenli yolculuk" },
                            { icon: "🏢", title: "Personel Taşıma", desc: "Kurumsal taşımacılık çözümleri" },
                        ].map((service, i) => (
                            <div key={i} className="card text-center">
                                <div className="relative z-10">
                                    <span className="text-4xl mb-3 block">{service.icon}</span>
                                    <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{service.title}</h3>
                                    <p className="text-sm text-[var(--color-text-secondary)]">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
