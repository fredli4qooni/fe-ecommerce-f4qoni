<!--
/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.svelte (login)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : User login page.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { useAuthStore } from '$lib/stores/authStore';

	const { login } = useAuthStore.getState();

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleLogin(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;
		error = '';

		try {
			const res = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
				credentials: 'include'
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || 'Login failed. Please check your credentials.');
			}

			login(data.user);
			await goto('/');
		} catch (err: any) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
	<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
		<h1 class="text-2xl font-bold text-center text-gray-900">Login ke Akun Anda</h1>
		<form class="space-y-6" onsubmit={handleLogin}>
			<div>
				<label for="email" class="block mb-1 font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full border rounded p-2"
					required
					autocomplete="email"
				/>
			</div>
			<div>
				<label for="password" class="block mb-1 font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full border rounded p-2"
					required
					autocomplete="current-password"
				/>
			</div>
			{#if error}
				<p class="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
			{/if}
			<button
				type="submit"
				disabled={isLoading}
				class="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
			>
				{isLoading ? 'Memproses...' : 'Login'}
			</button>
		</form>
		<p class="text-center text-sm text-gray-600">
			Belum punya akun? <a href="/register" class="font-medium text-blue-600 hover:underline"
				>Daftar di sini</a
			>
		</p>
	</div>
</main>
