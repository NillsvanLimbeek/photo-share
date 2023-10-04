import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

import { authService } from '$lib/services/auth.service';
import { publicRoutes } from '$lib/constants';

// SPA mode
export const ssr = false;

// load user on every page
export async function load({ route, url }) {
	// anonymous for testing
	if (url.search.includes('anon=true')) return;

	// on public routes do nothing
	if (route && route.id && publicRoutes.includes(route.id)) {
		return;
	}

	if (!get(authService)) {
		const user = await authService.getUser();

		// if user is not logged in, redirect to signin page
		if (!user) {
			throw redirect(307, '/auth/signin');
		}
	}
}
