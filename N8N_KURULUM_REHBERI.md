# VAPI DOĞUŞ TAKSİ - n8n KURULUM REHBERİ

## HAZIR DOSYALAR

Masaüstünüzdeki `vapi_dogus_taksi` klasöründe şu dosyalar var:

```
vapi_dogus_taksi/
├── system_prompt.txt          # Vapi System Prompt
├── functions.json             # Vapi Fonksiyon Tanımları
├── KURULUM_REHBERI.md         # Bu dosya
└── n8n_workflows/
    ├── 1_vapi_hafiza_modulu.json      # Müşteri hafıza sorgusu
    ├── 2_vapi_musteri_kaydet.json     # Müşteri bilgisi kaydetme
    ├── 3_fiyat_hesapla.json           # Fiyat hesaplama (Supabase + Google)
    └── 4_vapi_whatsapp_bildirim.json  # WhatsApp admin bildirimi
```

---

## ADIM 1: n8n'E WORKFLOW'LARI IMPORT ETME

### Her workflow için:

1. n8n'i açın
2. Sol menüden **Workflows** > **Add Workflow** tıklayın
3. Sağ üstteki **3 nokta menüsü (⋮)** > **Import from File** seçin
4. İlgili JSON dosyasını seçin
5. **Save** tıklayın

### Import sırası:
1. `1_vapi_hafiza_modulu.json`
2. `2_vapi_musteri_kaydet.json`
3. `3_fiyat_hesapla.json`
4. `4_vapi_whatsapp_bildirim.json`

---

## ADIM 2: CREDENTIAL'LARI AYARLAMA

### Supabase Credential

Workflow'larda Supabase credential'ı kullanılıyor. Mevcut credential'ınızı kullanın:
- **ID:** `Bn1HcqU0Cuto4vIc`
- **Name:** `TAKSİ YAPAY ZEKA SİSTEMİ`

Eğer farklı bir credential kullanıyorsanız, her Supabase node'unda credential'ı güncelleyin.

### Postgres Credential (Fiyat Hesaplama için)

Fiyat hesaplama workflow'u Postgres node kullanıyor:
- **ID:** `LtVJaElJ076WoPhs`
- **Name:** `Postgres account 3`

---

## ADIM 3: WEBHOOK URL'LERİNİ ALMA

Her workflow'u aktif ettikten sonra webhook URL'sini kopyalayın:

1. Workflow'u açın
2. **Webhook** node'una tıklayın
3. **Test URL** veya **Production URL** kopyalayın

### Webhook Path'leri:

| Workflow | Path | Tam URL Örneği |
|----------|------|----------------|
| Hafıza Sorgula | `/vapi-hafiza-sorgula` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-hafiza-sorgula` |
| Müşteri Kaydet | `/vapi-musteri-kaydet` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-musteri-kaydet` |
| Fiyat Hesapla | `/vapi-fiyat-hesapla` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-fiyat-hesapla` |
| Admin Bildir | `/vapi-admin-bildir` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-admin-bildir` |

---

## ADIM 4: VAPI DASHBOARD AYARLARI

### 4.1 Assistant Oluşturma

1. https://dashboard.vapi.ai adresine gidin
2. **Assistants** > **Create Assistant**
3. İsim: `Dogus Taksi - Cimo`

### 4.2 Model Ayarları

```
Provider: OpenAI
Model: gpt-4o
Temperature: 0.3
Max Tokens: 250
```

### 4.3 System Prompt

`system_prompt.txt` dosyasındaki içeriği **System Prompt** alanına yapıştırın.

### 4.4 Voice Ayarları (Türkçe)

```
Provider: ElevenLabs
Voice: Antoni (erkek) veya Rachel (kadın)
Language: Turkish (tr-TR)
Stability: 0.5
Similarity Boost: 0.75
```

### 4.5 Transcriber Ayarları (Türkçe)

```
Provider: Deepgram
Model: nova-2
Language: tr (Turkish)
```

---

## ADIM 5: VAPI FONKSİYONLARI EKLEME

Vapi Dashboard'da **Functions** sekmesine gidin ve şu fonksiyonları ekleyin:

### Fonksiyon 1: musteri_hafiza_sorgula

```json
{
  "name": "musteri_hafiza_sorgula",
  "description": "Çağrı başladığında müşterinin telefon numarasına göre veritabanından geçmiş bilgilerini sorgular.",
  "parameters": {
    "type": "object",
    "properties": {},
    "required": []
  },
  "serverUrl": "https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-hafiza-sorgula"
}
```

### Fonksiyon 2: musteri_bilgi_kaydet

