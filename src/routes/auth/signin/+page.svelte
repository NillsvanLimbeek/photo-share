<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

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
		<input type="email" class="input input-bordered" placeholder="Email" bind:value={email} />
		<input
			type="password"
			class="input input-bordered"
			placeholder="Password"
			bind:value={password}
		/>
		<a href="/auth/forgotpassword" class="text-sm link text-right mb-2">Forgot password?</a>

		<button class="btn mb-4">Sign In</button>
		<a href="/auth/signup" class="text-sm link text-center">Don't have an account? Register</a>
	</form>
</div>
