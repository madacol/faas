<script>
    import LinkButton from "$lib/components/LinkButton.svelte"

    export let data
    const {requestee, requester} = data
</script>

<main class="box">
    <h1>Paid successfully!</h1>

    <h3>Congratulations!</h3>
    <p>You are now connected with {requester.name}, your potential friend on Friendpals.</p>
    <p>Here's {requester.name}'s contact info:</p>
    <p>Full name: {requester.name} {requester.lastname}</p>
    <p>Email: {requester.email}</p>
    <p>We've also shared your contact info with {requester.name}.</p>
    <p>We wish you a meaningful friendship!</p>

    <LinkButton href="/pals">Keep Searching</LinkButton>
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
    p {
        margin: 0;
    }
</style>
