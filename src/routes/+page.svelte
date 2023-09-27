<script lang="ts">
	import { supabase } from '$lib/supabase';

	async function fetchBucket() {
		const { data, error } = await supabase.storage.from('photos').list();

		if (error) {
			console.error(error);
		} else {
			return data;
		}
	}
</script>

<button class="btn" on:click={fetchBucket}>Fetch</button>
