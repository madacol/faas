<script>
    import LinkButton from "$lib/components/LinkButton.svelte"
</script>

<main>
    <h1>
        Paid successfully!
    </h1>

    <LinkButton href="/pals">Keep Searching</LinkButton>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2em;
        height: 100%;
    }
</style>
