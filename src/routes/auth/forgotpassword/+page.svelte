<script lang="ts">
	import { authService } from '$lib/services/auth.service';

	const { resetPassword } = authService;

	let email = '';

	async function handleSubmit() {
		const res = await resetPassword(email);

		if (res instanceof Error) {
			// TODO: Show error message
			console.error(res.message);
			return;
		}

		// TODO: show screen that email has been send
	}
</script>

<div class="w-full h-full flex justify-center items-center">
	<form class="flex flex-col gap-4 w-1/3" on:submit|preventDefault={handleSubmit}>
		<input type="email" class="input input-bordered" placeholder="Email" bind:value={email} />

		<button class="btn mb-4">Reset Password</button>
	</form>
</div>
