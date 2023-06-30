<script>
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import TextArea from '$lib/components/TextArea.svelte'

    export let data
    let { name, lastname, email, gender, birthday, bio, pal_requests_count } =
        data.user
</script>

<main>
    <img
        src="/logo.png"
        alt="logo"
        style="padding-top: 10px; width:90px; align-self:center"
    />

    <form method="post">
        <h2 style="margin: 0; padding:0;">{name + ' ' + lastname}</h2>

        <p><i class="fa fa-map-marker" aria-hidden="true" /> Windsor, Canada</p>
        <p><i class="fa fa-user-o" aria-hidden="true" /> Gender: {gender}</p>
        <p>
            <i class="fa fa-calendar-o" aria-hidden="true" /> Birthday on {birthday}
        </p>
        <br />
        <p>
            To proceed with meeting {name}, a payment of 4.99 CAD is required.
        </p>
        <p>
            If {name} also pays to meet you, is because {name} is genuinely interested.
        </p>
        <p>
            Don't worry, if {name} doesn't make the payment in 24 hours, we'll
            refund you.
        </p>
        <p />
        <PrimaryButton type="submit">Pay</PrimaryButton>
    </form>
    <LinkButton href="/pals">Keep Searching</LinkButton>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    }
    form {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
        text-align: start;
        max-width: 17em;
        align-self: center;
    }
    p {
        margin: 0;
        padding: 0;
        font-size: small;
    }
</style>
