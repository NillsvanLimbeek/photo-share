import { writable } from 'svelte/store';

export interface Notification {
	id: number;
	message: string;
	status: 'SUCCESS' | 'ERROR';
	duration: number;
}

function createNotifications() {
	const store = writable<Notification[]>([]);
	const { subscribe } = store;

	/**
	 * send a new notification
	 * @param message
	 * @param status status of the notification
	 * @param duration duration of the notification in miliseconds
	 */
	function showNotification(
		message: string,
		status: 'SUCCESS' | 'ERROR' = 'SUCCESS',
		duration = 3000
	) {
		const notification: Notification = {
			id: Math.floor(Math.random() * 1000),
			message,
			status,
			duration
		};

		store.update((state) => [...state, notification]);
	}

	/**
	 * remove a notification
	 * @param id id of the notification
	 */
	function removeNotification(id: number) {
		store.update((state) => [...state.filter((notification) => notification.id !== id)]);
	}

	return { subscribe, showNotification, removeNotification };
}

export const notificationService = createNotifications();
