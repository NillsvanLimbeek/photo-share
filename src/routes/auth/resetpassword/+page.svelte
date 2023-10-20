<script lang="ts">
	import { goto } from '$app/navigation';
	import { authService } from '$lib/services/auth.service';

	const { updatePassword } = authService;

	let password = '';

	async function handleSubmit() {
		const res = await updatePassword(password);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			return;
		}

		goto('/auth/signin?password=true');
	}
</script>

<div class="h-full flex items-center mx-auto px-5 max-w-xs sm:w-1/2 md:max-w-md">
	<form class=" relative flex flex-col gap-4 w-full" on:submit|preventDefault={handleSubmit}>
		<input type="password" class="input input-bordered" placeholder="Email" bind:value={password} />

		<button class="btn mb-4">Set new password</button>
	</form>
</div>
