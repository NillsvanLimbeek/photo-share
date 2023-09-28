<script lang="ts">
	import { onMount } from 'svelte';
	import { Camera, CameraResultType } from '@capacitor/camera';
	import { v4 as uuidv4 } from 'uuid';

	import { supabase } from '$lib/supabase';
	import { raise } from '$lib/utils/raise';
	import { createStateMachine, type State } from '$lib/services/state-machine';

	import Spinner from '../../components/Spinner.svelte';

	const { state, transition } = createStateMachine<State>('IDLE');

	async function checkPermissions() {
		const { camera, photos } = await Camera.checkPermissions();

		if (!camera || !photos) {
			Camera.requestPermissions();
		}
	}

	async function pickImages() {
		const images = await Camera.pickImages({});

		images.photos.forEach((image) => {
			const name = image.webPath.split('/').pop() || uuidv4();

			fetch(image.webPath)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], name, { type: `image/${image.format}` });
					uploadToStorage(file);
				});
		});
	}

	async function uploadToStorage(file: File) {
		transition('LOADING');
		const { data, error } = await supabase.storage.from('photos').upload(file.name, file);

		if (error) {
			console.error(error);
			transition('ERROR');
		} else {
			console.log(data);
			transition('IDLE');
		}
	}

	async function takePicture() {
		const photo = await Camera.getPhoto({
			resultType: CameraResultType.Uri
		});

		if (!photo.webPath) raise('No photo path found');

		const name = photo.webPath.split('/').pop() || uuidv4();

		fetch(photo.webPath)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], name, { type: `image/${photo.format}` });
				uploadToStorage(file);
			});
	}

	onMount(() => {
		checkPermissions();
	});
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if $state === 'LOADING'}
		<Spinner />
	{/if}

	{#if $state === 'ERROR'}
		<h1>Error...</h1>
	{/if}

	{#if $state === 'IDLE'}
		<div class="flex flex-col gap-5">
			<button class="btn" on:click={pickImages}>Open Gallery</button>
			<button class="btn" on:click={takePicture}>Take Picture</button>
		</div>
	{/if}
</div>
