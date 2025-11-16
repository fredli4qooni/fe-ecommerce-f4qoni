/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : +layout.ts
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Root layout loader. Fetches user session data on initial app load.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import type { LayoutLoad } from './$types';
import { useAuthStore } from '$lib/stores/authStore';

/**
 * This load function runs on the server for the first page load,
 * and on the client for subsequent navigations. It's the ideal place
 * to check for an existing user session.
 */
export const load: LayoutLoad = async ({ fetch }) => {
	const { login, user } = useAuthStore.getState();

	if (user) {
		return {};
	}

	try {
		const res = await fetch('http://localhost:3000/api/auth/profile');

		if (res.ok) {
			const data = await res.json();
			login(data.user);
		}
	} catch (error) {
		console.error('Session check failed during initial load:', error);
	}

	return {};
};
