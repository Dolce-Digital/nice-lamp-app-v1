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
  .page {
    min-height: 100vh;
    background: #f6f4ef;
    padding: 2rem 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  .nl-container {
    max-width: 800px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  }

  .title {
    margin: 0 0 0.5rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: #392b21;
  }

  .subtitle {
    margin: 0 0 1.5rem;
    color: #6b5a4b;
    font-size: 0.95rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .field-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .two-cols {
    flex-direction: row;
    gap: 1rem;
  }

  .two-cols > label {
    flex: 1;
  }

  label {
    font-size: 0.9rem;
    color: #392b21;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  input,
  select {
    border-radius: 0.5rem;
    border: 1px solid #d4c7bc;
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    outline: none;
  }

  input:focus,
  select:focus {
    border-color: #d84171;
    box-shadow: 0 0 0 1px rgba(216, 65, 113, 0.2);
  }

  .btn {
    align-self: flex-start;
    margin-top: 0.5rem;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    background: #d84171;
    color: #ffffff;
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .error {
    margin-top: 0.5rem;
    color: #b3261e;
    font-size: 0.9rem;
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
}
