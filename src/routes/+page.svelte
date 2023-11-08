<script lang="ts">
	import CourseView from '$lib/components/CourseView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let courses = data?.courses;
</script>

<CourseView course={courses[0]} />
