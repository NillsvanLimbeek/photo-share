<script lang="ts">
	import { type ComponentType, onMount } from 'svelte';

	import { ICONS, type IconName, type IconProps } from './';

	export let name: IconName;
	export let props: IconProps = {};

	let component: ComponentType;

	onMount(() => {
		const icon = ICONS.find((icon) => icon.name === name);
		if (!icon) throw new Error(`${name} was not found as icon`);
		component = icon.component;
	});
</script>

<svelte:component this={component} {...props} />
