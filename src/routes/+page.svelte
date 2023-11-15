<script lang="ts">
	import CourseView from '$lib/components/CourseView.svelte';
	import SearchAutoComplete from '$lib/components/SearchAutoComplete.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let isLoading = true;

	export let data: PageData;
	let selectedCourse: Course | null;
	$: courses = data?.courses;

	onMount(() => {
		isLoading = false;
	});
</script>

<!-- <input type="number" bind:value={courseIndex} /> -->
{#if isLoading}
	<p>Loading...</p>
{:else}
	<div class="flex space-x-2 my-4">
		<label for="search-autocomplete-input">Search By One Credit Course:</label>
		<SearchAutoComplete {courses} bind:selected={selectedCourse} />
	</div>
	{#if selectedCourse}
		<CourseView course={selectedCourse} />
	{/if}
{/if}
