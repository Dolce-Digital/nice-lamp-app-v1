<script>
  export let data;
</script>

<!-- Global App Wrapper -->
<div class="app-shell">
  <header>
    <h1>Nice-Lamp Email Engine</h1>
    <p class="subtitle">Boutique Hospitality · Emotional Luxury · Powered by GPT-5.1</p>
  </header>

  <main>
    <slot />
  </main>
</div>

<style>
  /* Simple, clean Nice-Lamp friendly baseline */
  .app-shell {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: Raleway, sans-serif;
  }

  header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: 2rem;
    font-family: "Cormorant Garamond", serif;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 0.9rem;
    margin-top: 0.3rem;
    color: #555;
  }
</style>

