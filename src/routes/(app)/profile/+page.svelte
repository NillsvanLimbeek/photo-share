<script lang="ts">
	import { goto } from '$app/navigation';

	import { authService } from '$lib/services/auth.service';
	import { supabase } from '$lib/supabase';

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;

		goto('/auth/signin');
	}
</script>

<div class="flex flex-col max-w-md mx-auto">
	<div class="text-center my-5">{$authService?.user_metadata.name}</div>
	<button class="btn" on:click={signOut}>Sign Out</button>
</div>
