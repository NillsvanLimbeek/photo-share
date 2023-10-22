<script lang="ts">
	import { photoAlbumService } from '$lib/services/photo-album.service';
	import { prettyTitle } from '$lib/utils';

	const { useCreatePhotoAlbum, useFetchPhotoAlbums } = photoAlbumService;

	const photoAlbumsQuery = useFetchPhotoAlbums();
	const createPhotoAlbumMutation = useCreatePhotoAlbum();

	let bucketName = '';

	function handleSubmit() {
		$createPhotoAlbumMutation.mutate(bucketName, {
			onSuccess: () => {
				$photoAlbumsQuery.refetch();
				bucketName = '';
			}
		});
	}
</script>

<div class="flex flex-col mt-10 w-full mx-auto">
	<form
		class="flex justify-center items-center gap-5 mb-10 flex-col w-full"
		on:submit={handleSubmit}
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
				<a href="detail/{album.id}" class="btn btn-wide mb-3">{prettyTitle(album.bucket_name)}</a>
			{/each}
		</ul>
	{/if}
</div>
