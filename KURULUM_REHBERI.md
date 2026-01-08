# VAPI DOĞUŞ TAKSİ - KURULUM REHBERİ

## 1. VAPI DASHBOARD AYARLARI

### 1.1 Assistant Oluşturma

1. https://dashboard.vapi.ai adresine gidin
2. Sol menüden **"Assistants"** seçin
3. **"Create Assistant"** butonuna tıklayın
4. İsim: `Dogus Taksi - Cimo`

### 1.2 Model Ayarları

```
Provider: OpenAI (veya Anthropic)
Model: gpt-4o (önerilen) veya claude-3-5-sonnet
Temperature: 0.3 (düşük tutun - tutarlılık için)
Max Tokens: 250 (kısa cevaplar için)
```

### 1.3 System Prompt

`system_prompt.txt` dosyasındaki içeriği **System Prompt** alanına yapıştırın.

### 1.4 First Message (İlk Mesaj)

Bu alanı BOŞ bırakın. Asistan `musteri_hafiza_sorgula` fonksiyonunu çağırıp sonuca göre selamlama yapacak.

Alternatif olarak şunu yazabilirsiniz:
```
(Sessizce müşteri bilgilerini kontrol ediyorum...)
```

### 1.5 Voice Ayarları

```
Provider: ElevenLabs (önerilen)
Voice:
  - Erkek ses için: "Antoni" veya "Josh"
  - Kadın ses için: "Rachel" veya "Bella"

Türkçe için özel ayar:
  - Language: Turkish (tr-TR)

Stability: 0.5
Similarity Boost: 0.75
Speed: 1.0 (normal hız)
```

### 1.6 Transcriber (Ses Tanıma) Ayarları

```
Provider: Deepgram (önerilen Türkçe için)
Model: nova-2
Language: tr (Turkish)
```

**ÖNEMLİ:** Türkçe ses tanıma için Deepgram tercih edin.

---

## 2. FUNCTIONS (TOOLS) EKLEME

### 2.1 Dashboard'dan Function Ekleme

1. Assistant ayarlarında **"Functions"** sekmesine gidin
2. Her fonksiyon için **"Add Function"** tıklayın
3. `functions.json` dosyasındaki her fonksiyonu ekleyin

### 2.2 Fonksiyon Listesi

| Fonksiyon | Açıklama | Server URL |
|-----------|----------|------------|
| musteri_hafiza_sorgula | Eski müşteri kontrolü | /api/musteri-hafiza |
| musteri_bilgi_kaydet | Müşteri bilgisi kaydetme | /api/musteri-kaydet |
| calculate_dynamic_fare | Fiyat hesaplama | /api/fiyat-hesapla |
| notify_admin | Yetkiliye bildirim | /api/admin-bildir |
| end_call | Görüşmeyi sonlandır | (Vapi native) |

### 2.3 end_call Özel Ayarı

`end_call` fonksiyonu için Vapi'nin yerleşik **"End Call"** özelliğini kullanın:
1. Function eklerken **"Type"** olarak **"End Call Function"** seçin
2. Bu sayede asistan görüşmeyi otomatik kapatabilir

---

## 3. WEBHOOK ENDPOINT'LERİ

### 3.1 Gerekli Endpoint'ler

Backend'inizde (Node.js/Python/vb.) şu endpoint'leri oluşturun:

```
POST /api/musteri-hafiza
POST /api/musteri-kaydet
POST /api/fiyat-hesapla
POST /api/admin-bildir
```

### 3.2 Vapi Webhook Formatı

Vapi fonksiyon çağırdığında şu formatta istek gönderir:

```json
{
  "message": {
    "type": "function-call",
    "functionCall": {
      "name": "musteri_hafiza_sorgula",
      "parameters": {
        "telefon_numarasi": "+905551234567"
      }
    },
    "call": {
      "id": "call_xxx",
      "customer": {
        "number": "+905551234567"
      }
    }
  }
}
```

### 3.3 Beklenen Response Formatı

```json
{
  "result": "Sonuç mesajı buraya yazılacak"
}
```

---

