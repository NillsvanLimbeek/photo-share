<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';
	import Input from '../../../components/input/Input.svelte';

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
