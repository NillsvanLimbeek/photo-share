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

<div class="w-full h-full flex justify-center items-center">
	<form class="flex flex-col gap-4 w-1/3" on:submit|preventDefault={handleSubmit}>
		<input type="password" class="input input-bordered" placeholder="Email" bind:value={password} />

		<button class="btn mb-4">Set new password</button>
	</form>
</div>
