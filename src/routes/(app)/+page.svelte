<script lang="ts">
	import { photoAlbumService } from '$lib/services/photo-album.service';

	const { useCreatePhotoAlbum, useFetchPhotoAlbums } = photoAlbumService;

	const photoAlbumsQuery = useFetchPhotoAlbums();
	const createPhotoAlbumMutation = useCreatePhotoAlbum();

	let bucketName = '';
</script>

<div class="flex flex-col mt-10 w-2/3 mx-auto">
	<form
		class="flex justify-center items-center gap-5 mb-10"
		on:submit={() => $createPhotoAlbumMutation.mutate(bucketName)}
	>
		<input type="text" class="input input-bordered" bind:value={bucketName} required />
		<button class="btn">Create Photo Album</button>
	</form>

	{#if $photoAlbumsQuery.isLoading}
		<!-- TODO loading state -->
	{:else if $photoAlbumsQuery.isError}
		<!-- TODO error state -->
	{:else}
		<ul class="flex items-center flex-col">
			{#each $photoAlbumsQuery.data as album}
				<a href="detail/{album.id}" class="btn btn-wide mb-3">{album.bucket_name}</a>
			{/each}
		</ul>
	{/if}
</div>
