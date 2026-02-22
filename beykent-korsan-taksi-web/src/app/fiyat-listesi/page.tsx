import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { getPrices } from "@/lib/supabase-server";

export const metadata: Metadata = {
    title: "Fiyat Listesi | Korsan Taksi Fiyatları",
    description: "Beykent ve Beylikdüzü korsan taksi fiyat listesi. Sabit fiyat garantisi ile şeffaf fiyatlandırma. Taksimetre açılış ücreti yok!",
    alternates: { canonical: `${SITE_CONFIG.url}/fiyat-listesi` },
};

export default async function PriceListPage() {
    const PRICE_LIST = await getPrices();
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">Fiyat Listesi</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Fiyat <span className="text-gold">Listesi</span>
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto">
                        Şeffaf fiyatlandırma politikamız ile yolculuk öncesi fiyatınızı bilin.
                        Taksimetre açılış ücreti yoktur.
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[800px] mx-auto">
                    <div className="card overflow-hidden p-0 mb-6">
                        <div className="relative z-10">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5" style={{ background: "var(--color-gold-glow)" }}>
                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-gold)]">Nereden</th>
                                        <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-gold)]">Nereye</th>
                                        <th className="text-right px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-gold)]">Fiyat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICE_LIST.map((item, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                                            <td className="px-6 py-4 text-sm text-[var(--color-text-primary)] font-medium">{item.from}</td>
                                            <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{item.to}</td>
                                            <td className="px-6 py-4 text-sm text-[var(--color-gold)] font-bold text-right">{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card text-center">
                        <div className="relative z-10">
                            <p className="text-[var(--color-text-secondary)] mb-2">
                                Listede olmayan bir güzergah mı arıyorsunuz?
                            </p>
                            <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                Bizi arayarak veya WhatsApp&apos;tan yazarak güncel fiyat bilgisi alabilirsiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a href={SITE_CONFIG.phoneHref} className="btn-primary">
                                    📞 {SITE_CONFIG.phone}
                                </a>
                                <a
                                    href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, fiyat bilgisi almak istiyorum.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                    style={{ borderColor: "#25d366", color: "#25d366" }}
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
