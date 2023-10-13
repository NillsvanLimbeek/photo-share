/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {}
	},

	darkMode: 'class',

	plugins: [require('daisyui'), require('flowbite/plugin')],
	daisyui: {
		themes: ['bumblebee']
	}
};

module.exports = config;
