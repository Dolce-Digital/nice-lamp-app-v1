<script>
  // ---------------------------------------------
  // STATE
  // ---------------------------------------------
  let hotelName = "";
  let language = "";
  let season = "";
  let vibe = "";
  let emailType = "";
  let output = "";
  let loading = false;

  // ---------------------------------------------
  // SUBJECT STYLING (Minimalist Luxury)
  // ---------------------------------------------
  const subjectPresets = {
    "welcome": "A Little Escape, Waiting Just for You",
    "pre-stay": "Your Stay Is Approaching — A Personal Preview",
    "on-stay": "Enhance Your Stay — Curated Especially for You",
    "post-stay": "Thank You for Staying — A Thought Before You Go",
    "seasonal": "A Seasonal Moment Crafted for You",
    "offer": "A Boutique Offer Reserved Just for You",
    "reengagement": "We Miss You — A Warm Invitation to Return"
  };

  $: subjectLine = emailType ? subjectPresets[emailType] : "";

  // ---------------------------------------------
  // COPY TO CLIPBOARD
  // ---------------------------------------------
  async function copyAll() {
    const finalText = `Subject: ${subjectLine}\n\n${output}`;
    try {
      await navigator.clipboard.writeText(finalText);
      alert("✨ Copied to clipboard!");
    } catch (err) {
      alert("Copy failed. Intern already punished.");
    }
  }

  // ---------------------------------------------
  // GENERATE EMAIL
  // ---------------------------------------------
  async function generateEmail() {
    if (!emailType) {
      alert("Please choose an email type.");
      return;
    }

    loading = true;
    output = "";

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelName,
        language,
        season,
        vibe,
        emailType
      })
    });

    const data = await res.json();
    output = data.output || "No output received.";
    loading = false;
  }
</script>

<div class="page-container">
  <h1>Nice-Lamp Email Engine</h1>
  <p class="subtitle">Boutique Hospitality · Emotional Luxury · Powered by GPT-5.1</p>

  <div class="card">
    <h2>Email Generator</h2>

    <div class="grid">
      <label>
        Hotel name
        <input type="text" bind:value={hotelName} placeholder="Your hotel name" />
      </label>

      <label>
        Language
        <select bind:value={language}>
          <option value="">Choose language</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="nl">Nederlands</option>
        </select>
      </label>

      <label>
        Season (optional)
        <select bind:value={season}>
          <option value="">No season</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Christmas">Christmas</option>
        </select>
      </label>

      <label>
        Vibe / Tone (optional)
        <select bind:value={vibe}>
          <option value="">No vibe</option>
          <option value="Soft Luxury">Soft Luxury</option>
          <option value="Romantic">Romantic</option>
          <option value="Urban Chic">Urban Chic</option>
          <option value="Nordic Minimalist">Nordic Minimalist</option>
          <option value="Family Warmth">Family Warmth</option>
        </select>
      </label>

      <label>
        Email Type (Gearbox)
        <select bind:value={emailType}>
          <option value="">Choose type</option>
          <option value="welcome">Welcome Email</option>
          <option value="pre-stay">Pre-Stay Email</option>
          <option value="on-stay">On-Stay Email</option>
          <option value="post-stay">Post-Stay Email</option>
          <option value="seasonal">Seasonal Campaign</option>
          <option value="offer">Special Offer</option>
          <option value="reengagement">Re-engagement Email</option>
        </select>
      </label>
    </div>

    <!-- SUBJECT PREVIEW -->
    <div class="subject-preview">
      <strong>Subject:</strong> {subjectLine || "—"}
    </div>

    <button on:click={generateEmail} disabled={loading}>
      {loading ? "Generating..." : "Generate Email"}
    </button>
  </div>

  <div class="card output-card">
    <h2>Generated Email</h2>
    <p class="note">Your generated boutique email will appear below.</p>

    {#if output}
      <pre class="output">{output}</pre>

      <button class="copy" on:click={copyAll}>
        📋 Copy to Clipboard
      </button>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    background: #fafafa;
    color: #111;
  }

  .page-container {
    max-width: 820px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    text-align: center;
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .card {
    background: #fff;
    padding: 1.75rem;
    border-radius: 1rem;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.04);
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr 1fr;
  }

  .subject-preview {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding: 0.9rem 1rem;
    border-left: 4px solid #D84171;
    background: #fff7fa;
    border-radius: 0.5rem;
    font-family: "Cormorant Garamond", serif;
    font-size: 1.25rem;
    color: #392B21;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.8rem 1.4rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.6rem;
    background: #111;
    color: white;
    cursor: pointer;
    transition: 0.15s ease;
  }

  .copy {
    margin-top: 1rem;
    background: #D84171;
    font-weight: 600;
  }

  .copy:hover {
    background: #392B21;
  }

  .output {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 0.5rem;
    white-space: pre-wrap;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.95rem;
  }
</style>