<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (Home)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : The main landing page of the application. Displays a grid of products.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6">Produk Terbaru</h1>

	{#if data.products && data.products.length > 0}
		<div class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{#each data.products as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="text-center py-16 bg-white rounded-lg shadow-sm">
			<p class="text-xl text-gray-500">Belum ada produk yang tersedia saat ini.</p>
		</div>
	{/if}
</main>
