import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular | Korsan Taksi SSS",
    description: "Beylikdüzü korsan taksi hakkında merak ettiğiniz tüm sorular ve cevaplar. Fiyatlar, ödeme yöntemleri, hizmet saatleri ve daha fazlası.",
    alternates: { canonical: `${SITE_CONFIG.url}/sss` },
};

export default function FAQPage() {
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">SSS</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Sıkça Sorulan <span className="text-gold">Sorular</span>
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        Korsan taksi hizmetimiz hakkında merak ettiğiniz her şey
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[800px] mx-auto">
                    <div className="flex flex-col gap-3">
                        {FAQ_ITEMS.map((faq, i) => (
                            <details key={i} className="card group cursor-pointer">
                                <summary className="relative z-10 font-semibold text-[var(--color-text-primary)] list-none flex items-center justify-between gap-4">
                                    <span>{faq.question}</span>
                                    <span className="text-[var(--color-gold)] text-xl flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <p className="relative z-10 mt-4 text-[var(--color-text-secondary)] leading-relaxed">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>

                    <div className="card text-center mt-8">
                        <div className="relative z-10">
                            <p className="text-[var(--color-text-secondary)] mb-4">
                                Başka bir sorunuz mu var?
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a href={SITE_CONFIG.phoneHref} className="btn-primary">📞 Bizi Arayın</a>
                                <a
                                    href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Merhaba, bir sorum var.")}`}
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
