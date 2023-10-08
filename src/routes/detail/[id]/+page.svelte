<script lang="ts">
	import { page } from '$app/stores';
	import { photoGalleryService } from '$lib/services/photo-gallery.service';
	import { supabase } from '$lib/supabase';

	import GalleryImage from '../../../components/GalleryImage.svelte';
	import QrCode from '../../../components/QrCode.svelte';

	const { fetchPhotoGallery, fetchPhotos } = photoGalleryService;

	async function fetchAll() {
		const gallery = await fetchPhotoGallery($page.params.id);
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
				<GalleryImage {supabase} url={photo.name} bucket={data.gallery.bucket_name} size={250} />
			{/each}
		</div>
	</div>
{:catch error}
	<!-- fetch was rejected -->
{/await}
