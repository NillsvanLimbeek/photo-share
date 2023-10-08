<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabase';

	import QrCode from '../../../components/QrCode.svelte';

	async function fetchPhotoAlbum() {
		try {
			const { data, error } = await supabase
				.from('photo_albums')
				.select('*')
				.eq('id', $page.params.id)
				.single();

			if (error) throw error;

			return data;
		} catch (error) {
			throw error;
		}
	}
</script>

<h1>Detail Page</h1>
{#await fetchPhotoAlbum()}
	<h1>Loading...</h1>
{:then data}
	<pre>{JSON.stringify(data, null, 2)}</pre>
	<div class="flex justify-center w-full">
		<QrCode url="http://localhost:5173/upload?id={data.id}" />
	</div>
{:catch error}
	<!-- fetch was rejected -->
{/await}
