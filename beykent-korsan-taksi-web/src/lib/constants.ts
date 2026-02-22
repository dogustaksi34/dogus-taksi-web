export const SITE_CONFIG = {
    name: "Doğuş Taksi",
    url: "https://beykentkorsantaksi.shop", // Will update after domain selection
    description: "Doğuş Taksi: Beykent, Erdal, Mert, Limon ve Doruk Taksi'nin birleşiminden oluşan, bölgenin en büyük ve en güvenilir korsan taksi durağı. Sabit fiyat garantisiyle 7/24 hizmetinizde.",
    phone: "0545 457 27 00",
    phoneHref: "tel:+905454572700",
    whatsapp: "https://wa.me/905454572700",
    whatsappText: "Merhaba, kolay gelsin taksi lazım",
    keywords: [
        "doğuş taksi",
        "erdal taksi",
        "mert taksi",
        "limon taksi",
        "doruk taksi",
        "beykent korsan taksi",
        "beylikdüzü korsan taksi",
        "beylikdüzü taksi",
        "esenyurt korsan taksi",
        "korsan taksi fiyatları",
        "ucuz taksi",
        "7/24 taksi"
    ],
    author: "Doğuş Taksi İletişim",
} as const;

export const NAV_LINKS = [
    { label: "Anasayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    {
        label: "Hizmetlerimiz",
        href: "/hizmetlerimiz",
        children: [
            { label: "Beylikdüzü Korsan Taksi", href: "/beylikduzu-korsan-taksi" },
            { label: "Beykent Korsan Taksi", href: "/beykent-korsan-taksi" },
            { label: "Yakuplu Korsan Taksi", href: "/yakuplu-korsan-taksi" },
            { label: "Esenyurt Korsan Taksi", href: "/esenyurt-korsan-taksi" },
            { label: "Gürpınar Korsan Taksi", href: "/gurpinar-korsan-taksi" },
            { label: "Büyükçekmece Korsan Taksi", href: "/buyukcekmece-korsan-taksi" },
            { label: "Avcılar Korsan Taksi", href: "/avcilar-korsan-taksi" },
            { label: "Bahçeşehir Korsan Taksi", href: "/bahcesehir-korsan-taksi" },
        ],
    },
    { label: "Fiyat Listesi", href: "/fiyat-listesi" },
    { label: "SSS", href: "/sss" },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
] as const;

export const ADVANTAGES = [
    { icon: "💰", title: "Taksimetre Açılış Ücreti Yok", desc: "Sabit fiyat garantisi ile sürpriz ücret yok" },
    { icon: "🕐", title: "7/24 Hizmet", desc: "Günün her saati yanınızdayız" },
    { icon: "🚗", title: "Konforlu Araçlar", desc: "B ve B1 sınıfı bakımlı araç filosu" },
    { icon: "📍", title: "Nereye Çağırırsanız Oradayız", desc: "En kısa sürede kapınızda" },
    { icon: "🤝", title: "Güler Yüzlü Ekip", desc: "Profesyonel ve deneyimli şoförler" },
    { icon: "💳", title: "Sabit Fiyat", desc: "Fiyat yolculuk öncesi belirlenir, ekstra ücret yok" },
    { icon: "🎖️", title: "2014'ten Beri Hizmet", desc: "10+ yıllık tecrübe ve güven" },
    { icon: "🏥", title: "Şehit Aileleri İçin Ücretsiz", desc: "Sosyal sorumluluk projemiz" },
] as const;

