<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { raise } from '$lib/utils/raise';
	import GalleryImage from '../../components/GalleryImage.svelte';
	import Spinner from '../../components/Spinner.svelte';

	async function fetchPhotos() {
		const { data, error } = await supabase.storage.from('photos').list();

		if (error) raise(`${error.message}}`);

		return data.filter((photo) => !photo.name.includes('empty'));
	}
</script>

{#await fetchPhotos()}
	<Spinner />
{:then photos}
	<div class="grid grid-cols-3 gap-5 p-10">
		{#each photos as photo}
			<GalleryImage {supabase} url={photo.name} size={250} />
		{/each}
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}
