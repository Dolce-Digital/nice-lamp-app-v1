<script>
  import { goto } from '$app/navigation';

  let season = '';
  let vibe = '';
  let language = '';

  async function generate() {
    // Pass selections to the result screen through URL params
    const params = new URLSearchParams({
      season,
      vibe,
      language
    });

    goto(`/generate?${params.toString()}`);
  }
</script>

<h2>Generate Boutique Hotel Emails</h2>

<div class="section">
  <label>Season</label>
  <select bind:value={season}>
    <option value="">Choose season</option>
    <option>Winter</option>
    <option>Spring</option>
    <option>Summer</option>
    <option>Autumn</option>
  </select>
</div>

<div class="section">
  <label>Email Vibe</label>
  <select bind:value={vibe}>
    <option value="">Choose vibe</option>
    <option>Chic Romance</option>
    <option>Gourmet Experience</option>
    <option>Heritage Story</option>
    <option>Urban Cool</option>
  </select>
</div>

<div class="section">
  <label>Language</label>
  <select bind:value={language}>
    <option value="">Choose language</option>
    <option>English</option>
    <option>French</option>
    <option>German</option>
    <option>Dutch</option>
  </select>
</div>

<button on:click={generate} disabled={!season || !vibe || !language}>
  Generate Email
</button>

<style>
  h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }

  .section {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.7rem 1.2rem;
    background: #D84171;
    border: none;
    color: white;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
</style>
