import { OPENAI_API_KEY } from "$env/static/private";

export async function POST({ request }) {
  try {
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY in environment." }),
        { status: 500 }
      );
    }

    const body = await request.json();
    const { hotelName, language, season, vibe, emailType } = body;

    const safeHotelName = hotelName?.trim() || "our boutique hotel";
    const safeLanguage = language || "en";

    const systemMessage = {
      role: "system",
      content:
        "You are an expert email copywriter for boutique and luxury hotels. " +
        "Write warm, refined, hospitality-focused emails with a strong emotional connection. " +
        "Always include a clear, compelling subject line."
    };

    const userMessage = {
      role: "user",
      content: `Create a guest email for the following hotel context.

Hotel Name: ${safeHotelName}
Email Type: ${emailType || "generic"}
Season: ${season || "not specified"}
Vibe / Tone: ${vibe || "not specified"}
Language: ${safeLanguage}

Requirements:
- Write the email in the specified language.
- Start with "Subject:" followed by the subject line.
- Tone: boutique hotel, refined, warm, human.
- No meta commentary. Only output the email text.`
    };

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [systemMessage, userMessage],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    if (!apiRes.ok) {
      const err = await apiRes.text();
      console.error("OpenAI API error:", err);
      return new Response(
        JSON.stringify({ error: "Error from OpenAI API." }),
        { status: 500 }
      );
    }

    const data = await apiRes.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No content generated.";

    return new Response(
      JSON.stringify({ output: content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected server error." }),
      { status: 500 }
    );
  }
}
