// Old kernel backend temporarily disabled.
// The real backend is now at: /src/routes/api/generate/+server.js

export function POST() {
  return new Response(
    JSON.stringify({
      message: "Old kernel endpoint disabled. Use /api/generate instead."
    }),
    { status: 200 }
  );
}
