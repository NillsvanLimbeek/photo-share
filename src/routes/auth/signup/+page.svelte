<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	const { signUp } = authService;

	let name = '';
	let email = '';
	let password = '';

	async function handleSubmit() {
		const res = await signUp(name, email, password);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			return;
		}

		goto('/auth/signin?success=true');
	}
</script>

<div class="w-full h-full flex justify-center items-center">
	<form class="flex flex-col gap-4 w-1/3" on:submit|preventDefault={handleSubmit}>
		<input type="text" class="input input-bordered" placeholder="Name" bind:value={name} />
		<input type="email" class="input input-bordered" placeholder="Email" bind:value={email} />
		<input
			type="password"
			class="input input-bordered"
			placeholder="Password"
			bind:value={password}
		/>

		<button class="btn">Sign Up</button>
		<a href="/auth/signin" class="text-sm link text-center">Have an account? Sign in</a>
	</form>
</div>
