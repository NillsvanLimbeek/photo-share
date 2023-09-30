import type { ComponentType } from 'svelte';

import Cross from './Cross.svelte';
import Check from './Check.svelte';

export interface Icon {
	name: string;
	component: ComponentType;
}

export interface IconProps {
	size?: string;
}

export const icons = {
	cross: 'cross',
	check: 'check'
} as const;

export const ICONS: Icon[] = [
	{ name: icons['cross'], component: Cross },
	{ name: icons['check'], component: Check }
];

export type IconName = keyof typeof icons;
