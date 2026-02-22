import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Blog | Korsan Taksi Haberleri",
    description: "Beylikdüzü korsan taksi hakkında güncel yazılar, ulaşım tavsiyeleri ve İstanbul trafiği hakkında bilgiler.",
    alternates: { canonical: `${SITE_CONFIG.url}/blog` },
};

const SAMPLE_POSTS = [
    {
        slug: "beylikduzu-korsan-taksi-fiyatlari-2025",
        title: "2025 Beylikdüzü Korsan Taksi Fiyatları",
        excerpt: "2025 yılı güncel Beylikdüzü korsan taksi fiyatları ve güzergah bilgileri hakkında detaylı bilgi.",
        date: "2025-02-15",
        category: "Fiyatlar",
    },
    {
        slug: "istanbul-havalimani-transfer-rehberi",
        title: "İstanbul Havalimanı Transfer Rehberi",
        excerpt: "Beylikdüzü'nden İstanbul Havalimanı'na nasıl ulaşılır? En ekonomik ve konforlu yollar.",
        date: "2025-02-10",
        category: "Rehber",
    },
    {
        slug: "korsan-taksi-nedir-avantajlari",
        title: "Korsan Taksi Nedir? Avantajları Nelerdir?",
        excerpt: "Korsan taksi hizmetinin ne olduğu, normal taksiden farkları ve avantajları hakkında her şey.",
        date: "2025-02-05",
        category: "Bilgi",
    },
];

export default function BlogPage() {
    return (
        <>
            <section className="pt-40 pb-10 px-4">
                <div className="max-w-[800px] mx-auto text-center">
                    <nav className="mb-6 text-sm text-[var(--color-text-muted)]">
                        <Link href="/" className="hover:text-[var(--color-gold)] no-underline transition-colors">Anasayfa</Link>
                        <span className="mx-2">›</span>
                        <span className="text-[var(--color-gold)]">Blog</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="text-gold">Blog</span>
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        Ulaşım tavsiyeleri, fiyat güncellemeleri ve daha fazlası
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-[800px] mx-auto">
                    <div className="flex flex-col gap-4">
                        {SAMPLE_POSTS.map((post) => (
                            <article key={post.slug} className="card group cursor-pointer">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-gold-glow)] text-[var(--color-gold)]">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-muted)]">{post.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-sm text-[var(--color-gold)] font-semibold">
                                        Devamını Oku →
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="card text-center mt-8">
                        <div className="relative z-10">
                            <p className="text-[var(--color-text-secondary)]">
                                Yeni blog yazıları için bizi takip edin.
                            </p>
                            <p className="text-sm text-[var(--color-text-muted)] mt-2">
                                n8n otomasyonu ile AI destekli blog yazıları yakında burada!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
