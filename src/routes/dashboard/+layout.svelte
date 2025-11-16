<script lang="ts">
	let { children } = $props();
</script>

<main class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
		<aside class="md:col-span-1">
			<nav class="bg-white p-4 rounded-lg shadow-sm">
				<div class="flex flex-row space-x-2 overflow-x-auto md:flex-col md:space-x-0 md:space-y-2">
					<a
						href="/dashboard"
						class="px-4 py-2 rounded hover:bg-gray-100 text-sm sm:text-base flex-shrink-0">Profil</a
					>
					<a
						href="/dashboard/orders"
						class="px-4 py-2 rounded hover:bg-gray-100 text-sm sm:text-base flex-shrink-0 font-semibold bg-gray-100"
						>Riwayat Pesanan</a
					>
					<a
						href="/dashboard/wishlist"
						class="px-4 py-2 rounded hover:bg-gray-100 text-sm sm:text-base flex-shrink-0"
						>Wishlist</a
					>
				</div>
			</nav>
		</aside>

		<div class="md:col-span-3">
			{@render children()}
		</div>
	</div>
</main>
