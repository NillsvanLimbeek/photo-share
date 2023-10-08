import { get } from 'svelte/store';

import { supabase } from '$lib/supabase';
import { kebabCase, raise } from '$lib/utils';
import { authService } from './auth.service';

function createPhotoGalleryService() {
	async function fetchPhotoGallery(id: string) {
		const { data, error } = await supabase.from('photo_albums').select('*').eq('id', id).single();

		if (error) throw error;

		return data;
	}

	async function createBucket(bucketName: string) {
		const { data, error } = await supabase.storage.createBucket(kebabCase(bucketName), {
			public: true, // all files inside this bucket will be public
			allowedMimeTypes: ['image/*']
		});

		if (error) throw error;

		console.log(data);
	}

	async function createDatabaseEntry(bucketName: string) {
		const user = get(authService) ?? raise('User not logged in');

		const { data, error } = await supabase
			.from('photo_albums')
			.insert({ bucket_name: kebabCase(bucketName), user_id: user.id });

		if (error) throw error;

		console.log(data);
	}

	async function readPhotoAlbums() {
		const { data, error } = await supabase.from('photo_albums').select('*');

		if (error) throw error;

		return data;
	}

	async function createPhotoAlbum(bucketName: string) {
		try {
			await createBucket(bucketName);
			await createDatabaseEntry(bucketName);
		} catch (error) {
			console.error(error);
		}
	}

	async function fetchPhotos(bucketName: string) {
		const { data, error } = await supabase.storage.from(bucketName).list();

		if (error) raise(`${error.message}}`);

		return data.filter((photo) => !photo.name.includes('empty'));
	}

	return {
		fetchPhotoGallery,
		createBucket,
		readPhotoAlbums,
		createPhotoAlbum,
		fetchPhotos
	};
}

export const photoGalleryService = createPhotoGalleryService();
