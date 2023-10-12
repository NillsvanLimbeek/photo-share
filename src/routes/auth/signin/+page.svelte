<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	import Input from '../../../components/input/Input.svelte';
	import AuthBox from '../../../components/AuthBox.svelte';

	const { signIn } = authService;

	let email = '';
	let password = '';

	let error = false;

	async function handleSubmit() {
		const res = await signIn(email, password);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			error = true;
			return;
		}

		goto('/');
	}
</script>

<div class="relative w-full h-full flex flex-col justify-center items-center">
	{#if $page.url.searchParams.get('success')}
		<AuthBox success />
	{/if}

	{#if error}
		<AuthBox invalidCredentials />
	{/if}

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
