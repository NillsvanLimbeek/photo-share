<script lang="ts">
	import { supabase } from '$lib/supabase';
</script>

<div class="w-full h-full flex justify-center items-center flex-col gap-5">
	<a class="btn btn-wide" href="/view">View Photos</a>
	<a class="btn btn-wide" href="/upload">Upload Photos</a>

	<button class="btn btn-wide" on:click={() => supabase.auth.signOut()}> Sign Out </button>
</div>
