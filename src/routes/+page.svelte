<script lang="ts">
	import { photoGalleryService } from '$lib/services/photo-gallery.service';

	const { createPhotoAlbum, readPhotoAlbums } = photoGalleryService;

	let bucketName = '';
</script>

<div class="flex flex-col mt-10 w-2/3 mx-auto">
	<form
		class="flex justify-center items-center gap-5 mb-10"
		on:submit={() => createPhotoAlbum(bucketName)}
	>
		<input type="text" class="input input-bordered" bind:value={bucketName} required />
		<button class="btn">Create Photo Album</button>
	</form>

	{#await readPhotoAlbums()}
		<h1>Loading...</h1>
	{:then albums}
		<ul class="flex items-center flex-col">
			{#each albums as album}
				<a href="detail/{album.id}" class="btn btn-wide mb-3">{album.bucket_name}</a>
			{/each}
		</ul>
	{:catch error}
		<!-- promise was rejected -->
	{/await}
</div>
