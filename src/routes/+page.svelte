<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import UserMessage from '$lib/components/messages/UserMessage.svelte';
	import AssistantMessage from '$lib/components/messages/AssistantMessage.svelte';
	import { ArrowUp } from '@lucide/svelte';
	const chat = new Chat({
		api: '/api/vendor',	
		onResponse: () => {
			loading = false;
		}
	});

	let loading = $state(false)
	let chatContainer = $state<HTMLDivElement | null>(null);


	function handleSubmit() {
		const input = chat.input.trim();
		if (input) {
			loading = true;
			chat.input = '';
			chat.append({
				role: 'user',
				content: input
			});
		}
	}
	$effect(() => {
		if (chat.messages.length > 0 && chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	});
</script>

<div bind:this={chatContainer} class="flex-grow overflow-y-auto">
	<ul class="flex w-full flex-col gap-4 py-20">
		{#each chat.messages as message}
			{#if message.role === 'user'}
				<UserMessage content={message.content} />
			{:else if message.role === 'assistant'}
				<AssistantMessage {message} />
			{/if}
		{/each}

		{#if loading}
			<li class="mx-auto w-full max-w-xl">Searching...</li>
		{/if}
		{#if chat.error}
			<li class="prose mx-auto w-full max-w-xl">
				<p class="text-red-500">{chat.error}</p>
			</li>
		{/if}
	</ul>
</div>
<div class="flex w-full items-end justify-center rounded-b-2xl bg-white">
	<form
		onsubmit={handleSubmit}
		class="flex w-full max-w-xl flex-col gap-2 rounded-t-2xl border border-b-0 border-neutral-200 p-4"
	>
		<textarea
			bind:value={chat.input}
			onkeypress={(event) => {
				if (event.key === 'Enter' && !event.shiftKey) {
					event.preventDefault();
					handleSubmit();
				}
			}}
			class="w-full focus:outline-none"
		></textarea>
		<div class="flex items-center justify-end">
			<button type="submit" class="rounded-lg bg-zinc-900 p-2 text-white">
				<ArrowUp class="size-5" />
			</button>
		</div>
	</form>
</div>
