<script lang="ts">
	export let collapsed = true;
	export let hasContent = true;
	export let theme: CombinedOutcomeName = 'NONE';
</script>

<div class="w-full">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class={`flex justify-between px-2 py-1 cursor-pointer bg-${theme.toLowerCase()} bg-opacity-70`}
		on:click={() => (collapsed = !collapsed)}
	>
		<slot name="text" />
		{#if hasContent}
			<div class="select-none">{!collapsed ? 'v' : '>'}</div>
		{/if}
	</div>

	{#if !collapsed && hasContent}
		<div class="py-1 px-4">
			<slot name="content" />
		</div>
	{/if}
</div>
