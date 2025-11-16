/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.ts (Home)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Loader for the main landing page. Fetches all products.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import type { PageLoad } from './$types';
import type { Product } from '$lib/types';
import { error as svelteKitError } from '@sveltejs/kit';

/**
 * Fetches the list of all products to be displayed on the homepage.
 */
export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('http://localhost:3000/api/products');

		if (!response.ok) {
			throw svelteKitError(response.status, 'Failed to fetch products.');
		}

		const products: Product[] = await response.json();
		return { products };
	} catch (error) {
		if (error instanceof Error && 'status' in error) throw error;
		throw svelteKitError(500, 'Could not connect to the server to fetch products.');
	}
};
