<script lang="ts">
	import { Gallery, type ImgType } from 'flowbite-svelte';
	import type { FileObject } from '@supabase/storage-js';

	import { page } from '$app/stores';
	import { photoAlbumService } from '$lib/services/photo-album.service';

	import QrCode from '../../../../components/QrCode.svelte';

	const { fetchPhotoAlbum, fetchPhotos, downloadImage } = photoAlbumService;

	let bucketName: string = '';
	let photos: FileObject[] = [];
	let images: ImgType[] = [];

	async function fetchImage(name: string, bucket: string) {
		const url = await downloadImage(name, bucket);
		images = [...images, { src: url, alt: name }];
	}

	async function fetchAll() {
		const gallery = await fetchPhotoAlbum($page.params.id);
		const photoRes = await fetchPhotos(gallery.bucket_name);

		bucketName = gallery.bucket_name;
		photos = photoRes;

		return { gallery };
	}

	$: if (photos.length && bucketName) {
		for (const photo of photos) {
			fetchImage(photo.name, bucketName);
		}
	}
</script>

{#await fetchAll()}
	<h1>Loading...</h1>
{:then data}
	<div class="flex flex-col justify-center w-full mt-10">
		<div class="flex flex-col w-1/3 mx-auto justify-center">
			<QrCode url="{import.meta.env.VITE_BASE_URL}/upload?bucket={data.gallery.bucket_name}" />
		</div>
	</div>
{:catch error}
	<!-- fetch was rejected -->
{/await}

{#if images.length > 0}
	<Gallery items={images} class="w-full gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" let:item>
		<div class="relative w-full pb-[100%] overflow-hidden">
			<img src={item.src} alt={item.alt} class="absolute w-full h-full object-cover rounded-lg" />
		</div>
	</Gallery>
{/if}
