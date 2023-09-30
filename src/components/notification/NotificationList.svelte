<script lang="ts">
	import { notificationService } from '$lib/services/notification.service';
	import Notification from './Notification.svelte';

	const notifications = notificationService;
</script>

{#each $notifications as notification (notification)}
	<Notification {notification} />
{/each}
