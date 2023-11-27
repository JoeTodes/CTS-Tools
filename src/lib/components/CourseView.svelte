<script lang="ts">
	import Accordion from './Accordion.svelte';

	let generals: Accordion[] = [];
	let specifics: Accordion[] = [];
	let expandAll = true;
	let correctionFormURL =
		'https://docs.google.com/forms/d/e/1FAIpQLSf2T6JESS_0Tv7udQHf3XgPZwZeXnDqwC54nwirOl3yQAfVfA/viewform?usp=sf_link';
	export let course: Course;
	$: ({ info, prereqs, outcomes, weights } = course);
</script>

<h2 class="font-bold text-lg">{info.area}{info.code}: {info.name}</h2>
<div>
	<div class="header-section">
		<h3>Level:</h3>
		<p>{info.level}</p>
	</div>
	<div class="header-section">
		<h3>Prerequisites:</h3>
		<div>
			{#if prereqs.length === 0}
				<p>None</p>
			{:else}
				{#each prereqs as prereq}
					<p>{prereq.area}{prereq.code}: {prereq.name}</p>
				{/each}
			{/if}
		</div>
	</div>
</div>
<h3>Description:</h3>
<p>{info.description}</p>
{#if info.parameters}
	<h3>Parameters:</h3>
	<p>{info.parameters}</p>
{/if}
<div>
	<h3>Combined Outcome Weights:</h3>
	{#each weights as weight}
		<p class={`bg-${weight.outcomeName?.toLowerCase()} bg-opacity-70 w-32`}>
			CO{weight.outcome}:{weight.outcomeName}: {weight.value}%
		</p>
	{/each}
</div>
<div class="w-full">
	<h3>Outcomes:</h3>
	<div class="flex justify-between">
		<p class="text-slate-500">
			*Combined Outcome assignments are a work in progress. Please use <a
				class="visited:text-purple-500 text-blue-500 underline"
				href={correctionFormURL}
				target="_blank">this form</a
			> to suggest corrections
		</p>
		<button
			on:click={() => {
				expandAll = !expandAll;
				generals.forEach((a) => {
					a.collapsed = expandAll;
				});
				specifics.filter((s) => s).forEach((s) => (s.collapsed = expandAll));
			}}>{expandAll ? 'expand' : 'collapse'} all</button
		>
	</div>
	{#if outcomes}
		{#each outcomes as outcome, i}
			<Accordion
				bind:this={generals[i]}
				hasContent={outcome.specifics.length > 0}
				theme={outcome.combinedOutcome}
			>
				<div slot="text">
					{outcome.num}. {outcome.text} -- {outcome.combinedOutcome}
				</div>
				<div slot="content">
					{#each outcome.specifics as specific, j}
						<Accordion bind:this={specifics[i * 10 + j]} hasContent={specific.subs.length > 0}>
							<div slot="text">
								{specific.general}.{specific.num}
								{specific.text}
							</div>
							<div slot="content">
								{#each specific.subs as sub}
									<p class="py-1 px-2">{sub.general}.{sub.specific}.{sub.num} {sub.text}</p>
								{/each}
							</div>
						</Accordion>
					{/each}
				</div>
			</Accordion>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.header-section {
		@apply flex flex-row space-x-2;
	}
	h3 {
		@apply font-bold;
	}
</style>
