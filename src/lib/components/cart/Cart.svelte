<script>
	import { fly } from 'svelte/transition';

	let { cartOpen = false, openCart, closeCart } = $props();
</script>

{#if !cartOpen}
	<button
		class="absolute top-4 right-4 rounded-full border border-neutral-200 px-4 py-2 hover:bg-neutral-100"
		onclick={() => openCart()}
	>
		Cart
	</button>
{/if}

<div class="border-l border-neutral-200 transition-all {cartOpen ? 'w-1/3' : 'w-0'}">
	{#if cartOpen}
		<div
			transition:fly={{ x: 100, duration: 300, delay: 100 }}
			class="flex h-full flex-col overflow-y-scroll"
		>
			<header class="flex items-center justify-between p-4">
				<h2>Cart</h2>
				<button
					class="rounded-full border border-neutral-200 px-4 py-2 hover:bg-neutral-100"
					onclick={() => closeCart()}
				>
					Close
				</button>
			</header>

			<div class="h-full"></div>

			<div class="p-4">
				<div class="h-52 rounded-2xl bg-neutral-50 p-4">
					<h3 class="font-semibold">1 item</h3>
					<ul>
						<li class="flex w-full items-center justify-between">
							<span>1 x Product</span>
							<span>$45.20</span>
						</li>
					</ul>
					<p>Coupon discrect</p>
					<p>Delivery Charges</p>
				</div>
			</div>
		</div>
	{/if}
</div>
