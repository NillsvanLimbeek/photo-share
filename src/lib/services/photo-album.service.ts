import { get } from 'svelte/store';

import { supabase } from '$lib/supabase';
import { kebabCase, raise } from '$lib/utils';
import { authService } from './auth.service';
import { PhotoAlbumSchema, type PhotoAlbum, PhotoAlbumsSchema } from '$lib/models/PhotoAlbum';

function createPhotoAlbumService() {
	async function fetchPhotoAlbum(id: string): Promise<PhotoAlbum> {
		const { data, error } = await supabase.from('photo_albums').select('*').eq('id', id).single();

		if (error) throw error;

		const result = PhotoAlbumSchema.safeParse(data);

		if (!result.success) {
			console.error(result.error);
			throw error;
		}

		return result.data;
	}

	async function createBucket(bucketName: string): Promise<void> {
		const { error } = await supabase.storage.createBucket(kebabCase(bucketName), {
			public: true, // all files inside this bucket will be public
			allowedMimeTypes: ['image/*']
		});

		if (error) throw error;
	}

	async function createDatabaseEntry(bucketName: string): Promise<void> {
		const user = get(authService) ?? raise('User not logged in');

		const { error } = await supabase
			.from('photo_albums')
			.insert({ bucket_name: kebabCase(bucketName), user_id: user.id });

		if (error) throw error;
	}

	async function fetchPhotoAlbums(): Promise<PhotoAlbum[]> {
		const { data, error } = await supabase.from('photo_albums').select('*');

		if (error) throw error;

		const result = PhotoAlbumsSchema.safeParse(data);

		if (!result.success) {
			console.error(result.error);
			throw error;
		}

		return result.data;
	}

	async function createPhotoAlbum(bucketName: string): Promise<void> {
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

	async function downloadImage(path: string, bucket: string): Promise<string> {
		try {
			const { data, error } = await supabase.storage.from(bucket).download(path);

			if (error) {
				throw error;
			}

			return URL.createObjectURL(data);
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}

			throw new Error('Error downloading image');
		}
	}
	return {
		fetchPhotoAlbum,
		createBucket,
		fetchPhotoAlbums,
		createPhotoAlbum,
		fetchPhotos,
		downloadImage
	};
}

export const photoAlbumService = createPhotoAlbumService();
