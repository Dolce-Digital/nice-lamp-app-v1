import 'dotenv/config';
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

export async function POST({ request }) {
	try {
		const body = await request.json();

		// Initialize OpenAI client with env var
		const client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY
		});

		// Create the chat completion
		const completion = await client.chat.completions.create({
			model: "gpt-5.1",
			messages: [
				{
					role: "system",
					content:
						"You are the Nice-Lamp Email Engine. You write boutique-hotel emails in a warm, sensory, elegant tone. Respond ONLY with the generated email content. No explanations, no JSON."
				},
				{
					role: "user",
					// send the user choices as structured context
					content: `Season: ${body.season}\nTone family: ${body.vibe}\nLanguage: ${body.language}\n\nWrite a complete email suitable for this context.`
				}
			],
			temperature: 0.7
		});

		// Safely extract assistant text
		const message = completion.choices?.[0]?.message?.content ?? "No content returned.";

		return json({ ok: true, output: message });
	} catch (err) {
		console.error("Kernel error:", err);
		return json(
			{
				ok: false,
				error: err?.message ?? "Unknown kernel error"
			},
			{ status: 500 }
		);
	}
}
