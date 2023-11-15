<script lang="ts">
	import Accordion from './Accordion.svelte';

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
	{#if outcomes}
		{#each outcomes as outcome}
			<Accordion hasContent={outcome.specifics.length > 0} theme={outcome.combinedOutcome}>
				<div slot="text">
					{outcome.num}. {outcome.text} -- {outcome.combinedOutcome}
				</div>
				<div slot="content">
					{#each outcome.specifics as specific}
						<Accordion hasContent={specific.subs.length > 0}>
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
