<script lang="ts">
	export let success: boolean = false;
	export let invalidCredentials: boolean = false;
	export let userAlreadyExcist: boolean = false;
</script>

<div
	class="absolute top-[15rem] flex justify-center items-center mb-14 w-1/3 py-3 rounded border {success
		? 'border-green-400 bg-green-100'
		: 'border-red-400 bg-red-100'}"
>
	<div class="flex flex-col gap-2">
		{#if success}
			<p class="text-center text-xl">Account created successfully!</p>
			<p class="text-center text-sm">Please sign in to continue.</p>
		{/if}

		{#if invalidCredentials}
			<p class="text-center text-xl">Wrong email or password</p>
			<p class="text-center text-sm">Please try again</p>
		{/if}

		{#if userAlreadyExcist}
			<p class="text-center text-xl">User already registered</p>
			<p class="text-center text-sm">Please try another email address</p>
		{/if}
	</div>
</div>
