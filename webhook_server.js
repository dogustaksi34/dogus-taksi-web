/**
 * DOĞUŞ TAKSİ - VAPI WEBHOOK SERVER (HYBRID)
 *
 * Bu dosya tüm Vapi fonksiyonları için webhook endpoint'lerini içerir.
 * Hem MongoDB (Cloud) hem de Yerel Dosya (Local) modunda çalışabilir.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// ============================================
// VERİTABANI YÖNETİCİSİ (HYBRID)
// ============================================
const DB_FILE = path.join(__dirname, 'database.json');
let mongoClient;
let mongoDb;
let isMongoConnected = false;

// Bağlantıyı Başlat
async function initDB() {
  // 1. Önce MongoDB dene
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb')) {
    try {
      console.log('🔄 MongoDB bağlantısı deneniyor...');
      mongoClient = new MongoClient(process.env.MONGODB_URI);
      await mongoClient.connect();
      mongoDb = mongoClient.db('dogus_taksi');
      isMongoConnected = true;
      console.log('✅ MongoDB BAŞARIYLA BAĞLANDI (Cloud Modu)');
      return;
    } catch (error) {
      console.error('❌ MongoDB Hatası:', error.message);
      console.log('⚠️ Yerel dosya moduna geçiliyor...');
    }
  }

  // 2. MongoDB olmazsa Yerel Dosya kullan
  if (!fs.existsSync(DB_FILE)) {
    const initialData = { musteriler: [], fiyat_loglar: [], admin_bildirimler: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
  console.log('🤖 Çalışma Modu: YEREL DOSYA (Local Fallback)');
}

// DB Oku (Unified)
async function dbFindCustomer(telefon) {
  const temizTelefon = telefon.replace(/\D/g, '').slice(-10);

  if (isMongoConnected) {
    return await mongoDb.collection('musteriler').findOne({ telefon: { $regex: temizTelefon } });
  } else {
    // Local
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    return data.musteriler.find(m => m.telefon === temizTelefon);
  }
}

// DB Yaz/Güncelle (Unified)
async function dbUpsertCustomer(customerData) {
  if (isMongoConnected) {
    await mongoDb.collection('musteriler').updateOne(
      { telefon: customerData.telefon },
      {
        $set: customerData,
        $inc: { toplam_yolculuk: 1 },
        $setOnInsert: { ilk_kayit: new Date() }
      },
      { upsert: true }
    );
  } else {
    // Local
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    let index = data.musteriler.findIndex(m => m.telefon === customerData.telefon);

    if (index > -1) {
      data.musteriler[index] = {
        ...data.musteriler[index],
        ...customerData,
        toplam_yolculuk: (data.musteriler[index].toplam_yolculuk || 0) + 1
      };
    } else {
      customerData.ilk_kayit = new Date().toISOString();
      customerData.toplam_yolculuk = 1;
      data.musteriler.push(customerData);
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
}

async function dbLogPrice(logData) {
  if (isMongoConnected) {
    logData.tarih = new Date();
    await mongoDb.collection('fiyat_loglar').insertOne(logData);
  } else {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    logData.tarih = new Date().toISOString();
    data.fiyat_loglar.push(logData);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
}

async function dbLogNotification(notifData) {
  if (isMongoConnected) {
    notifData.tarih = new Date();
    await mongoDb.collection('admin_bildirimler').insertOne(notifData);
  } else {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    notifData.tarih = new Date().toISOString();
    data.admin_bildirimler.push(notifData);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
}

// ============================================
// 1. MÜŞTERİ HAFIZA SORGULA
// ============================================
app.post('/api/musteri-hafiza', async (req, res) => {
  try {
    const { call } = req.body.message || {};
    const telefon = call?.customer?.number || '';

    const musteri = await dbFindCustomer(telefon);

    if (musteri) {
      const hitap = musteri.cinsiyet === 'kadin' ? 'Hanım' : 'Bey';

      res.json({
        result: JSON.stringify({
          tanidik_mi: true,
          isim: musteri.isim,
          hitap: hitap,
          cinsiyet: musteri.cinsiyet,
          son_konum: musteri.son_konum || null,
          son_fiyat: musteri.son_fiyat || null,
          durum_mesaji: musteri.son_konum
            ? `En son ${musteri.son_konum}'a gitmiştiniz.`
            : null,
          toplam_yolculuk: musteri.toplam_yolculuk || 1
        })
      });
    } else {
      res.json({
        result: JSON.stringify({
          tanidik_mi: false,
          isim: null,
          mesaj: "Yeni müşteri, isim sorulmalı"
        })
      });
    }
  } catch (error) {
    console.error('Hafıza hatası:', error);
    res.json({ result: JSON.stringify({ tanidik_mi: false, error: true }) });
  }
});

// ============================================
// 2. MÜŞTERİ BİLGİ KAYDET
// ============================================
app.post('/api/musteri-kaydet', async (req, res) => {
  try {
    const { functionCall, call } = req.body.message || {};
    const params = functionCall?.parameters || {};
    const telefon = params.telefon_numarasi || call?.customer?.number || '';
    const temizTelefon = telefon.replace(/\D/g, '').slice(-10);

    const guncelVeri = {
      telefon: temizTelefon,
      isim: params.isim,
      cinsiyet: params.cinsiyet || 'erkek',
      son_guncelleme: isMongoConnected ? new Date() : new Date().toISOString()
    };

    if (params.son_konum) guncelVeri.son_konum = params.son_konum;
    if (params.son_fiyat) guncelVeri.son_fiyat = params.son_fiyat;

    await dbUpsertCustomer(guncelVeri);

    const hitap = params.cinsiyet === 'kadin' ? 'Hanım' : 'Bey';
    res.json({ result: `Müşteri bilgileri kaydedildi: ${params.isim} ${hitap}` });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.json({ result: "Kayıt sırasında hata oluştu." });
  }
});

// ============================================
// 3. DİNAMİK FİYAT HESAPLA (MOCK DESTEKLİ)
// ============================================
app.post('/api/fiyat-hesapla', async (req, res) => {
  try {
    const { parameters } = req.body.message?.functionCall || {};
    let { cikis_noktasi, varis_noktasi, yolcu_sayisi, bagaj_sayisi } = parameters || {};

    if (!cikis_noktasi || !varis_noktasi) {
      return res.json({ result: "Lütfen çıkış ve varış noktalarını belirtin." });
    }

    // Varsayılan değerler
    yolcu_sayisi = yolcu_sayisi || 1;
    bagaj_sayisi = bagaj_sayisi || 0;

    if (yolcu_sayisi > 4 || bagaj_sayisi > 2) {
      return res.json({ result: "BUYUK_ARAC_GEREKLI" });
    }

    let mesafe_km = 0;
    let sure_dk = 0;

    // Google Maps API Key Kontrolü
    if (process.env.GOOGLE_MAPS_API_KEY && process.env.GOOGLE_MAPS_API_KEY.length > 20) {
      try {
        const mapsResponse = await axios.get(
          'https://maps.googleapis.com/maps/api/distancematrix/json',
          {
            params: {
              origins: cikis_noktasi + ', İstanbul, Türkiye',
              destinations: varis_noktasi + ', İstanbul, Türkiye',
              key: process.env.GOOGLE_MAPS_API_KEY,
              language: 'tr',
              mode: 'driving'
            }
          }
        );
        const element = mapsResponse.data.rows[0]?.elements[0];
        if (element && element.status === 'OK') {
          mesafe_km = element.distance.value / 1000;
          sure_dk = element.duration.value / 60;
        }
      } catch (e) {
        console.log("Maps API hatası, Mock kullanılıyor.");
      }
    }

    if (mesafe_km === 0) {
      mesafe_km = Math.floor(Math.random() * 15) + 5;
      sure_dk = mesafe_km * 2.5;
    }

    // Fiyat Hesapla
    const BAZ_FIYAT = 150;
    const KM_FIYAT = 40;
    const MINIMUM_FIYAT = 250;
    let hesaplanan = BAZ_FIYAT + (mesafe_km * KM_FIYAT);

    const saat = new Date().getHours();
    if (saat >= 22 || saat < 6) hesaplanan *= 1.25;

    const sonFiyat = Math.max(Math.ceil(hesaplanan / 10) * 10, MINIMUM_FIYAT);
    const mesaj = `${cikis_noktasi} - ${varis_noktasi} arası yaklaşık ${Math.round(mesafe_km)} km. Ücretimiz ${sonFiyat} TL olacaktır.`;

    await dbLogPrice({
      cikis: cikis_noktasi,
      varis: varis_noktasi,
      mesafe_km: Math.round(mesafe_km * 10) / 10,
      sure_dk: Math.round(sure_dk),
      fiyat: sonFiyat
    });

    res.json({ result: mesaj });

  } catch (error) {
    console.error('Fiyat hesaplama hatası:', error);
    res.json({ result: "SISTEM_HATASI" });
  }
});

// ============================================
// 4. ADMIN BİLDİRİM
// ============================================
app.post('/api/admin-bildir', async (req, res) => {
  try {
    const { functionCall, call } = req.body.message || {};
    const params = functionCall?.parameters || {};

    const bildirim = {
      telefon: params.telefon_numarasi || call?.customer?.number,
      musteri_ismi: params.musteri_ismi || 'Bilinmiyor',
      talep_tipi: params.talep_tipi,
      detay: params.detay,
      cikis: params.cikis_noktasi || null,
      varis: params.varis_noktasi || null,
      durum: 'bekliyor'
    };

    await dbLogNotification(bildirim);

    // WhatsApp API (Varsa)
    if (process.env.EVOLUTION_API_URL && process.env.EVOLUTION_API_KEY) {
      // WhatsApp gönderme kodu buraya...
    }

    res.json({ result: "Yetkili bilgilendirildi." });

  } catch (error) {
    console.error('Admin bildirim hatası:', error);
    res.json({ result: "Not alındı." });
  }
});

// ============================================
// SERVER BAŞLAT
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mode: isMongoConnected ? 'MONGODB_CLOUD' : 'LOCAL_FILE'
  });
});

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`✅ Server Başlatıldı - Port ${PORT}`);
    console.log(`==================================================\n`);
  });
});
