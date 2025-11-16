/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +page.ts (dashboard/orders)
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Loader for the user's order history page.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import type { PageLoad } from './$types';
import { error as svelteKitError } from '@sveltejs/kit';

/**
 * Fetches the order history for the logged-in user.
 * This function requires a valid session cookie to be sent with the request.
 */
export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('http://localhost:3000/api/user/orders', {
			credentials: 'include'
		});

		if (res.status === 401) {
			throw svelteKitError(401, 'You must be logged in to view this page.');
		}

		if (!res.ok) {
			throw svelteKitError(res.status, 'Failed to load order history.');
		}

		const orders = await res.json();
		return { orders };
	} catch (error) {
		if (error instanceof Error && 'status' in error) throw error;
		throw svelteKitError(500, 'Could not connect to the server to fetch orders.');
	}
};
