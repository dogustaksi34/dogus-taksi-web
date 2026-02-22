import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS, SERVICE_AREAS } from "@/lib/constants";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-bg-secondary)] border-t border-white/5">
            <div className="max-w-[1200px] mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "var(--gradient-gold)" }}>
                                🚕
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                                    Beykent <span className="text-gold">Korsan Taksi</span>
                                </h3>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                            {SITE_CONFIG.foundedYear} yılından bu yana Beylikdüzü ve çevresinde güvenilir,
                            konforlu ve ekonomik taksi hizmeti sunuyoruz.
                        </p>
                        <div className="flex flex-col gap-2">
                            <a href={SITE_CONFIG.phoneHref} className="text-[var(--color-gold)] font-bold text-lg no-underline hover:brightness-110 transition">
                                📞 {SITE_CONFIG.phone}
                            </a>
                            <a
                                href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#25d366] font-semibold no-underline hover:brightness-110 transition"
                            >
                                💬 WhatsApp ile Yaz
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                            Hızlı Bağlantılar
                        </h4>
                        <ul className="list-none flex flex-col gap-2">
                            {NAV_LINKS.filter(l => !("children" in l)).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] no-underline transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Service Areas */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                            Hizmet Bölgelerimiz
                        </h4>
                        <ul className="list-none flex flex-col gap-2">
                            {SERVICE_AREAS.map((area) => (
                                <li key={area.slug}>
                                    <Link
                                        href={`/${area.slug}`}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] no-underline transition-colors"
                                    >
                                        {area.fullName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                            İletişim Bilgileri
                        </h4>
                        <ul className="list-none flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>{SITE_CONFIG.address}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📞</span>
                                <a href={SITE_CONFIG.phoneHref} className="text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] no-underline transition-colors">
                                    {SITE_CONFIG.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>🕐</span>
                                <span>7 Gün 24 Saat</span>
                            </li>
                        </ul>

                        <div className="mt-6 p-4 rounded-xl bg-[var(--color-bg-card)] border border-white/5">
                            <p className="text-xs text-[var(--color-text-muted)] text-center">
                                🎖️ Şehit aileleri için<br />
                                <span className="text-[var(--color-gold)] font-semibold">ücretsiz taşıma hizmeti</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="glow-line my-10" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
                    <p>
                        © {SITE_CONFIG.foundedYear}-{currentYear} {SITE_CONFIG.name}. Tüm hakları saklıdır.
                    </p>
                    <p>
                        Beylikdüzü Korsan Taksi | Beykent Korsan Taksi | Yakuplu Korsan Taksi
                    </p>
                </div>
            </div>
        </footer>
    );
}
