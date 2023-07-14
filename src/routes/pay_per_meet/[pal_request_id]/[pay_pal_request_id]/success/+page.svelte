<script>
    import { goto } from "$app/navigation"
    import { onMount } from "svelte"

    onMount(() => {
        setTimeout(() => {
            goto('/');
        }, 2000);
    })
</script>

<main>
    Paid successfully!
</main>

<style>
    main {
        padding: 2em;
    }
</style>
