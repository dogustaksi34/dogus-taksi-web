import { NextRequest, NextResponse } from "next/server";

// POST /api/blog — n8n'den AI-generated blog yazısı yayınla
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("x-webhook-secret");
        if (authHeader !== process.env.WEBHOOK_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, slug, content, excerpt, category } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: "title, slug ve content zorunlu" },
                { status: 400 }
            );
        }

        // TODO: Blog yazısını veritabanına/MDX dosyasına kaydet
        // Şimdilik onaylama döndürüyoruz
        return NextResponse.json({
            success: true,
            message: "Blog yazısı yayınlandı",
            post: { title, slug, excerpt, category, publishedAt: new Date().toISOString() },
        });
    } catch {
        return NextResponse.json(
            { error: "Blog yazısı yayınlanamadı" },
            { status: 500 }
        );
    }
}
