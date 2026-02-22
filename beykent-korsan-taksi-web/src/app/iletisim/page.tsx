import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "İletişim | Bize Ulaşın",
    description: "Beykent Korsan Taksi iletişim bilgileri. Telefon, WhatsApp, adres. 7/24 hizmet. Hemen ulaşın: 0545 457 27 00",
    alternates: { canonical: `${SITE_CONFIG.url}/iletisim` },
};

export default function ContactPage() {
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">İletişim</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Bize <span className="text-gold">Ulaşın</span>
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        7/24 hizmetinizdeyiz. En hızlı şekilde size ulaşalım.
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Cards */}
                    <div className="flex flex-col gap-4">
                        {/* Phone */}
                        <a href={SITE_CONFIG.phoneHref} className="card group no-underline">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: "var(--color-gold-glow)" }}>
                                    📞
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-text-muted)]">Telefon</p>
                                    <p className="text-xl font-bold text-[var(--color-gold)]">{SITE_CONFIG.phone}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">Tıkla ve hemen ara</p>
                                </div>
                            </div>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card group no-underline"
                        >
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: "rgba(37, 211, 102, 0.15)" }}>
                                    💬
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-text-muted)]">WhatsApp</p>
                                    <p className="text-xl font-bold text-[#25d366]">WhatsApp&apos;tan Yaz</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">Konumunuzu paylaşın</p>
                                </div>
                            </div>
                        </a>

                        {/* Address */}
                        <div className="card">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: "var(--color-gold-glow)" }}>
                                    📍
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-text-muted)]">Adres</p>
                                    <p className="text-base font-semibold text-[var(--color-text-primary)]">{SITE_CONFIG.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="card">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: "var(--color-gold-glow)" }}>
                                    🕐
                                </div>
                                <div>
                                    <p className="text-sm text-[var(--color-text-muted)]">Çalışma Saatleri</p>
                                    <p className="text-base font-semibold text-[var(--color-success)]">7 Gün 24 Saat Açık</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Şikayet & Önerileriniz</h2>
                            <p className="text-sm text-[var(--color-text-muted)] mb-6">
                                Acil durumda bizi mutlaka arayın. Diğer durumlar için formu doldurun.
                            </p>

                            <form className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-[var(--color-text-secondary)] mb-1">Adınız</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="İsminizi girin"
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-white/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm text-[var(--color-text-secondary)] mb-1">Telefon</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="05XX XXX XX XX"
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-white/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm text-[var(--color-text-secondary)] mb-1">Mesajınız</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="Mesajınızı yazın..."
                                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-white/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                                    />
                                </div>
                                <button type="submit" className="btn-primary justify-center">
                                    Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps Embed */}
            <section className="pb-20 px-4">
                <div className="max-w-[900px] mx-auto">
                    <div className="card overflow-hidden p-0" style={{ height: "350px" }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24097.04574742977!2d28.619!3d41.004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55fb09ed1d1b1%3A0x6f69a1c8233f1d3f!2sBeykent%2C%20Beylikd%C3%BCz%C3%BC%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Beykent Korsan Taksi Konum"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
