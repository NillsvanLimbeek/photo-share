<script lang="ts">
	import QRCode from 'qrcode';

	export let width = 20;
	export let url: string;

	let canvas: HTMLCanvasElement;

	function createQRCode(canvas: HTMLCanvasElement, url: string, width: number, margin: number) {
		if (!canvas) {
			return;
		}

		QRCode.toCanvas(
			canvas,
			url,
			{ width: width * 10, margin, errorCorrectionLevel: 'L' },
			(error) => {
				if (error) {
					console.error(error);
				}
			}
		);
	}

	$: createQRCode(canvas, url, width, 0);
</script>

<div class="flex flex-col">
	<div class="relative" style="width:{width}rem;height:{width}rem">
		<canvas class="absolute top-0 left-0" bind:this={canvas} />
	</div>
	<!-- TODO testing only -->
	<a class="btn mt-5" href={url}>Upload</a>
</div>

<style>
	canvas {
		width: 100% !important;
		height: 100% !important;
	}
</style>