## 4. ÖRNEK WEBHOOK KODLARI

### 4.1 musteri_hafiza_sorgula (Node.js Örneği)

```javascript
app.post('/api/musteri-hafiza', async (req, res) => {
  const { functionCall, call } = req.body.message;
  const telefon = call.customer.number;

  // Veritabanından müşteri sorgula
  const musteri = await db.collection('musteriler').findOne({ telefon });

  if (musteri) {
    res.json({
      result: JSON.stringify({
        tanidik_mi: true,
        isim: musteri.isim,
        cinsiyet: musteri.cinsiyet,
        son_konum: musteri.son_konum,
        durum_mesaji: `En son ${musteri.son_konum}'a gitmiştiniz.`
      })
    });
  } else {
    res.json({
      result: JSON.stringify({
        tanidik_mi: false,
        isim: null
      })
    });
  }
});
```

### 4.2 calculate_dynamic_fare (Node.js Örneği)

```javascript
app.post('/api/fiyat-hesapla', async (req, res) => {
  const { parameters } = req.body.message.functionCall;
  const { cikis_noktasi, varis_noktasi, yolcu_sayisi, bagaj_sayisi } = parameters;

  try {
    // Google Maps Distance Matrix API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`, {
        params: {
          origins: cikis_noktasi,
          destinations: varis_noktasi,
          key: process.env.GOOGLE_MAPS_API_KEY,
          language: 'tr'
        }
      }
    );

    const mesafe_km = response.data.rows[0].elements[0].distance.value / 1000;
    const sure_dk = response.data.rows[0].elements[0].duration.value / 60;

    // Fiyat hesaplama
    const baz_fiyat = 100; // Açılış ücreti
    const km_fiyat = 35;   // KM başı ücret
    const toplam = Math.round(baz_fiyat + (mesafe_km * km_fiyat));

    res.json({
      result: `${cikis_noktasi} - ${varis_noktasi} arası yaklaşık ${Math.round(mesafe_km)} kilometre, ${Math.round(sure_dk)} dakikalık yol. Ücretimiz ${toplam} TL olacaktır efendim.`
    });

  } catch (error) {
    res.json({
      result: "HATA: Fiyat hesaplanamadı"
    });
  }
});
```

### 4.3 notify_admin (Node.js + Evolution API Örneği)

```javascript
app.post('/api/admin-bildir', async (req, res) => {
  const { parameters } = req.body.message.functionCall;
  const { telefon_numarasi, musteri_ismi, talep_tipi, detay } = parameters;

  const mesaj = `🚨 DOĞUŞ TAKSİ

Müşteri: ${musteri_ismi || 'Bilinmiyor'}
Telefon: ${telefon_numarasi}
Talep: ${talep_tipi}
Detay: ${detay}`;

  // Evolution API ile WhatsApp mesajı gönder
  await axios.post(
    `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE}`,
    {
      number: process.env.ADMIN_WHATSAPP,
      text: mesaj
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.EVOLUTION_API_KEY
      }
    }
  );

  res.json({
    result: "Yetkili arkadaşımıza bildirim gönderildi."
  });
});
```

---

## 5. TELEFON NUMARASI AYARLARI (SIP TRUNK)

Kendi numaranızı (+908503468309) Vapi'ye bağlamak için SIP Trunk kullanmanız gerekiyor.

### 5.1 SIP Trunk Nedir?

SIP Trunk, telefon numaranızı internet üzerinden VoIP sistemlerine bağlamanızı sağlar. Türkiye'de şu sağlayıcılar SIP desteği sunar:

| Sağlayıcı | Website | Not |
|-----------|---------|-----|
| Netgsm | netgsm.com.tr | Türkiye'nin en yaygın SIP sağlayıcısı |
| Verimor | verimor.com.tr | API desteği güçlü |
| Turkcell Global Bilgi | - | Kurumsal çözümler |
| Vodafone Business | - | Kurumsal SIP Trunk |
| Bulutsantralim | bulutsantralim.com | Kolay kurulum |

### 5.2 Vapi'ye SIP Trunk Bağlama

1. **Vapi Dashboard > Phone Numbers > "Import via SIP"** seçin

2. Gerekli bilgileri girin:
```
SIP URI: sip:+908503468309@sip.provider.com
Username: your_sip_username
Password: your_sip_password
```

3. **Inbound Settings** (Gelen aramalar için):
   - Vapi size bir SIP URI verecek
   - Bu URI'yi SIP sağlayıcınızın panelinde "Forward to" olarak ayarlayın

4. **Outbound Settings** (Giden aramalar için):
   - SIP sağlayıcınızın trunk bilgilerini girin

### 5.3 Netgsm Örnek Kurulum

1. Netgsm paneline giriş yapın
2. **Santral > SIP Trunk** bölümüne gidin
3. Yeni trunk oluşturun
4. Vapi'den aldığınız SIP URI'yi yönlendirme adresi olarak girin
5. Netgsm'in verdiği credentials'ları Vapi'ye girin:
```
Host: sip.netgsm.com.tr
Port: 5060
Username: [netgsm_kullanici_adi]
Password: [netgsm_sifre]
```

### 5.4 Alternatif: BYOC (Bring Your Own Carrier)

Vapi'nin BYOC özelliğini kullanarak:

1. Dashboard > Settings > BYOC
2. Carrier bilgilerinizi girin
3. Numaranızı import edin

---

## 6. TEST VE YAYIN

### 6.1 Dashboard'dan Test

1. Assistant sayfasında **"Test"** butonuna tıklayın
2. Mikrofon izni verin
3. Konuşarak test edin

### 6.2 Web Widget (Opsiyonel)

Web sitenize eklemek için:

```html
<script>
  var vapiInstance = null;

  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://cdn.vapi.ai/vapi-web-embed.min.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);

    g.onload = function() {
      vapiInstance = new Vapi("YOUR_PUBLIC_API_KEY");
    }
  })(document, "script");

  function startCall() {
    vapiInstance.start("YOUR_ASSISTANT_ID");
  }
