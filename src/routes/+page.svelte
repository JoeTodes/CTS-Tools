<script lang="ts">
	import CourseView from '$lib/components/CourseView.svelte';
	import SearchAutoComplete from '$lib/components/SearchAutoComplete.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let selectedCourse: Course | null;
	let courses = data?.courses;
</script>

<!-- <input type="number" bind:value={courseIndex} /> -->
{#if courses.length > 0}
	<div class="flex space-x-2 my-4">
		<label for="search-autocomplete-input">Module Search:</label>
		<SearchAutoComplete {courses} bind:selected={selectedCourse} />
	</div>
	{#if selectedCourse}
		<CourseView course={selectedCourse} />
	{/if}
{:else}
	<p>Loading...</p>
{/if}
