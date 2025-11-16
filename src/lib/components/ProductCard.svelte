<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : ProductCard.svelte
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : A reusable component to display a single product in a grid.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
  import type { Product } from '$lib/types';

  let { product }: { product: Product } = $props();

  /**
   * Formats a number into Indonesian Rupiah currency format.
   */
  const formattedPrice = $derived(new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.price));
</script>

<div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
  <a href="/product/{product.id}" class="block">
    <div class="aspect-w-1 aspect-h-1 bg-gray-200 sm:aspect-none h-48 flex items-center justify-center">
      <!-- Placeholder for product image -->
      <span class="text-gray-500">Image</span>
    </div>
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-base font-medium text-gray-900 truncate" title={product.name}>
        {product.name}
      </h3>
      <p class="text-lg font-semibold text-gray-800">
        {formattedPrice}
      </p>
    </div>
  </a>
</div>