import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { season, vibe, language } = await request.json();

    const prompt = `
You are the NICE-LAMP Email Engine, specialized in boutique hotels.

Create a dual-output email with:
- Season: ${season}
- Tone family: ${vibe}
- Language: ${language}

Follow NICE-LAMP emotional-luxury rules:
- Chic, sensory, elegant
- Story-driven for boutique hospitality
- No clichés
- No corporate tone
- Use atmosphere, warmth, subtle persuasion

Output JSON ONLY in this format:

{
  "subject": "...",
  "preview": "...",
  "long_email": "...",
  "short_email": "...",
  "cta": "..."
}
    `;

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.1",
        messages: [
          { role: "system", content: "You are the NICE-LAMP Email Engine." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await apiRes.json();

    let parsed;
    try {
      parsed = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      console.error("JSON parse error:", e);
      return json({ error: "Model returned invalid JSON." }, { status: 500 });
    }

    return json(parsed);

  } catch (error) {
    console.error("Kernel error:", error);
    return json({ error: "Kernel failed." }, { status: 500 });
  }
}
