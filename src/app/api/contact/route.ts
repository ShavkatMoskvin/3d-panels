import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, message } = body;

    const text = `
📩 **НОВОЕ СООБЩЕНИЕ ИЗ ФОРМЫ СВЯЗИ** 📩

👤 **Имя:** ${name}
📱 **Контакт:** ${contact}

💬 **Сообщение:**
${message}
    `;

    // Используем те же учетные данные, что и в заказах
    const TELEGRAM_BOT_TOKEN = "8076366171:AAFYAMBnfp0rpR8GpCnmGbRs0pKLP8knat8";
    const TELEGRAM_CHAT_ID = "96814218";

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
