<script lang="ts">
	import { onMount } from 'svelte';
	import { notificationService, type Notification } from '$lib/services/notification.service';
	import { tweened } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import Icon from '../icon/Icon.svelte';

	export let notification: Notification;

	const { removeNotification } = notificationService;

	let timeToRemove = tweened(100, { duration: notification.duration });

	onMount(async () => {
		await timeToRemove.set(0);
		removeNotification(notification.id);
	});
</script>

<div
	class="fixed top-0 left-[50%] translate-x-[-50%] z-10"
	in:fly={{ y: -150, duration: 450 }}
	out:fade={{ duration: 200 }}
>
	<div
		class="flex justify-center items-center mt-10 px-10 py-3 border rounded"
		class:notification-success={notification.status === 'SUCCESS'}
		class:notification-error={notification.status === 'ERROR'}
	>
		<Icon name={notification.status === 'ERROR' ? 'cross' : 'check'} />
		<span class="ml-3">{notification.message}</span>
	</div>
</div>
