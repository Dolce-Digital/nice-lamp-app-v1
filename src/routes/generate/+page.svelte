<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let loading = true;
  let result = null;
  let error = null;

  let season = '';
  let vibe = '';
  let language = '';

  // Extract URL parameters
  $: season = $page.url.searchParams.get('season');
  $: vibe = $page.url.searchParams.get('vibe');
  $: language = $page.url.searchParams.get('language');

  onMount(async () => {
    try {
      const response = await fetch('/api/kernel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ season, vibe, language })
      });

      if (!response.ok) {
        throw new Error('Kernel failed.');
      }

      result = await response.json();
      loading = false;

    } catch (e) {
      error = e.message;
      loading = false;
    }
  });

  function copy(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  }
</script>

<h2>Your Boutique Email is Ready</h2>

{#if loading}
  <p>Generating your email with the Nice-Lamp engine…</p>
{/if}

{#if error}
  <p style="color: red;">{error}</p>
{/if}

{#if result}
  <div class="block">
    <h3>Subject Line</h3>
    <p>{result.subject}</p>
    <button on:click={() => copy(result.subject)}>Copy</button>
  </div>

  <div class="block">
    <h3>Preview Text</h3>
    <p>{result.preview}</p>
    <button on:click={() => copy(result.preview)}>Copy</button>
  </div>

  <div class="block">
    <h3>Full Email</h3>
    <p>{result.long_email}</p>
    <button on:click={() => copy(result.long_email)}>Copy</button>
  </div>

  <div class="block">
    <h3>Short Email (PS idea)</h3>
    <p>{result.short_email}</p>
    <button on:click={() => copy(result.short_email)}>Copy</button>
  </div>

  <div class="block">
    <h3>CTA</h3>
    <p>{result.cta}</p>
    <button on:click={() => copy(result.cta)}>Copy</button>
  </div>
{/if}

<style>
  h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }

  .block {
    margin-bottom: 1.7rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-family: "Cormorant Garamond", serif;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #D84171;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  button:hover {
    background: #c33664;
  }
</style>
