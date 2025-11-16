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
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let isLoading = $state(false);

	async function handleRegister(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;
		error = '';

		try {
			const res = await fetch('http://localhost:3000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || 'Registrasi gagal.');

			alert('Registrasi berhasil! Silakan login.');
			goto('/login');
		} catch (err: any) {
			error = err.message;
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
		<h1 class="text-2xl font-bold text-center">Buat Akun Baru</h1>
		<form class="space-y-6" onsubmit={handleRegister}>
			<div>
				<label for="name" class="block mb-1">Nama</label>
				<input type="text" id="name" bind:value={name} class="w-full border rounded p-2" required />
			</div>
			<div>
				<label for="email" class="block mb-1">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full border rounded p-2"
					required
				/>
			</div>
			<div>
				<label for="password" class="block mb-1">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full border rounded p-2"
					required
				/>
			</div>
			{#if error}
				<p class="text-red-500 text-sm">{error}</p>
			{/if}
			<button
				type="submit"
				disabled={isLoading}
				class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
			>
				{isLoading ? 'Mendaftar...' : 'Daftar'}
			</button>
		</form>
		<p class="text-center">
			Sudah punya akun? <a href="/login" class="text-blue-600 hover:underline">Login di sini</a>
		</p>
	</div>
</main>
