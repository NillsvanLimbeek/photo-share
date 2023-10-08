<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { authService } from '$lib/services/auth.service';
	import { raise } from '$lib/utils/raise';

	let bucketName = '';

	async function createPhotoAlbum() {
		try {
			await createBucket(bucketName);
			await createDatabaseEntry(bucketName);
		} catch (error) {
			console.error(error);
		}
	}

	async function createBucket(bucketName: string) {
		try {
			const { data, error } = await supabase.storage.createBucket(bucketName, {
				public: true, // all files inside this bucket will be public
				allowedMimeTypes: ['image/*']
			});

			if (error) throw error;

			console.log(data);
		} catch (error) {
			throw error;
		}
	}

	async function createDatabaseEntry(bucketName: string) {
		try {
			const user = $authService ?? raise('User not logged in');
			const { data, error } = await supabase
				.from('photo_albums')
				.insert({ bucket_name: bucketName, user_id: user.id });

			if (error) throw error;

			console.log(data);
		} catch (error) {
			throw error;
		}
	}

	async function readPhotoAlbums() {
		try {
			const { data, error } = await supabase.from('photo_albums').select('*');

			if (error) throw error;

			return data;
		} catch (error) {
			throw error;
		}
	}
</script>

<div class="flex flex-col mt-10 w-2/3 mx-auto">
	<form class="flex justify-center items-center gap-5 mb-10" on:submit={() => createPhotoAlbum()}>
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
