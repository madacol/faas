<script>
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'

    export let data
    let { name, lastname, email, gender, birthday, bio, image_data_url } =
        data.user
</script>

<main>
    <img
        src={image_data_url || "/no_profile.png"}
        alt="logo"
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
            To proceed with meeting {name}, a payment of 5.99 CAD is required.
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

    img {
        display: block;
        width: 8em;
        aspect-ratio: 1/1;
        padding-top: 10px;
        align-self: center;
        border-radius: 50%;
        overflow: hidden;
    }
</style>
