<script>
    import LinkButton from "$lib/components/LinkButton.svelte"

    export let data
    const {messages_to_show} = data
</script>

<main class="box">
    <h1>
        Paid successfully!
    </h1>

    {#each messages_to_show as message}
        <p>{message}</p>
    {/each}

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
    p {
        margin: 0;
    }
</style>
