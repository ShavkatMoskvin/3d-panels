import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, message, _honeypot } = body;

    // Honeypot check: if this hidden field is filled, it's a bot
    if (_honeypot && _honeypot.length > 0) {
      console.log("Honeypot triggered, ignoring request");
      return NextResponse.json({ success: true, shadowed: true });
    }

    // Basic validation: prevent empty or too short "garbage" messages
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Имя слишком короткое" }, { status: 400 });
    }
    if (!contact || contact.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Укажите корректный контакт" }, { status: 400 });
    }
    if (!message || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: "Сообщение слишком короткое" }, { status: 400 });
    }

    const text = `
📩 **НОВОЕ СООБЩЕНИЕ ИЗ ФОРМЫ СВЯЗИ** 📩

👤 **Имя:** ${name}
📱 **Контакт:** ${contact}

💬 **Сообщение:**
${message}
    `;

    // Используем переменные окружения
    // Используем отдельного бота для вопросов, если он задан, иначе основного
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_SUPPORT_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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
