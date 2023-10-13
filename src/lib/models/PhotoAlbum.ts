import { z } from 'zod';

export const PhotoAlbumSchema = z.object({
	id: z.number(),
	created_at: z.string(),
	user_id: z.string().uuid(),
	bucket_name: z.string()
});

export const PhotoAlbumsSchema = z.array(PhotoAlbumSchema);

export type PhotoAlbum = z.infer<typeof PhotoAlbumSchema>;
