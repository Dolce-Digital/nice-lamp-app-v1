<script lang="ts">
  let hotelName = "";
  let language = "de";
  let season = "";
  let vibe = "";
  let emailType = "";

  let output = "";
  let loading = false;
  let error = "";

  async function generateEmail() {
    error = "";
    output = "";
    loading = true;

    try {
      if (!emailType) {
        throw new Error("Veuillez choisir un type d’email.");
      }

      const payload = {
        hotelName,
        language,
        season,
        vibe,
        emailType
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erreur serveur.");
      }

      const data = await res.json();
      output = data.output ?? "";
    } catch (err: any) {
      error = err?.message ?? "Une erreur est survenue.";
    } finally {
      loading = false;
    }
  }
</script>

<main class="page">
  <div class="nl-container">
    <h1 class="title">Nice-Lamp Email Engine</h1>
    <p class="subtitle">
      Choisissez le contexte, cliquez, et laissez la machine écrire pour vous.
    </p>

    <form class="form" on:submit|preventDefault={generateEmail}>
      <!-- Hotel name -->
      <div class="field-row">
        <label>
          Hotel name
          <input
            type="text"
            bind:value={hotelName}
            placeholder="Your hotel name"
          />
        </label>
      </div>

      <!-- Language + Season -->
      <div class="field-row two-cols">
        <label>
          Language
          <select bind:value={language}>
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
      </div>

      <!-- Vibe + Email Type -->
      <div class="field-row two-cols">
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
          Email Type (Gearbox)*
          <select bind:value={emailType}>
            <option value="">Choose email type</option>
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

      <button class="btn" type="submit" disabled={loading}>
        {#if loading}
          Generating…
        {:else}
          Generate Email
        {/if}
      </button>

      {#if error}
        <p class="error">{error}</p>
      {/if}
    </form>

    <section class="output-section">
      <h2>Generated Email</h2>

      {#if loading && !output}
        <p class="hint">Working on it…</p>
      {/if}

      {#if output}
        <div class="output-container">
          <pre>{output}</pre>
        </div>
      {:else if !loading}
        <p class="hint">
          Your email will appear here. Pick a type, then click “Generate”.
        </p>
      {/if}
    </section>
  </div>
</main>

<style>
  .output-section {
    margin-top: 2rem;
  }

  .output-section h2 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    color: #392b21;
  }

  .output-container {
    max-width: 100%;
    max-height: 60vh;
    overflow: auto;
    border-radius: 0.75rem;
    border: 1px solid #ccc;
    padding: 1rem;
    background: #fff;
    white-space: pre-wrap;
  }

  .container {
    max-width: 720px;
    margin: 2rem auto;
    padding: 1.5rem;
    line-height: 1.6;
  }
</style>