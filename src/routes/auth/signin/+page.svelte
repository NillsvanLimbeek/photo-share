<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';
	import Input from '../../../components/input/Input.svelte';

	const { signIn } = authService;

	let email = '';
	let password = '';

	async function handleSubmit() {
		const res = await signIn(email, password);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			return;
		}

		goto('/');
	}
</script>

<div class="w-full h-full flex justify-center items-center">
	<form class="flex flex-col gap-4 w-1/3" on:submit|preventDefault={handleSubmit}>
		<Input
			required
			value={email}
			type="email"
			placeholder="Email"
			icon="envelope"
			on:input={(e) => (email = e.detail)}
		/>
		<Input
			required
			value={password}
			type="password"
			placeholder="Password"
			icon="key"
			on:input={(e) => (password = e.detail)}
		/>
		<a href="/auth/forgotpassword" class="text-sm link text-right mb-2">Forgot password?</a>

		<button class="btn mb-4">Sign In</button>
		<a href="/auth/signup" class="text-sm link text-center">Don't have an account? Register</a>
	</form>
</div>
