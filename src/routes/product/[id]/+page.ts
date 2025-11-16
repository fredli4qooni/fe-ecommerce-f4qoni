/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.ts (product/[id])
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Loader for the product detail page. Fetches a single product by its ID.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import type { PageLoad } from './$types';
import type { Product } from '$lib/types';
import { error as svelteKitError } from '@sveltejs/kit';

/**
 * Fetches a single product's details based on the ID from the URL parameter.
 */
export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const { id } = params;
		const response = await fetch(`http://localhost:3000/api/products/${id}`);

		if (response.status === 404) {
			throw svelteKitError(404, 'Product not found');
		}

		if (!response.ok) {
			throw svelteKitError(response.status, 'Failed to fetch product data.');
		}

		const product: Product = await response.json();
		return { product };
	} catch (error) {
		if (error instanceof Error && 'status' in error) throw error;
		throw svelteKitError(500, 'Could not connect to the server to fetch product data.');
	}
};
