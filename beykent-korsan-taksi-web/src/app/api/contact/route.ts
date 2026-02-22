import { NextRequest, NextResponse } from "next/server";

// POST /api/contact — İletişim formundan gelen veriler n8n'e iletilir
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, message } = body;

        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "Tüm alanlar zorunludur" },
                { status: 400 }
            );
        }

        // n8n Webhook'a ilet
        const n8nWebhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
        if (n8nWebhookUrl) {
            await fetch(n8nWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    phone,
                    message,
                    source: "website",
                    timestamp: new Date().toISOString(),
                }),
            });
        }

        return NextResponse.json({
            success: true,
            message: "Mesajınız alındı, en kısa sürede dönüş yapacağız.",
        });
    } catch {
        return NextResponse.json(
            { error: "Form gönderilemedi" },
            { status: 500 }
        );
    }
}
