import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, address, items, totalPrice, installation } = body;

    // 1. Формируем сообщение для Telegram
    const itemsList = items
      .map((item: any) => `- ${item.name} (${item.quantity} шт.) — ${item.price * item.quantity} ₽`)
      .join("\n");

    const installationInfo = installation?.included 
      ? `\n🛠 **Монтаж:** Включен (+${installation.price} ₽)` 
      : `\n🛠 **Монтаж:** Не требуется (клиент отказался)`;

    const deliveryInfo = `\n🚚 **Доставка:** Бесплатная`;

    const message = `
📦 **НОВЫЙ ЗАКАЗ** 📦

💳 **Статус:** ${body.paymentStatus || "Новый"}
${installationInfo}
${deliveryInfo}

👤 **Клиент:**
- Имя: ${customer.name}
- Телефон: ${customer.phone}
- Email: ${customer.email}

📍 **Адрес:**
- Город: ${address.city}
- Улица: ${address.street}
- Дом: ${address.house}
- Кв: ${address.apartment || "-"}

🛒 **Товары:**
${itemsList}

💰 **Итого:** ${totalPrice} ₽
    `;

    // 2. Отправка в Telegram (через Bot API)
    //const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    //const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    // ВРЕМЕННО для теста (замените в route.ts):
    const TELEGRAM_BOT_TOKEN = "8076366171:AAFYAMBnfp0rpR8GpCnmGbRs0pKLP8knat8";
    const TELEGRAM_CHAT_ID = "96814218";

    console.log("DEBUG: Attempting to send TG message...");
    console.log("DEBUG: Token exists:", !!TELEGRAM_BOT_TOKEN);
    console.log("DEBUG: Chat ID exists:", !!TELEGRAM_CHAT_ID);

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        });
        
        const tgData = await tgRes.json();
        console.log("DEBUG: Telegram API Response:", tgData);
        
        if (!tgRes.ok) {
          console.error("DEBUG: Telegram API Error Details:", tgData);
        }
      } catch (tgError) {
        console.error("DEBUG: Telegram Fetch Error:", tgError);
      }
    } else {
      console.warn("DEBUG: Telegram credentials missing in .env");
    }

    // 3. Сохранение в Google Таблицу (через Apps Script или Google API)
    // Самый простой способ без библиотек - создать Google Apps Script и отправить туда POST запрос
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({
            date: new Date().toLocaleString("ru-RU"),
            ...customer,
            ...address,
            items: itemsList,
            total: totalPrice
          })
        });
      } catch (gsError) {
        console.error("Google Sheets notification failed:", gsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
