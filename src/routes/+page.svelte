<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import CourseView from '$lib/components/CourseView.svelte';
	import SearchAutoComplete from '$lib/components/SearchAutoComplete.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let selectedCourse: Course | null;
	let courses = data?.courses;
</script>

<!-- <input type="number" bind:value={courseIndex} /> -->

<SearchAutoComplete {courses} bind:selected={selectedCourse} />
{#if selectedCourse}
	<CourseView course={selectedCourse} />
{/if}
