<script lang="ts">
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import { uploadService } from '$lib/services/upload.service';
	import { supabase } from '$lib/supabase';

	import Spinner from '../../components/Spinner.svelte';

	const { state, pickImages, takePicture } = uploadService;

	async function fetchPhotoAlbum() {
		try {
			const { data, error } = await supabase
				.from('photo_albums')
				.select('*')
				.eq('id', $page.url.searchParams.get('id'))
				.single();

			if (error) throw error;

			return data;
		} catch (error) {
			throw error;
		}
	}

	onMount(async () => {
		const data = await fetchPhotoAlbum();
		console.log(data);
	});
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if $state === 'LOADING'}
		<Spinner />
	{/if}

	{#if $state === 'ERROR'}
		<h1>Error...</h1>
	{/if}

	{#if $state === 'IDLE'}
		<div class="flex flex-col gap-5">
			<button class="btn" on:click={pickImages}>Open Gallery</button>
			<button class="btn" on:click={takePicture}>Take Picture</button>
		</div>
	{/if}
</div>
