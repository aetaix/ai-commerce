<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="h-screen bg-neutral-50 p-4">
	<div class="flex h-full w-full flex-col rounded-3xl border border-neutral-200 bg-white shadow-lg">
		{@render children()}
	</div>
</main>
