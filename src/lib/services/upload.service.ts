import { Camera, CameraResultType, type GalleryPhoto, type Photo } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '$lib/supabase';

import { createStateMachine, type State } from '$lib/services/state-machine';
import { raise } from '$lib/utils/raise';

function createUploadService() {
	const { state, transition } = createStateMachine<State>('IDLE');

	function init() {
		checkPermissions();
	}

	async function checkPermissions() {
		const { camera, photos } = await Camera.checkPermissions();

		if (!camera || !photos) {
			Camera.requestPermissions();
		}
	}

	async function pickImages() {
		const images = await Camera.pickImages({});

		images.photos.forEach(async (image) => {
			const file = await fetchFromLocalFileSystem(image);
			uploadToStorage(file);
		});
	}

	async function takePicture() {
		const photo = await Camera.getPhoto({
			resultType: CameraResultType.Uri
		});

		const file = await fetchFromLocalFileSystem(photo);
		uploadToStorage(file);
	}

	async function uploadToStorage(file: File) {
		try {
			transition('LOADING');
			const { error } = await supabase.storage.from('photos').upload(file.name, file);

			if (error) throw error;

			transition('IDLE');
		} catch (error) {
			console.error(error);
			transition('ERROR');
		}
	}

	async function fetchFromLocalFileSystem(image: Photo | GalleryPhoto) {
		if (!image.webPath) raise('No photo path found');

		try {
			const name = image.webPath.split('/').pop() || uuidv4();

			const res = await fetch(image.webPath);
			const blob = await res.blob();

			return new File([blob], name, { type: `image/${image.format}` });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	init();

	return {
		state,
		pickImages,
		takePicture
	};
}

export const uploadService = createUploadService();
