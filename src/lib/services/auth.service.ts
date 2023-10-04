import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

import { supabase } from '$lib/supabase';

function createAuthService() {
	const store = writable<User | null>();
	const { set, subscribe } = store;

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			getUser();
		} else {
			set(null);
		}
	});

	async function getUser() {
		try {
			const { data, error } = await supabase.auth.getUser();

			if (error) {
				throw error;
			}

			set(data.user);
			return data.user;
		} catch (error) {
			console.error(error);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				return error;
			}

			return data;
		} catch (error) {
			console.error(error);
		}
	}

	async function signUp(name: string, email: string, password: string) {
		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: { data: { name } }
			});

			if (error) {
				return error;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function resetPassword(email: string) {
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				// TODO change this to the correct url
				redirectTo: 'http://localhost:5173/auth/resetpassword'
			});

			if (error) {
				return error;
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function updatePassword(password: string) {
		try {
			const { data, error } = await supabase.auth.updateUser({ password });

			if (error) {
				return error;
			}

			return data;
		} catch (error) {
			console.error(error);
		}
	}

	return {
		subscribe,
		getUser,
		signIn,
		signUp,
		resetPassword,
		updatePassword
	};
}

export const authService = createAuthService();
