import Link from "next/link";
import { SITE_CONFIG, ADVANTAGES, SERVICE_AREAS, FAQ_ITEMS } from "@/lib/constants";
import { getPrices } from "@/lib/supabase-server";
import AnimatedSection from "@/components/AnimatedSection";

export default async function HomePage() {
  const PRICE_LIST = await getPrices();
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/*
          TODO for the standard user: 
          To change the background image, just replace 'hero-bg.jpg' with your image name from the public/media folder
        */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/media/hero-bg.jpg')" }}
        />
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[rgba(10,10,15,0.7)] to-[#0a0a0f]" />

        {/* Animated gold orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px]" style={{ background: "var(--gradient-gold)" }} />

        <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,228,115,0.1)] border border-[rgba(255,228,115,0.2)] mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span className="text-sm text-[var(--color-gold)]">7/24 Aktif — Hemen Ara</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up stagger-1">
            <span className="text-[var(--color-text-primary)]">Bölgenin En Büyük Durağı</span>
            <br />
            <span className="text-[var(--color-gold)] mt-2 block">DOĞUŞ TAKSİ</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-secondary)] mt-4 block uppercase font-bold tracking-wide">
              Erdal Taksi · Limon Taksi · Mert Taksi · Doruk Taksi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 max-w-[600px] mx-auto animate-fade-in-up stagger-2">
            <strong>Sabit fiyat</strong> garantisi ile şehir içi ve şehir dışı 7/24 konforlu ulaşım
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up stagger-3">
            <a href={SITE_CONFIG.phoneHref} className="btn-primary text-lg px-8 py-4 animate-pulse-gold">
              📞 Hemen Ara: {SITE_CONFIG.phone}
            </a>
            <a
              href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4"
              style={{ borderColor: "#25d366", color: "#25d366" }}
            >
              💬 WhatsApp&apos;tan Yaz
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)] animate-fade-in-up stagger-4">
            <span className="flex items-center gap-1">✓ Sabit Fiyat</span>
            <span className="flex items-center gap-1">✓ 7/24 Hizmet</span>
            <span className="flex items-center gap-1">✓ Konforlu Araçlar</span>
            <span className="flex items-center gap-1">✓ 10+ Yıl Tecrübe</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[var(--color-gold)] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES SECTION ===== */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Neden <span className="text-gold">Doğuş Taksi</span>?
            </h2>
            <p className="section-subtitle mx-auto">
              Sizi rakiplerimizden ayıran (Mert, Erdal, Doruk birleşimi) farkımız
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className="card text-center group">
                <div className="relative z-10">
                  <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">{adv.icon}</span>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{adv.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== SERVICE AREAS ===== */}
      <AnimatedSection className="py-20 px-4 bg-black/40 backdrop-blur-sm" delay={0.3}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Hizmet <span className="text-gold">Bölgelerimiz</span>
            </h2>
            <p className="section-subtitle mx-auto">
              İstanbul&apos;un her noktasında yanınızdayız
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className="card no-underline group"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: "var(--color-gold-glow)" }}>
                    📍
                  </div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                    {area.fullName}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                    {area.description}
                  </p>
                  <span className="text-xs text-[var(--color-gold)] font-semibold">
                    Detaylar →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== PRICING PREVIEW ===== */}
      <AnimatedSection className="py-20 px-4" delay={0.4}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Fiyat <span className="text-gold">Listesi</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Şeffaf fiyatlandırma — yolculuk öncesi fiyatınızı bilin
            </p>
          </div>

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
                  {PRICE_LIST.slice(0, 8).map((item, i) => (
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

          <div className="text-center mt-6">
            <Link href="/fiyat-listesi" className="btn-secondary">
              Tüm Fiyat Listesi →
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== ABOUT PREVIEW ===== */}
      <AnimatedSection className="py-20 px-4 bg-black/40 backdrop-blur-sm" delay={0.5}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-4">
              <span className="text-gold">2014</span>&apos;ten Bu Yana
              Tüm Durakların Tek Adresi
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              <strong>Doğuş Taksi</strong> olarak 10 yılı aşkın süredir bölgenin en bilinen durakları olan
              Beykent, Erdal, Mert, Limon ve Doruk Taksi&apos;yi tek bir bünyede topladık!
              Bu güçlü birleşim sayesinde araç ağımızı genişlettik ve en hızlı
              hizmeti vermeye başladık.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              Sabit fiyat politikamız ile yolculuk öncesi fiyatınızı bilir,
              sürpriz ücretlerle karşılaşmazsınız. Şehir içi, şehir dışı,
              havalimanı transferi ve daha fazlası için yanınızdayız.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-xl bg-[var(--color-bg-card)]">
                <div className="text-2xl font-black text-gold">10+</div>
                <div className="text-xs text-[var(--color-text-muted)]">Yıl Tecrübe</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[var(--color-bg-card)]">
                <div className="text-2xl font-black text-gold">50K+</div>
                <div className="text-xs text-[var(--color-text-muted)]">Mutlu Müşteri</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-[var(--color-bg-card)]">
                <div className="text-2xl font-black text-gold">24/7</div>
                <div className="text-xs text-[var(--color-text-muted)]">Kesintisiz Hizmet</div>
              </div>
            </div>

            <Link href="/hakkimizda" className="btn-primary">
              Daha Fazla Bilgi →
            </Link>
          </div>

          <div className="relative">
            <div className="card p-8 text-center">
              <div className="relative z-10">
                <div className="text-8xl mb-4 animate-float">🚕</div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Güvenli Yolculuğun Adresi</h3>
                <p className="text-[var(--color-text-secondary)]">B ve B1 sınıfı araçlarımız ile konforlu ulaşım</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== AI ASSISTANT SECTION ===== */}
      <AnimatedSection className="py-20 px-4 relative overflow-hidden" delay={0.6}>
        {/* Background effect */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5 blur-[120px]" style={{ background: "linear-gradient(135deg, #00d4ff, #FFE473)" }} />

        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] mb-6">
              <span className="text-sm" style={{ color: "#00d4ff" }}>🤖 Yapay Zeka Destekli</span>
            </div>
            <h2 className="section-title">
              <span className="text-gold">AI Asistan</span> Telefonunuza Cevap Veriyor
            </h2>
            <p className="section-subtitle mx-auto">
              7/24 yapay zeka destekli telefon asistanımız aramanızı karşılar,
              bilgi verir ve taksi çağırmanıza yardımcı olur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Phone simulation */}
            <div className="flex justify-center">
              <div className="w-[300px] rounded-[36px] p-3 border-2 border-white/10 bg-[var(--color-bg-card)]" style={{ boxShadow: "0 0 60px rgba(0,212,255,0.1)" }}>
                {/* Phone top */}
                <div className="w-24 h-5 mx-auto mb-4 rounded-full bg-[var(--color-bg-primary)]" />

                {/* Chat interface */}
                <div className="bg-[var(--color-bg-primary)] rounded-2xl p-4 space-y-3" style={{ minHeight: "380px" }}>
                  {/* AI greeting */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "var(--color-gold-glow)" }}>🤖</div>
                    <div className="bg-[var(--color-bg-card)] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                      <p className="text-xs text-[var(--color-text-primary)]">
                        Merhaba! Doğuş Taksi&apos;ye (Beykent, Erdal, Mert) hoş geldiniz. Size nasıl yardımcı olabilirim?
                      </p>
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]" style={{ background: "var(--gradient-gold)" }}>
                      <p className="text-xs text-[#0a0a0f] font-medium">
                        Beylikdüzü&apos;nden havalimanına gitmek istiyorum
                      </p>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "var(--color-gold-glow)" }}>🤖</div>
                    <div className="bg-[var(--color-bg-card)] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                      <p className="text-xs text-[var(--color-text-primary)]">
                        Tabii! İstanbul Havalimanı&apos;na Beylikdüzü&apos;nden tahmini fiyat
                        <span className="text-[var(--color-gold)] font-bold"> 1200 ₺</span> dir.
                        Hemen bir araç yönlendireyim mi?
                      </p>
                    </div>
                  </div>

                  {/* User confirmation */}
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]" style={{ background: "var(--gradient-gold)" }}>
                      <p className="text-xs text-[#0a0a0f] font-medium">
                        Evet lütfen, 30 dakika içinde olabilir mi?
                      </p>
                    </div>
                  </div>

                  {/* AI final */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "var(--color-gold-glow)" }}>🤖</div>
                    <div className="bg-[var(--color-bg-card)] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                      <p className="text-xs text-[var(--color-text-primary)]">
                        ✅ Tamamdır! En yakın aracımız <span className="text-[var(--color-success)]">15 dakika</span> içinde yanınızda olacak. İyi yolculuklar! 🚕
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone bottom */}
                <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Nasıl Çalışır?
              </h3>

              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Bizi Arayın",
                    desc: "0545 457 27 00 numarasını aradığınızda AI asistanımız sizi karşılar",
                    icon: "📞",
                  },
                  {
                    step: "2",
                    title: "İhtiyacınızı Belirtin",
                    desc: "Nereye gitmek istediğinizi söyleyin, AI anlık fiyat bilgisi verir",
                    icon: "🗣️",
                  },
                  {
                    step: "3",
                    title: "Taksiniz Yola Çıksın",
                    desc: "Onay verdiğinizde en yakın aracımız konumunuza yönlendirilir",
                    icon: "🚕",
                  },
                  {
                    step: "4",
                    title: "Güvenle Yolculuk",
                    desc: "Profesyonel şoförümüz sizi güvenle hedefinize ulaştırır",
                    icon: "✅",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-bg-card)] border border-white/5 hover:border-[rgba(255,228,115,0.15)] transition-colors">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--color-gold-glow)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-primary)] mb-0.5">
                        <span className="text-[var(--color-gold)] mr-1">Adım {item.step}:</span>
                        {item.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.05)]">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  💡 <strong className="text-[var(--color-text-primary)]">İpucu:</strong> WhatsApp üzerinden de konumunuzu paylaşarak taksi çağırabilirsiniz.
                  AI asistanımız hem telefonda hem yazılı mesajlarda yanınızda!
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FAQ SECTION ===== */}
      <AnimatedSection className="py-20 px-4" delay={0.2}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Sıkça Sorulan <span className="text-gold">Sorular</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Merak ettiğiniz her şey burada
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((faq, i) => (
              <details key={i} className="card group cursor-pointer">
                <summary className="relative z-10 font-semibold text-[var(--color-text-primary)] list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-gold)] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="relative z-10 mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FINAL CTA ===== */}
      <AnimatedSection className="py-20 px-4 bg-black/40 backdrop-blur-sm relative overflow-hidden" delay={0.4}>
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]" style={{ background: "var(--gradient-gold)" }} />

        <div className="max-w-[600px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Hemen <span className="text-gold">Taksi Çağırın</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            Nerede olursanız olun, tek bir aramayla kapınızda oluyoruz.
            Sabit fiyat, güvenli yolculuk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={SITE_CONFIG.phoneHref} className="btn-primary text-lg px-8 py-4">
              📞 {SITE_CONFIG.phone}
            </a>
            <a
              href={`${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8 py-4"
              style={{ borderColor: "#25d366", color: "#25d366" }}
            >
              💬 WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
