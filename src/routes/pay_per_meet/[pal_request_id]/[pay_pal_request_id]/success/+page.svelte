<script>
    import { onMount } from "svelte"

    onMount(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
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
