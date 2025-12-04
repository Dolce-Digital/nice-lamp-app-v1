import 'dotenv/config';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const body = await request.json();

		// Prepare the payload for the OpenAI REST API
		const apiPayload = {
			model: "gpt-5.1",
			messages: [
				{
					role: "system",
					content:
						"You are the Nice-Lamp Email Engine. Write boutique-hotel email content in an elegant, sensory, warm tone. Output ONLY the email text."
				},
				{
					role: "user",
					content: `Season: ${body.season}\nVibe: ${body.vibe}\nLanguage: ${body.language}\n\nWrite one complete boutique hotel email with sensory details and a PS.`
				}
			],
			temperature: 0.7
		};

		// Make the REST API call
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
			},
			body: JSON.stringify(apiPayload)
		});

		const data = await response.json();

		if (data.error) {
			console.error("OpenAI error:", data.error);
			return json({ ok: false, error: data.error.message }, { status: 500 });
		}

		// Extract the assistant text safely
		const emailText =
			data.choices?.[0]?.message?.content ??
			"(No content returned from the Nice-Lamp Engine)";

		return json({ ok: true, output: emailText });
	} catch (err) {
		console.error("Kernel error:", err);
		return json({ ok: false, error: err.message }, { status: 500 });
	}
}
