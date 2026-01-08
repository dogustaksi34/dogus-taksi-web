# VAPI DOĞUŞ TAKSİ - TÜM DÜZELTMELER VE AYARLAR

## 1. FİYAT HESAPLAMA SORUNU (ÇÖZÜLDÜ)

### Sorun:
n8n fiyat hesaplıyordu ama Vapi'ye yanıt gitmiyordu.

### Çözüm:
`3_vapi_fiyat_hesapla.json` dosyası güncellendi:
- Her dal için ayrı "Yanıt Gönder" node'u eklendi
- Büyük araç, liste fiyatı ve Google fiyatı için 3 ayrı response node

### Yapılacak:
1. n8n'de mevcut "VAPI - Fiyat Hesaplama" workflow'unu sil
2. `n8n_workflows/3_vapi_fiyat_hesapla.json` dosyasını import et
3. Workflow'u aktif et

---

## 2. KİŞİ/BAGAJ SORMA SORUNU (ÇÖZÜLDÜ)

### Sorun:
Her yolcuya kişi ve bagaj sayısı soruyordu.

### Çözüm:
`system_prompt.txt` güncellendi. Artık SADECE şu durumlarda soracak:
- Havalimanı (Sabiha Gökçen, İstanbul Havalimanı)
- Otogar
- Doblo, Vito, VIP, büyük araç talebi

Normal şehir içi talepler için sormayacak.

### Yapılacak:
1. Vapi Dashboard'a git
2. Assistant'ı seç
3. "System Prompt" alanına `system_prompt.txt` içeriğini yapıştır
4. Kaydet

---

## 3. İSİM TANIMA SORUNU (İYİLEŞTİRİLDİ)

### Sorun:
İsimleri yanlış anlıyordu.

### Çözüm:
1. System prompt'a isim onaylama kuralları eklendi
2. Transcriber ayarları önerileri aşağıda

### Vapi Dashboard'da Transcriber Ayarları:
```
Provider: Deepgram
Model: nova-2
Language: tr (Türkçe)
```

**Ek İyileştirme - Keywords/Hints ekle:**
Vapi Dashboard > Assistant > Transcriber bölümünde "Keywords" veya "Hints" varsa, sık kullanılan Türkçe isimleri ekle:
```
Ahmet, Mehmet, Mustafa, Ali, Hasan, Hüseyin, Erdal, Burhan, Burkut,
Ayşe, Fatma, Zeynep, Elif, Hatice, Emine, Murat, Emre, Burak, Serkan,
Osman, Kemal, Yusuf, İbrahim, Ömer, Halil, Ramazan, Süleyman
```

---

## 4. KONUŞMA HIZI VE AKICILIĞI (İYİLEŞTİRME)

### Sorun:
Müşteri ile konuşurken ağır kalıyor, beklemeler oluyor.

### Vapi Dashboard'da Yapılacak Ayarlar:

#### A. Model Ayarları:
```
Model: gpt-4o-mini  (gpt-4o yerine - daha hızlı!)
Temperature: 0.3 (düşük = daha tutarlı)
Max Tokens: 150 (kısa cevaplar için)
```

#### B. Voice Ayarları (ElevenLabs):
```
Provider: 11labs
Voice ID: GDzHdQOi6jjf8zaXhCYD (mevcut)
Model: eleven_turbo_v2_5 (en hızlı!)
Stability: 0.5
Similarity Boost: 0.75
Speed: 1.1 veya 1.15 (biraz hızlandır)
```

#### C. Silencing/Interruption Ayarları:
Vapi Dashboard > Assistant > Advanced Settings:
```
Silence Timeout: 1000ms (1 saniye - daha kısa)
Response Delay: 200ms (mümkün olan en düşük)
Interruption Threshold: 100 (daha hassas)
Backoff Time: 300ms
```

#### D. İlk Mesaj:
```
First Message: "Merhaba Doğuş Taksi buyurun"
```
(Kısa ve net)

---

## 5. WHATSAPP ÖZETİ VE SES KAYDI AYARI

### Sorun:
Çağrı bittiğinde WhatsApp'a özet ve ses kaydı gitmiyor.

### Çözüm - Vapi Dashboard'da Server URL Ayarla:

1. **Vapi Dashboard** > **Assistants** > **Doğuş Taksi - Cimo**
2. **Advanced Settings** veya **Server URL** bölümüne git
3. Şu URL'yi ekle:
```
https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-cagri-ozeti
```

4. **Events** bölümünde şu event'i aktif et:
   - `end-of-call-report` ✅

### n8n'de Yapılacak:
1. `n8n_workflows/5_vapi_cagri_ozeti.json` dosyasını import et
2. Workflow'u aktif et

### Kontrol:
- Test çağrısı yap
- n8n execution history'de çağrı geldiğini gör
- WhatsApp grubunda özet mesajı kontrol et

---

## 6. TÜM WORKFLOW'LARI YENİDEN IMPORT ET

Aşağıdaki workflow'ları n8n'de sil ve yeniden import et:

| Dosya | Webhook Path |
|-------|--------------|
| `1_vapi_hafiza_modulu.json` | `/webhook/vapi-hafiza-sorgula` |
| `2_vapi_musteri_kaydet.json` | `/webhook/vapi-musteri-kaydet` |
| `3_vapi_fiyat_hesapla.json` | `/webhook/vapi-fiyat-hesapla` |
| `4_vapi_whatsapp_bildirim.json` | `/webhook/vapi-admin-bildir` |
| `5_vapi_cagri_ozeti.json` | `/webhook/vapi-cagri-ozeti` |

Her birini import ettikten sonra **AKTİF** yap!

---

## 7. VAPI DASHBOARD TOOL URL'LERİ

Vapi Dashboard'da her tool için doğru URL'lerin ayarlı olduğundan emin ol:

| Tool Adı | Server URL |
|----------|------------|
| `musteri_hafiza_sorgula` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-hafiza-sorgula` |
| `musteri_bilgi_kaydet` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-musteri-kaydet` |
| `calculate_dynamic_fare` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-fiyat-hesapla` |
| `notify_admin` | `https://n8nyeni.beykentkorsantaksi.shop/webhook/vapi-admin-bildir` |

---

## 8. HIZLI TEST CHECKLIST

Tüm ayarları yaptıktan sonra test et:

- [ ] Yeni müşteri olarak ara - isim sorması lazım
- [ ] İsim söyle - kaydetmesi lazım
- [ ] "Beykent'ten Taksim'e gitmek istiyorum" de - direkt fiyat vermeli (kişi sormadan!)
- [ ] "Havalimanına gitmek istiyorum" de - kişi ve bagaj sormalı
- [ ] Fiyat onayı ver - kayıt açması lazım
- [ ] Çağrı bitince WhatsApp'a özet gelmeli

---

## SORUN GİDERME

### Fiyat hala gelmiyor:
1. n8n execution history'yi kontrol et
2. "Yanıt Gönder" node'unun çalışıp çalışmadığını gör
3. Webhook URL'nin doğru olduğundan emin ol

### WhatsApp özeti gelmiyor:
1. Vapi Dashboard'da Server URL ayarlı mı kontrol et
2. Event "end-of-call-report" aktif mi?
3. n8n'de workflow aktif mi?

### Hala yavaş konuşuyor:
1. Model'i gpt-4o-mini yap
2. Voice speed'i 1.15 yap
3. System prompt'u kısalt (şu an kısa)
