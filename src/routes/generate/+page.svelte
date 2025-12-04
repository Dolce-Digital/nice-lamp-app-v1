<script>
	let generated = "";
	let loading = false;

	export let data;

	async function generateEmail() {
		loading = true;
		generated = "";

		const response = await fetch("/api/kernel", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (result.ok) {
			generated = result.output; // plain string
		} else {
			generated = "Kernel failed: " + (result.error ?? "Unknown error");
		}

		loading = false;
	}
</script>

<h1>Your Boutique Email is Ready</h1>

{#if loading}
	<p>Generating your email with the Nice-Lamp engine...</p>
{:else if generated}
	<pre>{generated}</pre>
{:else}
	<p>Click the button to generate your email.</p>
{/if}

<button on:click={generateEmail}>Generate Email</button>
