import { PRICE_LIST as FALLBACK_PRICES } from "./constants";

export async function getPrices() {
    const SUPABASE_URL = "https://hpzaevsblftkmizfepjj.supabase.co/rest/v1/transfer_fiyatlari?select=kalkis_bolgesi,varis_yeri,fiyat&limit=3000";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwemFldnNibGZ0a21pemZlcGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2NTgxOTgsImV4cCI6MjA4MjIzNDE5OH0.jr-AntjkbdAdnaomCX0lkpg_kWu8IhRrrj5UfpsrlwU";

    try {
        const res = await fetch(SUPABASE_URL, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json"
            },
            next: { revalidate: 60 } // Next.js ISR (60 secs cache)
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch prices: ${res.statusText}`);
        }

        const data = await res.json();
        const formattedPrices = [];

        for (const item of data) {
            if (item.kalkis_bolgesi && item.varis_yeri && item.fiyat) {
                // Ensure correct case: BEYLIKDUZU -> Beylikdüzü to match area.name later, but area names are handled case insensitively using substring.
                // Let's title case the from location so the UI looks nice.
                const fromRaw = item.kalkis_bolgesi.toLowerCase();
                const fromTitleCase = fromRaw.charAt(0).toUpperCase() + fromRaw.slice(1);

                formattedPrices.push({
                    from: fromTitleCase,
                    to: item.varis_yeri,
                    price: `${item.fiyat} ₺`
                });
            }
        }

        return formattedPrices.length > 0 ? formattedPrices : FALLBACK_PRICES;

    } catch (error) {
        console.error("Supabase Error:", error);
        return FALLBACK_PRICES;
    }
}
