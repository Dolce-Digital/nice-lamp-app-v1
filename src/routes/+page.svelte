<script>
	// ---------------------------------------------
	// STATE
	// ---------------------------------------------
	let emailType = "welcome";
	let subject = "";
	let body = "";

	// ---------------------------------------------
	// SUBJECT PRESETS (Minimalist Luxury)
	// ---------------------------------------------
	const subjectStyles = {
		welcome: "A Little Escape, Waiting Just for You",
		prestay: "Your Stay Is Approaching — A Personal Preview",
		onstay: "Enhance Your Stay — Curated Just for You",
		poststay: "Thank You for Staying — A Little Something Before You Go",
		general: "A Moment of Calm, Delivered to Your Inbox"
	};

	// Update subject automatically when user chooses email type
	function updateSubject() {
		subject = subjectStyles[emailType];
	}

	// ---------------------------------------------
	// COPY TO CLIPBOARD
	// ---------------------------------------------
	async function copyAll() {
		const fullText = `Subject: ${subject}\n\n${body}`;
		try {
			await navigator.clipboard.writeText(fullText);
			alert("✨ Copied! Paste away, Maestro.");
		} catch (err) {
			console.error(err);
			alert("Copy failed — intern is already fired.");
		}
	}
</script>

<style>
	/* ---------------------------------------------
	   MINIMALIST LUXURY STYLE (Nice-Lamp Authentic)
	   --------------------------------------------- */

	:root {
		--pink: #D84171;
		--dark: #392B21;
		--light: #F6F4EF;
		--mid: #B4A298;
		--gold: #D4AF37;
		--radius: 10px;
	}

	body {
		font-family: "Raleway", sans-serif;
		background: var(--light);
		color: var(--dark);
		margin: 0;
		padding: 2rem;
	}

	h1 {
		font-family: "Cormorant Garamond", serif;
		font-size: 2.6rem;
		font-weight: 500;
		color: var(--dark);
		margin-bottom: 1rem;
	}

	.section {
		background: white;
		padding: 1.5rem;
		border-radius: var(--radius);
		box-shadow: 0 2px 6px rgba(0,0,0,0.07);
		margin-bottom: 1.5rem;
	}

	label {
		font-weight: 600;
		display: block;
		margin-bottom: 0.5rem;
		color: var(--dark);
	}

	select, textarea {
		width: 100%;
		padding: 0.8rem;
		border-radius: var(--radius);
		border: 1px solid var(--mid);
		font-size: 1rem;
		margin-bottom: 1rem;
		background: #fff;
	}

	.subject-preview {
		font-family: "Cormorant Garamond", serif;
		font-size: 1.6rem;
		padding: 1rem;
		border-left: 4px solid var(--pink);
		background: #fff8fb;
		color: var(--dark);
		margin-bottom: 1.5rem;
		border-radius: var(--radius);
	}

	button.copy {
		background: var(--pink);
		color: white;
		padding: 0.8rem 1.4rem;
		border-radius: var(--radius);
		font-weight: 600;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		transition: 0.2s ease;
	}

	button.copy:hover {
		background: var(--dark);
	}
</style>

<!-- ---------------------------------------------
	APP UI — CLEAN, COMPLETE
---------------------------------------------- -->

<h1>Nice-Lamp Email Generator</h1>

<div class="section">
	<label for="type">Email Type</label>
	<select id="type" bind:value={emailType} on:change={updateSubject}>
		<option value="welcome">Welcome Email</option>
		<option value="prestay">Pre-Stay Email</option>
		<option value="onstay">On-Stay Email</option>
		<option value="poststay">Post-Stay Email</option>
		<option value="general">General Newsletter</option>
	</select>

	<div class="subject-preview">
		<strong>Subject:</strong> {subject}
	</div>

	<label for="body">Email Body</label>
	<textarea id="body" rows="10" bind:value={body} placeholder="Write or auto-generate your boutique email here..."></textarea>

	<button class="copy" on:click={copyAll}>
		📋 Copy to Clipboard
	</button>
</div>