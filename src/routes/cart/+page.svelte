<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (cart)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Displays the contents of the shopping cart.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import { useCartStore, type CartItem } from '$lib/stores/cartStore';
	import { useSyncStore } from '$lib/stores/useStore';

	const { removeItem, updateQuantity } = useCartStore.getState();

	// --- Reactive State ---
	let items = $state(useCartStore.getState().items);
	useSyncStore(useCartStore, (newState) => {
		items = newState.items;
	});

	const totalPrice = $derived(
		items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
	);

	// --- Utilities ---
	const priceFormatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Keranjang Belanja</h1>

	{#if items.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div class="lg:col-span-2 space-y-4">
				{#each items as item (item.id)}
					<div
						class="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow-sm"
					>
						<div class="w-24 h-24 bg-gray-200 rounded mr-4 flex-shrink-0 self-center"></div>
						<!-- Image -->
						<div class="grow mt-4 sm:mt-0">
							<h2 class="font-semibold text-gray-800">{item.name}</h2>
							<p class="text-sm text-gray-600">{priceFormatter.format(item.price)}</p>
						</div>
						<div class="flex items-center mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto justify-between">
							<input
								type="number"
								value={item.quantity}
								onchange={(e) => updateQuantity(item.id, parseInt(e.currentTarget.value))}
								class="w-16 text-center border rounded"
							/>
							<button
								onclick={() => removeItem(item.id)}
								class="ml-4 text-red-500 hover:text-red-700"
							>
								Hapus
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm h-fit">
				<h2 class="text-xl font-semibold mb-4">Ringkasan</h2>
				<div class="flex justify-between mb-2">
					<span>Subtotal</span>
					<span>{priceFormatter.format(totalPrice)}</span>
				</div>
				<div class="border-t my-4"></div>
				<div class="flex justify-between font-bold text-lg">
					<span>Total</span>
					<span>{priceFormatter.format(totalPrice)}</span>
				</div>
				<a
					href="/checkout"
					class="block w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-blue-700"
				>
					Lanjutkan ke Checkout
				</a>
			</div>
		</div>
	{:else}
		<div class="text-center py-16 bg-white rounded-lg shadow-sm">
			<p class="text-xl text-gray-500 mb-4">Keranjang Anda kosong.</p>
			<a href="/" class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
				Mulai Belanja
			</a>
		</div>
	{/if}
</main>
