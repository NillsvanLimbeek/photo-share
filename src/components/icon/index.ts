import type { ComponentType } from 'svelte';

import Cross from './Cross.svelte';
import Check from './Check.svelte';
import Envelope from './Envelope.svelte';
import Key from './Key.svelte';
import User from './User.svelte';
import Qr from './Qr.svelte';
import Image from './Image.svelte';
export interface Icon {
	name: string;
	component: ComponentType;
}

export interface IconProps {
	size?: string;
}

export const icons = {
	cross: 'cross',
	check: 'check',
	envelope: 'envelope',
	key: 'key',
	user: 'user',
	qr: 'qr',
	image: 'image'
} as const;

export const ICONS: Icon[] = [
	{ name: icons['cross'], component: Cross },
	{ name: icons['check'], component: Check },
	{ name: icons['envelope'], component: Envelope },
	{ name: icons['key'], component: Key },
	{ name: icons['user'], component: User },
	{ name: icons['qr'], component: Qr },
	{ name: icons['image'], component: Image }
];

export type IconName = keyof typeof icons;
