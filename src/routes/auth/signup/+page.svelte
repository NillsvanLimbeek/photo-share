<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';
	import AuthBox from '../../../components/AuthBox.svelte';
	import Input from '../../../components/input/Input.svelte';

	const { signUp } = authService;

	let name = '';
	let email = '';
	let password = '';

	let error = true;

	async function handleSubmit() {
		const res = await signUp(name, email, password);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			error = true;
			return;
		}

		goto('/auth/signin?success=true');
	}
</script>

<div class="h-full flex items-center mx-auto px-5 max-w-xs sm:w-1/2 md:max-w-md">
	<form class=" relative flex flex-col gap-4 w-full" on:submit|preventDefault={handleSubmit}>
		{#if error}
			<AuthBox userAlreadyExcist />
		{/if}

		<Input
			required
			type="text"
			placeholder="Name"
			icon="user"
			value={name}
			on:input={(e) => (name = e.detail)}
		/>
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

		<button class="btn">Sign Up</button>
		<a href="/auth/signin" class="text-sm link text-center">Have an account? Sign in</a>
	</form>
</div>
