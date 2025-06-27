<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="mx-auto max-w-5xl">
	{@render children()}
</main>
