<script lang="ts">
	export let courses: Course[];
	export let selected: Course | null = null;
	let show = true;
	let input = '';

	$: filteredCourses = input
		? courses
				.filter(
					(course) =>
						input.length >= 3 && fullname(course).toLowerCase().includes(input.toLowerCase())
				)
				.slice(0, 10)
		: [];
	$: if (filteredCourses.length) highlit = 0;

	let highlit = 0;

	const segmentIndex = (text: string, search: string) =>
		text.toLowerCase().search(search.toLowerCase());

	const fullname = (course: Course) =>
		`${course.info.area}${course.info.code}: ${course.info.name}`;

	const keyNav = (key: string) => {
		switch (key) {
			case 'ArrowDown':
				highlit++;
				highlit %= filteredCourses.length;
				break;
			case 'ArrowUp':
				highlit--;
				if (highlit < 0) highlit = filteredCourses.length - 1;
				break;
			case 'Enter':
				onSelect();
				break;
			case 'Tab':
				onSelect();
				break;

			default:
				break;
		}
	};

	const onSelect = () => {
		selected = filteredCourses[highlit];
		input = fullname(selected);
		document.getElementById('search-autocomplete-input')?.blur();
		show = false;
	};
</script>

<div class="wrapper">
	<input
		id="search-autocomplete-input"
		type="text"
		bind:value={input}
		on:focus={() => {
			input = '';
			show = true;
		}}
		on:keydown={(e) => keyNav(e.key)}
		class="border-black border-2 rounded-md"
		placeholder="begin typing course name, number, or area"
	/>
	{#if filteredCourses.length > 0 && show}
		<div class="list">
			{#each filteredCourses as c, i}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={onSelect}
					on:mouseenter={() => (highlit = i)}
					class="{i == highlit ? 'highlit' : ''} list-item"
				>
					<!-- {fullname(c)} -->
					{fullname(c).substring(0, segmentIndex(fullname(c), input))}<strong
						>{fullname(c).substring(
							segmentIndex(fullname(c), input),
							segmentIndex(fullname(c), input) + input.length
						)}</strong
					>{fullname(c).substring(segmentIndex(fullname(c), input) + input.length)}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		width: 350px;
		position: relative;
	}
	.wrapper > * {
		width: 100%;
	}
	.list {
		background-color: white;
		border: 1px solid rgb(178, 178, 178);
		position: absolute;
		top: 100%;
		z-index: 10;
	}
	.list-item {
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		padding: 2px 4px;
		cursor: pointer;
	}
	.highlit {
		background-color: rgb(178, 178, 178);
	}
</style>
