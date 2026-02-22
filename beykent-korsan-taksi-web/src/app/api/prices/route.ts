import { NextRequest, NextResponse } from "next/server";
import { getPrices } from "@/lib/supabase-server";

// GET /api/prices — Mevcut fiyat listesini getir
// POST /api/prices — n8n'den fiyat güncelle (webhook)
export async function GET() {
    // Bu endpoint n8n veya diğer uygulamalardan fiyat listesini çekmek için
    const PRICE_LIST = await getPrices();
    return NextResponse.json({
        success: true,
        data: PRICE_LIST,
        updatedAt: new Date().toISOString(),
    });
}

export async function POST(request: NextRequest) {
    try {
        // n8n webhook'tan fiyat güncellemesi alabilir
        const body = await request.json();

        // Auth kontrolü — n8n'den gelen webhook secret
        const authHeader = request.headers.get("x-webhook-secret");
        if (authHeader !== process.env.WEBHOOK_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Fiyatları veritabanına/dosyaya kaydet
        // Şimdilik sadece onaylama döndürüyoruz
        return NextResponse.json({
            success: true,
            message: "Fiyatlar güncellendi",
            received: body,
        });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
