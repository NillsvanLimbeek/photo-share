<script lang="ts">
	import { page } from '$app/stores';
	import { photoAlbumService } from '$lib/services/photo-album.service';
	import { supabase } from '$lib/supabase';

	import AlbumImage from '../../../components/AlbumImage.svelte';
	import QrCode from '../../../components/QrCode.svelte';

	const { fetchPhotoAlbum, fetchPhotos } = photoAlbumService;

	async function fetchAll() {
		const gallery = await fetchPhotoAlbum($page.params.id);
		const photos = await fetchPhotos(gallery.bucket_name);

		return { gallery, photos };
	}
</script>

{#await fetchAll()}
	<h1>Loading...</h1>
{:then data}
	<div class="flex flex-col justify-center w-full mt-10">
		<div class="flex flex-col w-1/3 mx-auto justify-center">
			<QrCode url="{import.meta.env.VITE_BASE_URL}/upload?bucket={data.gallery.bucket_name}" />
		</div>

		<div class="grid grid-cols-3 gap-5 p-10">
			{#each data.photos as photo}
				<AlbumImage {supabase} url={photo.name} bucket={data.gallery.bucket_name} size={250} />
			{/each}
		</div>
	</div>
{:catch error}
	<!-- fetch was rejected -->
{/await}
