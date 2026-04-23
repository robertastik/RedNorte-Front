<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen bg-slate-50 font-sans text-slate-900 antialiased">
	<!-- Sidebar Navigation -->
	<Sidebar />

	<!-- Contenido Principal -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Topbar/Header -->
		<Header />

		<!-- Área scrollable -->
		<main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
			{@render children()}
		</main>
	</div>
</div>
