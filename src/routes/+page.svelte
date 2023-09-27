<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { Camera, CameraResultType, type GalleryPhotos, type Photo } from '@capacitor/camera';

	let images: GalleryPhotos;
	let photo: Photo;

	async function fetchBucket() {
		const { data, error } = await supabase.storage.from('photos').list();

		if (error) {
			console.error(error);
		} else {
			return data;
		}
	}

	async function pickImages() {
		const image = await Camera.pickImages({});
		images = image;
	}

	async function takePicture() {
		const photos = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Uri
		});
		photo = photos;
	}
</script>

<button class="btn" on:click={fetchBucket}>Fetch</button>
<button class="btn" on:click={pickImages}>Pick Image</button>
<button class="btn" on:click={takePicture}>Take Picture</button>

{#if images}
	{#each images.photos as image}
		<img src={image.webPath} alt="image" />
	{/each}
{/if}

{#if photo}
	<img src={photo.webPath} alt="image" />
{/if}
