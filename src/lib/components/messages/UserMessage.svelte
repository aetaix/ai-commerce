<script lang="ts">
	let { content }: { content: string } = $props();
</script>

<li class="mx-auto flex w-full max-w-xl justify-end">
	<div class="rounded-2xl bg-zinc-100 p-2 px-4">
		{content}
	</div>
</li>
