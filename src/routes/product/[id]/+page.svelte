<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (product/[id])
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Displays the detailed information for a single product.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import type { PageData } from './$types';
	import { useCartStore } from '$lib/stores/cartStore';

	let { data }: { data: PageData } = $props();
	const { product } = data;

	const { addItem } = useCartStore.getState();

	function handleAddToCart() {
		addItem(product);
		alert(`${product.name} telah ditambahkan ke keranjang!`);
	}

	const formattedPrice = $derived(
		new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(product.price)
	);
</script>

<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
		<div>
			<div class="aspect-square w-full bg-gray-200 rounded-lg flex items-center justify-center">
				<span class="text-gray-500 text-xl">Image Placeholder</span>
			</div>
		</div>

		<div class="flex flex-col">
			<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
				{product.name}
			</h1>

			<p class="text-3xl text-gray-900 my-4">{formattedPrice}</p>

			<div class="mb-4">
				{#if product.stock > 5}
					<span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
						Tersedia
					</span>
				{:else if product.stock > 0}
					<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
						Stok Terbatas (Sisa {product.stock})
					</span>
				{:else}
					<span class="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
						Stok Habis
					</span>
				{/if}
			</div>

			<div class="mt-6 border-t pt-6">
				<h2 class="text-lg font-semibold mb-2 text-gray-800">Deskripsi</h2>
				<p class="text-gray-700 leading-relaxed prose">
					{product.description}
				</p>
			</div>

			<div class="mt-auto pt-6">
				<button
					disabled={product.stock === 0}
					onclick={handleAddToCart}
					class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg
                 hover:bg-blue-700 transition-colors
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Tambah ke Keranjang
				</button>
			</div>
		</div>
	</div>
</main>
