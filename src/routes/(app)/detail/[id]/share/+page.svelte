<script>
	import { page } from '$app/stores';
	import { photoAlbumService } from '$lib/services/photo-album.service';

	import QrCode from '../../../../../components/QrCode.svelte';

	const { useFetchPhotoAlbum, useFetchPhotos, downloadImage } = photoAlbumService;
	const photoAlbumQuery = useFetchPhotoAlbum($page.params.id);
</script>

{#if $photoAlbumQuery.isLoading}
	<!-- TODO loading state -->
	<h1>Loading...</h1>
{:else if $photoAlbumQuery.isError}
	<!-- TODO error state -->
	<h1>Error: {$photoAlbumQuery.error.message}</h1>
{:else}
	<div class="flex flex-col justify-center w-full mt-10">
		<div class="flex flex-col mx-auto justify-center">
			<QrCode
				url="{import.meta.env.VITE_BASE_URL}/upload?bucket={$photoAlbumQuery.data.bucket_name}"
			/>
		</div>
	</div>
{/if}
