import type { ComponentType } from 'svelte';

import Cross from './Cross.svelte';
import Check from './Check.svelte';
import Envelope from './Envelope.svelte';
import Key from './Key.svelte';
import User from './User.svelte';
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
	user: 'user'
} as const;

export const ICONS: Icon[] = [
	{ name: icons['cross'], component: Cross },
	{ name: icons['check'], component: Check },
	{ name: icons['envelope'], component: Envelope },
	{ name: icons['key'], component: Key },
	{ name: icons['user'], component: User }
];

export type IconName = keyof typeof icons;
