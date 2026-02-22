"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-16 md:h-18">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 no-underline">
                    {/* Ensure logo is placed in public/media/logo.png or rename this path */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-gold)] flex items-center justify-center bg-[var(--color-bg-primary)]">
                        <img src="/media/logo.png" alt="Doğuş Taksi Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '🚕'; }} />
                    </div>
                    <div>
                        <span className="text-lg md:text-xl font-bold text-[var(--color-text-primary)]">
                            Doğuş <span className="text-[var(--color-gold)]">Korsan Taksi</span>
                        </span>
                        <p className="text-[11px] text-[var(--color-text-muted)] hidden md:block uppercase tracking-wider">
                            Bölgenin En Büyük Durağı
                        </p>
                    </div>
                </Link>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <a href={SITE_CONFIG.phoneHref} className="btn-primary text-sm py-2 px-4">
                        📞 {SITE_CONFIG.phone}
                    </a>
                    <a
                        href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2 px-4"
                        style={{ borderColor: "#25d366", color: "#25d366" }}
                    >
                        💬 WhatsApp
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
                    aria-label="Menü"
                >
                    <span className={`block w-6 h-0.5 bg-[var(--color-gold)] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--color-gold)] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-[var(--color-gold)] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:block border-t border-white/5">
                <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-1 h-11">
                    {NAV_LINKS.map((link) => (
                        <div
                            key={link.href}
                            className="relative group"
                            onMouseEnter={() => "children" in link ? setActiveDropdown(link.href) : null}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                className="px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors no-underline rounded-lg hover:bg-white/5"
                            >
                                {link.label}
                                {"children" in link && " ▾"}
                            </Link>

                            {"children" in link && activeDropdown === link.href && (
                                <div className="absolute top-full left-0 mt-1 w-64 py-2 rounded-xl bg-[var(--color-bg-card)] border border-white/10 shadow-xl z-50">
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="block px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:bg-white/5 no-underline transition-colors"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Mobile Nav */}
            {isOpen && (
                <nav className="md:hidden border-t border-white/5 bg-[var(--color-bg-primary)] max-h-[80vh] overflow-y-auto">
                    {NAV_LINKS.map((link) => (
                        <div key={link.href}>
                            <Link
                                href={link.href}
                                onClick={() => { if (!("children" in link)) setIsOpen(false); }}
                                className="block px-6 py-3 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] border-b border-white/5 no-underline"
                            >
                                {link.label}
                            </Link>
                            {"children" in link && (
                                <div className="bg-white/3">
                                    {link.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-10 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] no-underline"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            )}
        </header>
    );
}
