import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingCTA() {
    return (
        <div className="floating-cta">
            <a href={SITE_CONFIG.phoneHref} className="cta-call">
                📞 Hemen Ara
            </a>
            <a
                href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-whatsapp"
            >
                💬 WhatsApp
            </a>
        </div>
    );
}
