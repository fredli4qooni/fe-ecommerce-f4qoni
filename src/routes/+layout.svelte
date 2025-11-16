<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +layout.svelte
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Root layout with responsive top and bottom navigation.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import '../app.css';
	import { useCartStore } from '$lib/stores/cartStore';
	import { useAuthStore } from '$lib/stores/authStore';
	import { useSyncStore } from '$lib/stores/useStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	let cartItems = $state(useCartStore.getState().items);
	useSyncStore(useCartStore, (newState) => {
		cartItems = newState.items;
	});
	const totalItems = $derived(cartItems.reduce((total, item) => total + item.quantity, 0));

	let authState = $state(useAuthStore.getState());
	useSyncStore(useAuthStore, (newState) => {
		authState = newState;
	});
	const { logout } = useAuthStore.getState();

	/**
	 * Handles the user logout process.
	 */
	async function handleLogout() {
		try {
			await fetch('http://localhost:3000/api/auth/logout', {
				method: 'POST',
				credentials: 'include'
			});
		} catch (error) {
			console.error('Logout API call failed:', error);
		} finally {
			logout();
			goto('/login');
		}
	}

	let hasMounted = $state(false);
	$effect(() => {
		hasMounted = true;
	});
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
	<!-- =================================================================
       HEADER / TOP NAVIGATION BAR
       ================================================================= -->
	<header class="bg-white shadow-sm sticky top-0 z-10">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex-shrink-0">
					<a href="/" class="text-xl sm:text-2xl font-bold text-blue-600">E-Commerce</a>
				</div>

				<div>
					{#if authState.isAuthenticated && authState.user}
						<div class="flex items-center space-x-3">
							<span class="text-sm text-gray-600 hidden sm:block">Hi, {authState.user.name}</span>
							<button
								onclick={handleLogout}
								class="text-sm font-medium text-red-600 hover:text-red-800"
							>
								Logout
							</button>
						</div>
					{:else}
						<div class="flex items-center space-x-3">
							<a href="/login" class="text-sm font-medium text-gray-700 hover:text-blue-600"
								>Login</a
							>
							<a
								href="/register"
								class="text-sm font-medium text-white bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700"
							>
								Daftar
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- =================================================================
       MAIN CONTENT
       ================================================================= -->
	<main class="flex-grow pb-20 md:pb-0">
		{@render children()}
	</main>

	<!-- =================================================================
       BOTTOM NAVIGATION BAR (Mobile Only)
       ================================================================= -->
	<nav
		class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-md z-20"
	>
		<div class="flex justify-around h-16">
			<a
				href="/cart"
				class="flex flex-col items-center justify-center w-full text-sm transition-colors"
				class:text-blue-600={$page.url.pathname === '/cart'}
				class:text-gray-500={$page.url.pathname !== '/cart'}
			>
				<div class="relative">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
						/></svg
					>
					{#if hasMounted && totalItems > 0}
						<span
							class="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center"
						>
							{totalItems}
						</span>
					{/if}
				</div>
				<span>Keranjang</span>
			</a>

			<a
				href="/"
				class="flex flex-col items-center justify-center w-full text-sm transition-colors"
				class:text-blue-600={$page.url.pathname === '/'}
				class:text-gray-500={$page.url.pathname !== '/'}
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/></svg
				>
				<span>Home</span>
			</a>

			<a
				href="/dashboard/orders"
				class="flex flex-col items-center justify-center w-full text-sm transition-colors"
				class:text-blue-600={$page.url.pathname.startsWith('/dashboard')}
				class:text-gray-500={!$page.url.pathname.startsWith('/dashboard')}
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/></svg
				>
				<span>Akun</span>
			</a>
		</div>
	</nav>

	<footer class="hidden md:block bg-gray-800 text-white py-6 mt-8">
		<div class="container mx-auto text-center">
			<p>&copy; 2025 Simple E-Commerce by Fredli Fourqoni. All rights reserved.</p>
		</div>
	</footer>
</div>
