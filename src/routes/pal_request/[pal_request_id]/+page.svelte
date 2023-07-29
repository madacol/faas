<script>
    import Features from '$lib/components/Features.svelte'
    import FeaturesItem from '$lib/components/FeaturesItem.svelte'
    import SecondaryLinkButton from '$lib/components/SecondaryLinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import ProfileImageName from '$lib/components/ProfileImageName.svelte'

    export let data
    let { name, lastname, email, gender, age, bio, image_data_url, is_verified } =
        data.user
</script>

<main class="box">

    <ProfileImageName
        src={image_data_url}
        name={`${name} ${lastname}`}
        {is_verified}
    />

    <Features>
        <FeaturesItem value={age} label="Age" sub="yr" />
        <FeaturesItem value={gender} label="Gender" />
    </Features>

    <div class="instructions">
        <p>To proceed with meeting <strong>{name}</strong>, a payment of 5.99 CAD is required.</p>
        <p>If <strong>{name}</strong> also pays to meet you, is because <strong>{name}</strong> is genuinely interested.</p>
        <p>Don't worry, if <strong>{name}</strong> doesn't make the payment in 7 days, we'll refund you.</p>
    </div>
    <form method="post">
        <div class="actions">
            <SecondaryLinkButton href="/pals">Keep Searching</SecondaryLinkButton>
            <PrimaryButton type="submit">Pay</PrimaryButton>
        </div>
    </form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        max-width: 30rem;
        gap: 1rem;
    }
    .instructions {
        margin: 0 2rem;
    }
    p {
        font-size: small;
        text-align: start;
    }
    .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: stretch;
        gap: 1em;
    }

    .actions > :global(*) {
        flex: 1;
    }
</style>