export const SERVICE_AREAS = [
    {
        slug: "beylikduzu-korsan-taksi",
        name: "Beylikdüzü",
        fullName: "Beylikdüzü Korsan Taksi",
        description: "Beylikdüzü'nün her noktasında 7/24 korsan taksi hizmeti. Sabit fiyat, konforlu araçlar.",
        neighborhoods: ["Yakuplu", "Gürpınar", "Adnan Kahveci", "Barış", "Dereağzı", "Büyükşehir", "Cumhuriyet"],
    },
    {
        slug: "beykent-korsan-taksi",
        name: "Beykent",
        fullName: "Beykent Korsan Taksi",
        description: "Beykent Mahallesi ve çevresinde güvenilir korsan taksi hizmeti. Uygun fiyat garantisi.",
        neighborhoods: ["Beykent 1. Bölge", "Beykent 2. Bölge", "Beykent 3. Bölge", "Beykent 4. Bölge"],
    },
    {
        slug: "yakuplu-korsan-taksi",
        name: "Yakuplu",
        fullName: "Yakuplu Korsan Taksi",
        description: "Yakuplu ve çevresinde hızlı korsan taksi hizmeti. Hesaplı, güvenli, 7/24.",
        neighborhoods: ["Yakuplu Merkez", "Yakuplu Sanayi", "Yakuplu Sahil"],
    },
    {
        slug: "esenyurt-korsan-taksi",
        name: "Esenyurt",
        fullName: "Esenyurt Korsan Taksi",
        description: "Esenyurt genelinde sabit fiyatlı korsan taksi. Ekonomik ve konforlu ulaşım.",
        neighborhoods: ["Kıraç", "Fatih", "Yeşilkent", "Ardıçlı", "Pınar", "Saadetdere"],
    },
    {
        slug: "gurpinar-korsan-taksi",
        name: "Gürpınar",
        fullName: "Gürpınar Korsan Taksi",
        description: "Gürpınar sahil ve çevresinde güvenilir taksi hizmeti. Sabit fiyat politikası.",
        neighborhoods: ["Gürpınar Sahil", "Gürpınar Merkez", "Gürpınar Marina"],
    },
    {
        slug: "buyukcekmece-korsan-taksi",
        name: "Büyükçekmece",
        fullName: "Büyükçekmece Korsan Taksi",
        description: "Büyükçekmece ilçesinde 7/24 korsan taksi hizmeti. Havalimanı transfer dahil.",
        neighborhoods: ["Büyükçekmece Merkez", "Mimaroba", "Kamiloba", "Tepecik"],
    },
    {
        slug: "avcilar-korsan-taksi",
        name: "Avcılar",
        fullName: "Avcılar Korsan Taksi",
        description: "Avcılar ve çevresinde hızlı, güvenilir korsan taksi hizmeti.",
        neighborhoods: ["Avcılar Merkez", "Cihangir", "Ambarlı", "Denizköşkler", "Firuzköy"],
    },
    {
        slug: "bahcesehir-korsan-taksi",
        name: "Bahçeşehir",
        fullName: "Bahçeşehir Korsan Taksi",
        description: "Bahçeşehir 1. ve 2. kısım dahil tüm bölgelerde korsan taksi hizmeti.",
        neighborhoods: ["Bahçeşehir 1. Kısım", "Bahçeşehir 2. Kısım", "Bahçeşehir Gölet"],
    },
] as const;

export const PRICE_LIST = [
    { from: "Beykent", to: "Taksim", price: "450 ₺" },
    { from: "Beykent", to: "Kadıköy", price: "500 ₺" },
    { from: "Beykent", to: "İstanbul Havalimanı", price: "600 ₺" },
    { from: "Beykent", to: "Sabiha Gökçen", price: "800 ₺" },
    { from: "Beykent", to: "Bakırköy", price: "350 ₺" },
    { from: "Beykent", to: "Ataköy", price: "300 ₺" },
    { from: "Beykent", to: "Beylikdüzü Migros", price: "100 ₺" },
    { from: "Beykent", to: "Esenyurt", price: "150 ₺" },
    { from: "Beylikdüzü", to: "Taksim", price: "500 ₺" },
    { from: "Beylikdüzü", to: "İstanbul Havalimanı", price: "550 ₺" },
    { from: "Beylikdüzü", to: "Atatürk Havalimanı (Fuar)", price: "350 ₺" },
    { from: "Beylikdüzü", to: "Levent", price: "450 ₺" },
] as const;

export const FAQ_ITEMS = [
    {
        question: "Korsan taksi nedir?",
        answer: "Korsan taksi, taksimetre kullanmadan sabit fiyatla hizmet veren ulaşım hizmetidir. Yolculuk öncesi fiyat belirlenir, sürpriz ücret çıkmaz.",
    },
    {
        question: "Doğuş Taksi fiyatları nasıl belirleniyor?",
        answer: "Fiyatlarımız gideceğiniz lokasyona göre belirlenir ve yolculuk öncesinde size bildirilir. Taksimetre açılış ücreti yoktur, söylenen fiyat son fiyattır.",
    },
    {
        question: "Gece saatlerinde de hizmet veriyor musunuz?",
        answer: "Evet, 7/24 kesintisiz hizmet vermekteyiz. Gece veya gündüz, dilediğiniz saatte bizi arayabilirsiniz.",
    },
    {
        question: "Havalimanı transferi yapıyor musunuz?",
        answer: "Evet, İstanbul Havalimanı ve Sabiha Gökçen Havalimanı'na transfer hizmeti vermekteyiz. Sabit fiyat garantisi ile.",
    },
    {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer: "Nakit ve kredi/banka kartı ile ödeme kabul ediyoruz.",
    },
    {
        question: "Araçlarınız ne kadar yeni?",
        answer: "Araç filomuz düzenli bakımlı B ve B1 sınıfı araçlardan oluşmaktadır. Konforunuz ve güvenliğiniz için araçlarımız düzenli servise girmektedir.",
    },
    {
        question: "Büyük bagaj veya eşya taşıma yapıyor musunuz?",
        answer: "Evet, büyük bagaj, kargo ve paket taşımacılığı da yapmaktayız. Havalimanı transferlerinde büyük valizleriniz sorun olmaz.",
    },
    {
        question: "Nasıl taksi çağırabilirim?",
        answer: "0545 457 27 00 numarasını arayarak veya WhatsApp üzerinden bize ulaşabilirsiniz. Konumunuzu paylaşmanız yeterli.",
    },
] as const;
