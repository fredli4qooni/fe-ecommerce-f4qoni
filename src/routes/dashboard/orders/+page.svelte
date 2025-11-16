<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (dashboard/orders)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Displays the user's order history.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	});
</script>

<div class="bg-white p-6 rounded-lg shadow-sm">
	<h1 class="text-2xl font-bold mb-6 text-gray-900">Riwayat Pesanan</h1>

	{#if data.orders && data.orders.length > 0}
		<div class="space-y-6">
			{#each data.orders as order (order.id)}
				<div class="border rounded-lg p-4 transition-shadow hover:shadow-md">
					<div class="flex flex-wrap justify-between items-center gap-2 mb-3">
						<div>
							<p class="font-semibold text-gray-800">Order ID:</p>
							<p class="font-mono text-xs text-gray-500">{order.id}</p>
						</div>
						<span
							class="px-3 py-1 text-sm font-medium rounded-full"
							class:bg-yellow-100={order.status === 'PENDING'}
							class:text-yellow-800={order.status === 'PENDING'}
							class:bg-blue-100={order.status === 'PROCESSED'}
							class:text-blue-800={order.status === 'PROCESSED'}
							class:bg-green-100={order.status === 'COMPLETED'}
							class:text-green-800={order.status === 'COMPLETED'}
						>
							{order.status}
						</span>
					</div>
					<div class="border-t pt-3 mt-3">
						<p class="text-sm font-medium mb-2 text-gray-600">
							Tanggal: {new Date(order.createdAt).toLocaleDateString('id-ID', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</p>
						<ul class="space-y-1">
							{#each order.items as item}
								<li class="text-sm text-gray-700">{item.product.name} &times; {item.quantity}</li>
							{/each}
						</ul>
					</div>
					<p class="text-right font-bold text-lg mt-3">
						Total: {formatter.format(order.totalAmount)}
					</p>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-gray-500">Anda belum memiliki riwayat pesanan.</p>
	{/if}
</div>
