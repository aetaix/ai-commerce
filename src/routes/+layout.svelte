<script lang="ts">
	import Cart from '$lib/components/cart/Cart.svelte';
	import '../app.css';
	let { children } = $props();
	let cartOpen = $state(false);
</script>

<main class="h-screen bg-neutral-50 p-4">
	<div
		class="relative flex h-full w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg"
	>
		<div class="flex h-full flex-col transition-all {cartOpen ? 'w-2/3' : 'w-full'}">
			{@render children()}
		</div>

		<Cart {cartOpen} openCart={() => (cartOpen = true)} closeCart={() => (cartOpen = false)} />
	</div>
</main>
