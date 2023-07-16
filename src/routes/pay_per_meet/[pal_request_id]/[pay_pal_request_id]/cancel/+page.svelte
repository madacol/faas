<script>
    import { onMount } from "svelte"

    onMount(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    })
</script>

<main>
    Payment cancelled!
</main>

<style>
    main {
        padding: 2em;
    }
</style>
