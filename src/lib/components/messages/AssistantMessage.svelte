<script lang="ts">
	import { type Message } from 'ai';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	let { message }: { message: Message } = $props();
	$inspect(message);
</script>

<li class="prose mx-auto w-full max-w-xl">
	{#if message.parts}
		
		{#each message.parts as part}
			<div class="">
				{#if part.type === "tool-invocation" && part.toolInvocation.state === "result"}
					{#each part.toolInvocation.result as result}
						{result.description}
					{/each}
				{:else if part.type === 'text'}
					<SvelteMarkdown source={part.text} />
				{/if}
			</div>
		{/each}
	{:else}
		<SvelteMarkdown source={message.content} />
	{/if}
</li>
