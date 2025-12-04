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

    // ✅ NEW API: JSON output is in data.choices[0].output_text
    const raw = data?.choices?.[0]?.output_text;

    if (!raw) {
      console.error("OpenAI returned unexpected structure:", data);
      return json({ error: "Kernel received unexpected response format." }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("JSON parse error:", e, raw);
      return json({ error: "Model returned invalid JSON." }, { status: 500 });
    }

    return json(parsed);

  } catch (error) {
    console.error("Kernel error:", error);
    return json({ error: "Kernel failed." }, { status: 500 });
  }
}

