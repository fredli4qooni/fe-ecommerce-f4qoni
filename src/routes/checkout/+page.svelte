<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (checkout)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Checkout page with customer data form and order summary.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import { useCartStore, type CartItem } from '$lib/stores/cartStore';
	import { useSyncStore } from '$lib/stores/useStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// --- State Management ---
	let items = $state(useCartStore.getState().items);
	useSyncStore(useCartStore, (newState) => {
		items = newState.items;
	});
	const { clearCart } = useCartStore.getState();

	let customer = $state({ name: '', phone: '', address: '' });
	let shippingMethod = $state('standard');
	let paymentMethod = $state('cod');
	let isLoading = $state(false);
	let errorMessage = $state('');

	// --- Derived Calculations ---
	const subtotal = $derived(
		items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
	);
	const shippingCost = $derived(shippingMethod === 'express' ? 20000 : 10000);
	const total = $derived(subtotal + shippingCost);

	// --- Actions ---
	async function placeOrder(event: SubmitEvent) {
		event.preventDefault();
		if (items.length === 0) {
			errorMessage = 'Keranjang Anda kosong.';
			return;
		}
		isLoading = true;
		errorMessage = '';

		const orderData = {
			customerName: customer.name,
			customerPhone: customer.phone,
			customerAddress: customer.address,
			shippingMethod,
			paymentMethod,
			items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
			totalAmount: total
		};

		try {
			const response = await fetch('http://localhost:3000/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData),
				credentials: 'include'
			});
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error || 'Gagal membuat pesanan.');
			}

			clearCart();
			await goto('/orders/success');
		} catch (err: any) {
			errorMessage = err.message;
		} finally {
			isLoading = false;
		}
	}

	// --- Utilities ---
	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0
	});

	// Redirect if cart is empty on mount
	onMount(() => {
		if (items.length === 0) {
			goto('/cart');
		}
	});
</script>

<main class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Checkout</h1>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
			<form id="checkout-form" onsubmit={placeOrder}>
				<h2 class="text-xl font-semibold mb-4">1. Data Pembeli</h2>
				<div class="space-y-4">
					<div>
						<label for="name" class="block mb-1 font-medium">Nama Lengkap</label>
						<input
							type="text"
							id="name"
							bind:value={customer.name}
							class="w-full border rounded p-2"
							required
						/>
					</div>
					<div>
						<label for="phone" class="block mb-1 font-medium">Nomor Telepon</label>
						<input
							type="tel"
							id="phone"
							bind:value={customer.phone}
							class="w-full border rounded p-2"
							required
						/>
					</div>
					<div>
						<label for="address" class="block mb-1 font-medium">Alamat Lengkap</label>
						<textarea
							id="address"
							bind:value={customer.address}
							class="w-full border rounded p-2"
							rows="3"
							required
						></textarea>
					</div>
				</div>

				<h2 class="text-xl font-semibold mt-8 mb-4">2. Metode Pengiriman</h2>
				<div class="space-y-2">
					<label
						class="flex items-center border p-3 rounded-lg cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500"
					>
						<input
							type="radio"
							name="shipping"
							bind:group={shippingMethod}
							value="standard"
							class="h-4 w-4"
						/>
						<span class="ml-3">Standard (Rp 10.000)</span>
					</label>
					<label
						class="flex items-center border p-3 rounded-lg cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500"
					>
						<input
							type="radio"
							name="shipping"
							bind:group={shippingMethod}
							value="express"
							class="h-4 w-4"
						/>
						<span class="ml-3">Express (Rp 20.000)</span>
					</label>
				</div>

				<h2 class="text-xl font-semibold mt-8 mb-4">3. Metode Pembayaran</h2>
				<div class="space-y-2">
					<label
						class="flex items-center border p-3 rounded-lg cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500"
					>
						<input
							type="radio"
							name="payment"
							bind:group={paymentMethod}
							value="cod"
							class="h-4 w-4"
						/>
						<span class="ml-3">Cash on Delivery (COD)</span>
					</label>
					<label
						class="flex items-center border p-3 rounded-lg cursor-pointer has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500"
					>
						<input
							type="radio"
							name="payment"
							bind:group={paymentMethod}
							value="transfer"
							class="h-4 w-4"
						/>
						<span class="ml-3">Transfer Bank</span>
					</label>
				</div>
			</form>
		</div>

		<div class="bg-white p-6 rounded-lg shadow-sm h-fit">
			<h2 class="text-xl font-semibold mb-4">Ringkasan Order</h2>
			{#each items as item}
				<div class="flex justify-between text-sm mb-1">
					<span class="truncate pr-2">{item.name} x {item.quantity}</span>
					<span class="flex-shrink-0">{formatter.format(item.price * item.quantity)}</span>
				</div>
			{/each}
			<div class="border-t my-4"></div>
			<div class="flex justify-between mb-2">
				<span>Subtotal</span>
				<span>{formatter.format(subtotal)}</span>
			</div>
			<div class="flex justify-between mb-2 text-gray-600">
				<span>Ongkos Kirim</span>
				<span>{formatter.format(shippingCost)}</span>
			</div>
			<div class="border-t my-4"></div>
			<div class="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>{formatter.format(total)}</span>
			</div>

			{#if errorMessage}
				<p class="text-red-500 text-sm mt-4 bg-red-50 p-2 rounded">{errorMessage}</p>
			{/if}

			<button
				type="submit"
				form="checkout-form"
				disabled={isLoading}
				class="w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Memproses...' : 'Buat Pesanan'}
			</button>
		</div>
	</div>
</main>
