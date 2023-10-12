<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { IconName } from '../icon';

	import Icon from '../icon/Icon.svelte';

	export let value = '';
	export let type = 'text';
	export let placeholder = '';
	export let icon: IconName | undefined = undefined;
	export let required = false;

	const dispatch = createEventDispatcher<{ input: string }>();
</script>

<div class="relative w-full">
	<input
		{value}
		{type}
		{placeholder}
		{required}
		class="w-full input input-bordered {icon && 'pl-12'}"
		on:input={(e) => dispatch('input', e.currentTarget.value)}
	/>

	{#if icon}
		<div class="absolute left-3 top-[50%] translate-y-[-50%] text-gray-400">
			<Icon name={icon} />
		</div>
	{/if}
</div>
