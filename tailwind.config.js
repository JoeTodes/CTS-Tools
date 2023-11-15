/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				pae: 'coral',
				ku: 'cadetblue',
				ccc: 'palegoldenrod'
			}
		}
	},
	plugins: [],
	safelist: ['bg-coral', 'bg-cadetblue', 'bg-palegoldenrod']
};
