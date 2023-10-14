<script lang="ts">
	import { Gallery, type ImgType } from 'flowbite-svelte';

	import { page } from '$app/stores';
	import { photoAlbumService } from '$lib/services/photo-album.service';

	import QrCode from '$components/QrCode.svelte';

	const { useFetchPhotoAlbum, useFetchPhotos, downloadImage } = photoAlbumService;
	const photoAlbumQuery = useFetchPhotoAlbum($page.params.id);
	$: photoQuery = useFetchPhotos($photoAlbumQuery.data?.bucket_name || '');

	let images: ImgType[] = [];

	$: if ($photoQuery.data?.length && $photoAlbumQuery.data?.bucket_name) {
		for (const photo of $photoQuery.data) {
			fetchImage(photo.name, $photoAlbumQuery.data.bucket_name);
		}
	}

	async function fetchImage(name: string, bucket: string) {
		const url = await downloadImage(name, bucket);
		images = [...images, { src: url, alt: name }];
	}
</script>

{#if $photoAlbumQuery.isLoading}
	<!-- TODO loading state -->
	<h1>Loading...</h1>
{:else if $photoAlbumQuery.isError}
	<!-- TODO error state -->
	<h1>Error: {$photoAlbumQuery.error.message}</h1>
{:else}
	<div class="flex flex-col justify-center w-full mt-10">
		<div class="flex flex-col w-1/3 mx-auto justify-center">
			<QrCode
				url="{import.meta.env.VITE_BASE_URL}/upload?bucket={$photoAlbumQuery.data.bucket_name}"
			/>
		</div>
	</div>
{/if}

{#if images.length > 0}
	<Gallery items={images} class="w-full gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" let:item>
		<div class="relative w-full pb-[100%] overflow-hidden">
			<img src={item.src} alt={item.alt} class="absolute w-full h-full object-cover rounded-lg" />
		</div>
	</Gallery>
{/if}
