<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('the component has mounted');
	});
</script>

<div class="max-w-4xl mx-auto px-8 my-12">
	<slot />
</div>
