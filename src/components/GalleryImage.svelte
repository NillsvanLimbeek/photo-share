<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let url: string;
	export let size: number;

	let imageUrl: string | undefined;

	async function downloadImage(path: string) {
		try {
			const { data, error } = await supabase.storage.from('photos').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			imageUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	}

	$: if (url) downloadImage(url);
</script>

{#if imageUrl}
	<img
		src={imageUrl}
		alt={imageUrl ? 'Avatar' : 'No image'}
		style="height: {size}px; width: {size}px"
	/>
{/if}

<style>
	img {
		object-fit: cover;
	}
</style>
