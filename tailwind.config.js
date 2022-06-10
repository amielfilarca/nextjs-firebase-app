/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	important: '#__next',
	theme: {
		extend: {}
	},
	plugins: ['prettier-plugin-tailwindcss'],
	corePlugins: {
		preflight: false
	}
}
