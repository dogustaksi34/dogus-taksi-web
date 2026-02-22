import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Hakkımızda | Beykent Korsan Taksi Hikayesi",
    description: "2014'ten beri Beylikdüzü ve Beykent'te güvenilir korsan taksi hizmeti. Ekibimiz, araçlarımız ve misyonumuz hakkında bilgi alın.",
    alternates: { canonical: `${SITE_CONFIG.url}/hakkimizda` },
};

export default function AboutPage() {
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">Hakkımızda</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="text-gold">2014</span>&apos;ten Bu Yana Güvenle Taşıyoruz
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        Beykent Korsan Taksi&apos;nin hikayesi
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[800px] mx-auto">
                    {/* Story */}
                    <div className="card mb-6">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Biz Kimiz?</h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                2014 yılının başından bu yana &quot;Beykent Korsan Taksi&quot; olarak faaliyet göstermekteyiz.
                                Ekibimiz seçkin ve tecrübeli kişilerden oluşup, araçlarımız çok çeşitli ve
                                her ihtiyaca hitap edecek modellerden oluşmaktadır.
                            </p>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                Siz değerli müşterilerimizin 24 saat huzur ve güven içerisinde şehir içi ve şehir dışı
                                ulaşımlarınızda &quot;Beykent Korsan Taksi&quot; misafirperverliği ve kalitesiyle hizmetinizdeyiz.
                            </p>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                İstanbul&apos;un tüm ilçelerinde 7 gün 24 saat, lüks araçlar ve uzman taksi şoförlerimiz ile
                                her daim hizmetinizdeyiz. Fiyatlarımız belirttiğiniz noktaya göre hesaplanır ve size söylenir.
                                Seyahat sonrası sizden ekstra bir ücret istenmez.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { value: "10+", label: "Yıl Tecrübe" },
                            { value: "50K+", label: "Mutlu Müşteri" },
                            { value: "24/7", label: "Kesintisiz Hizmet" },
                            { value: "8+", label: "Hizmet Bölgesi" },
                        ].map((stat, i) => (
                            <div key={i} className="card text-center">
                                <div className="relative z-10">
                                    <div className="text-3xl font-black text-gold mb-1">{stat.value}</div>
                                    <div className="text-xs text-[var(--color-text-muted)]">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Values */}
                    <div className="card mb-6">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Değerlerimiz</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: "🤝", title: "Güvenilirlik", desc: "10 yılı aşkın süredir güvenle hizmet veriyoruz" },
                                    { icon: "💰", title: "Şeffaf Fiyatlandırma", desc: "Sabit fiyat, sürpriz ücret yok" },
                                    { icon: "🚗", title: "Araç Kalitesi", desc: "Bakımlı B ve B1 sınıfı araç filosu" },
                                    { icon: "🎖️", title: "Sosyal Sorumluluk", desc: "Şehit aileleri için ücretsiz taşıma" },
                                ].map((value, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-primary)]">
                                        <span className="text-2xl">{value.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-[var(--color-text-primary)]">{value.title}</h3>
                                            <p className="text-sm text-[var(--color-text-secondary)]">{value.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="card">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Hizmetlerimiz</h2>
                            <ul className="space-y-3">
                                {[
                                    "7/24 Taksi Hizmeti — Günün her saati yaygın bir hizmet ağı",
                                    "Şehir İçi Ulaşım — İstanbul'un her noktasına",
                                    "Şehir Dışı Ulaşım — Uzun mesafe konforlu yolculuk",
                                    "Havalimanı Transferi — İstanbul Havalimanı ve Sabiha Gökçen",
                                    "Evcil Hayvan Taşımacılığı — Dostlarınızla güvenle yolculuk",
                                    "Kargo ve Paket Taşımacılığı — Hızlı teslimat",
                                    "Personel Taşımacılığı — Kurumsal çözümler",
                                ].map((service, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                                        <span className="text-[var(--color-gold)] font-bold">✓</span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 bg-[var(--color-bg-secondary)] text-center">
                <div className="max-w-[600px] mx-auto">
                    <h2 className="text-3xl font-black mb-4">
                        Bizimle <span className="text-gold">İletişime Geçin</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-8">
                        Güvenli ve konforlu yolculuğunuz için hemen arayın.
                    </p>
                    <a href={SITE_CONFIG.phoneHref} className="btn-primary text-lg px-8 py-4">
                        📞 {SITE_CONFIG.phone}
                    </a>
                </div>
            </section>
        </>
    );
}
