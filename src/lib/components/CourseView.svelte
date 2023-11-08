<script lang="ts">
	export let course: Course;
	let { info, prereqs, outcomes, weights } = course;
</script>

<h2>{info.area}{info.code}: {info.name}</h2>
<div>
	<h3>Level</h3>
	<p>{info.level}</p>
	<h3>Prerequisites</h3>
	{#each prereqs as prereq}
		<p>{prereq.area}{prereq.code}: {prereq.name}</p>
	{/each}
	<h3>Description</h3>
	<p>{info.description}</p>
	<h3>Parameters</h3>
	<p>{info.parameters}</p>
</div>
<div>
	<h3>Combined Outcome Weights</h3>
	{#each weights as weight}
		<p>CO{weight.outcome}:{weight.outcomeName}: {weight.value}%</p>
	{/each}
</div>
<div>
	<h3>Outcomes</h3>
	{#if outcomes}
		{#each outcomes as outcome}
			<h4>
				{outcome.num}. {outcome.text} -- {outcome.combinedOutcome}
			</h4>
			{#each outcome.specifics as specific}
				<p>{specific.general}.{specific.num} {specific.text}</p>
				{#each specific.subs as sub}
					<div>{sub.general}.{sub.specific}.{sub.num} {sub.text}</div>
				{/each}
			{/each}
		{/each}
	{/if}
</div>
