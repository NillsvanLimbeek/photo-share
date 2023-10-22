<script lang="ts">
	import { page } from '$app/stores';
	import { uploadService } from '$lib/services/upload.service';

	import Spinner from '../../components/Spinner.svelte';

	const bucketName = $page.url.searchParams.get('bucket');
	const { state, pickImages, takePicture } = uploadService;
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
			<button class="btn" on:click={() => pickImages(bucketName)}>Open Gallery</button>
			<button class="btn" on:click={() => takePicture(bucketName)}>Take Picture</button>
		</div>
	{/if}
</div>