</script>

<button onclick="startCall()">Taksi Çağır</button>
```

---

## 7. HATA AYIKLAMA

### 7.1 Yaygın Sorunlar ve Çözümleri

| Sorun | Olası Sebep | Çözüm |
|-------|-------------|-------|
| Türkçe anlamıyor | Transcriber dil ayarı | Deepgram + tr ayarı |
| Fonksiyon çalışmıyor | Webhook URL hatalı | URL'yi kontrol et |
| Çok uzun cevaplar | Max tokens yüksek | 200-250'ye düşür |
| Robot gibi konuşuyor | Voice ayarları | Stability'yi 0.4'e düşür |
| Geç cevap veriyor | Model yavaş | gpt-4o-mini dene |

### 7.2 Log Takibi

Dashboard > Calls sekmesinden tüm görüşmeleri dinleyebilir ve transcript okuyabilirsiniz.

---

## 8. ÖNERİLEN YAPILANDIRMA ÖZETİ

```yaml
Assistant:
  name: Dogus Taksi - Cimo
  model: gpt-4o
  temperature: 0.3
  max_tokens: 250

Voice:
  provider: ElevenLabs
  voice_id: Antoni (veya Türkçe custom voice)
  stability: 0.5
  similarity_boost: 0.75

Transcriber:
  provider: Deepgram
  model: nova-2
  language: tr

Functions:
  - musteri_hafiza_sorgula
  - musteri_bilgi_kaydet
  - calculate_dynamic_fare
  - notify_admin
  - end_call (native)
```

---

## 9. CHECKLIST

- [ ] Vapi hesabı oluşturuldu
- [ ] Assistant oluşturuldu
- [ ] System prompt eklendi
- [ ] Voice ayarları yapıldı (Türkçe)
- [ ] Transcriber ayarları yapıldı (Türkçe)
- [ ] Tüm fonksiyonlar eklendi
- [ ] Webhook endpoint'leri hazır
- [ ] Webhook URL'leri fonksiyonlara eklendi
- [ ] Telefon numarası alındı/bağlandı
- [ ] Test araması yapıldı
- [ ] Admin bildirimi test edildi
