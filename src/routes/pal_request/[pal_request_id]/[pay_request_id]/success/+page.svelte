<script>
    import LinkButton from "$lib/components/LinkButton.svelte"
</script>

<main class="box">
    <h1>
        Paid successfully!
    </h1>

    <div>
        <LinkButton href="/pals">Keep Searching</LinkButton>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2em;
        margin: auto;
        max-width: 30rem;
    }
    div {
        display: flex;
        justify-content: center;
    }
</style>
