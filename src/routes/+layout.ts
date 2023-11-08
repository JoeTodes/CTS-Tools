import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	let res = await fetch('./data/outcomes.json');
	let courses: Course[] = await res.json();
	return { courses };
};
