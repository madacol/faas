<script>
    import LinkButton from "$lib/components/LinkButton.svelte"

    export let data
    const {requestee, requester} = data
</script>

<main class="box">
    <h1> Paid successfully! </h1>

    <p>We've notified {requestee.name} that you're interested in meeting them on Friendpals.</p>
    <p>{requestee.name} has 7 days to decide to meet you.</p>
    <p>In case {requestee.name} doesn't make the payment within 7 days, we'll refund your money.</p>
    <p>Stay positive, and let's see what happens!</p>

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
