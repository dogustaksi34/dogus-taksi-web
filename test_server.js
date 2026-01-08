const axios = require('axios');

async function testServer() {
    const baseURL = 'http://127.0.0.1:3000';

    console.log('1. Health Check Test Ediliyor...');
    try {
        const health = await axios.get(`${baseURL}/health`);
        console.log('✅ Health OK:', health.data);
    } catch (err) {
        console.error('❌ Health Failed:', err.message);
        process.exit(1);
    }

    console.log('\n2. Müşteri Kayıt Test Ediliyor (Mock)...');
    try {
        const response = await axios.post(`${baseURL}/api/musteri-kaydet`, {
            message: {
                call: { customer: { number: '+905551234567' } },
                functionCall: {
                    parameters: {
                        isim: 'Test Müşterisi',
                        cinsiyet: 'erkek'
                    }
                }
            }
        });
        console.log('✅ Kayıt Sonucu:', response.data);
    } catch (err) {
        console.error('❌ Kayıt Failed:', err.message);
    }

    console.log('\n3. Hafıza Sorgu Test Ediliyor...');
    try {
        const response = await axios.post(`${baseURL}/api/musteri-hafiza`, {
            message: {
                call: { customer: { number: '+905551234567' } }
            }
        });
        // JSON içindeki JSON'u parse etmemiz gerekebilir sunucu o formatta dönüyor
        const resultObj = JSON.parse(response.data.result);
        console.log('✅ Hafıza Sonucu:', resultObj);
    } catch (err) {
        console.error('❌ Hafıza Failed:', err.message);
    }
}

testServer();
