<script lang="ts">
	import { notificationService } from '$lib/services/notification.service';

	import NotificationList from '../components/notification/NotificationList.svelte';

	const { showNotification } = notificationService;
</script>

<NotificationList />

<div class="w-full h-full flex justify-center items-center flex-col gap-5">
	<a class="btn btn-wide" href="/view">View Photos</a>
	<a class="btn btn-wide" href="/upload">Upload Photos</a>

	<button class="btn btn-wide" on:click={() => showNotification('Hello World!')}>
		Show Notification
	</button>
</div>