```json
{
  "name": "musteri_bilgi_kaydet",
  "description": "Yeni müşteri bilgilerini veya mevcut müşterinin güncel bilgilerini veritabanına kaydeder.",
  "parameters": {
    "type": "object",
    "properties": {
      "isim": {
        "type": "string",
        "description": "Müşterinin adı"
      },
      "son_konum": {
        "type": "string",
        "description": "Müşterinin son gittiği konum"
      },
      "cinsiyet": {
        "type": "string",
        "enum": ["erkek", "kadin"],
        "description": "Müşterinin cinsiyeti"
      }
    },
    "required": ["isim"]
  },
  "serverUrl": "https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-musteri-kaydet"
}
```

### Fonksiyon 3: calculate_dynamic_fare

```json
{
  "name": "calculate_dynamic_fare",
  "description": "Çıkış ve varış noktalarına göre fiyat hesaplar. Önce fiyat listesine bakar, yoksa Google Maps ile hesaplar.",
  "parameters": {
    "type": "object",
    "properties": {
      "cikis_noktasi": {
        "type": "string",
        "description": "Müşterinin alınacağı konum"
      },
      "varis_noktasi": {
        "type": "string",
        "description": "Müşterinin gideceği konum"
      },
      "yolcu_sayisi": {
        "type": "integer",
        "description": "Yolcu sayısı"
      },
      "bagaj_sayisi": {
        "type": "integer",
        "description": "Büyük bagaj/valiz sayısı"
      }
    },
    "required": ["cikis_noktasi", "varis_noktasi"]
  },
  "serverUrl": "https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-fiyat-hesapla"
}
```

### Fonksiyon 4: notify_admin

```json
{
  "name": "notify_admin",
  "description": "Özel durumlar için yöneticiye WhatsApp bildirimi gönderir.",
  "parameters": {
    "type": "object",
    "properties": {
      "musteri_ismi": {
        "type": "string",
        "description": "Müşterinin adı"
      },
      "talep_tipi": {
        "type": "string",
        "enum": ["buyuk_arac", "iptal_talebi", "taksi_nerede", "gidis_donus", "evcil_hayvan", "vip_talep", "sistem_hatasi", "diger"],
        "description": "Talep/sorun türü"
      },
      "detay": {
        "type": "string",
        "description": "Ek detaylar ve notlar"
      },
      "cikis_noktasi": {
        "type": "string",
        "description": "Çıkış noktası"
      },
      "varis_noktasi": {
        "type": "string",
        "description": "Varış noktası"
      }
    },
    "required": ["talep_tipi", "detay"]
  },
  "serverUrl": "https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-admin-bildir"
}
```

### Fonksiyon 5: end_call

Vapi'nin yerleşik **End Call Function** özelliğini kullanın.

---

## ADIM 6: TELEFON NUMARASI BAĞLAMA

### SIP Trunk ile Kendi Numaranızı Bağlama (+908503468309)

1. Vapi Dashboard > **Phone Numbers** > **Import via SIP**
2. SIP sağlayıcınızdan aldığınız bilgileri girin
3. Numarayı Assistant'a bağlayın

---

## ADIM 7: TEST

### n8n Test

1. Her workflow'u açın
2. Webhook node'undaki **Test URL**'i kopyalayın
3. Postman veya curl ile test edin:

```bash
curl -X POST https://n8nyeni.beykentkorsantaksi.shop/webhook-test/vapi-hafiza-sorgula \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "call": {
        "customer": {
          "number": "+905551234567"
        }
      }
    }
  }'
```

### Vapi Test

1. Dashboard'da Assistant'ı açın
2. **Test** butonuna tıklayın
3. Mikrofon izni verin
4. Konuşarak test edin

---

## RETELL vs VAPI FARKLARI

| Özellik | Retell Format | Vapi Format |
|---------|---------------|-------------|
| Telefon | `$json.body.call.from_number` | `$json.body.message.call.customer.number` |
| Parametreler | `$json.body.args.isim` | `$json.body.message.functionCall.parameters.isim` |
| Webhook Response | `{ success: true }` | `{ result: "mesaj" }` |

---

## CHECKLIST

- [ ] 4 workflow import edildi
- [ ] Credential'lar ayarlandı
- [ ] Workflow'lar aktif edildi
- [ ] Webhook URL'leri kopyalandı
- [ ] Vapi Assistant oluşturuldu
- [ ] System Prompt eklendi
- [ ] 5 fonksiyon eklendi
- [ ] Voice ve Transcriber Türkçe ayarlandı
- [ ] Telefon numarası bağlandı
- [ ] Test araması yapıldı
