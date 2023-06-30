<script>
    import LinkButton from '$lib/components/LinkButton.svelte'
    import OvalLinkButton from '$lib/components/OvalLinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import TextArea from '$lib/components/TextArea.svelte'

    export let data
    let {
        user_id,
        name,
        lastname,
        email,
        gender,
        birthday,
        bio,
        pal_requests_count,
    } = data.user
</script>

<main>
    <img
        src="/logo.png"
        alt="logo"
        style="padding-top: 10px; width:90px; align-self:center"
    />

    <div>
        <h2>It's a match</h2>
        <p />

        <p>
            You and {name} have shown interest! you can now chat and maybe propose
            an in-person meeting
        </p>

        <OvalLinkButton href="/pal_profile/{user_id}"
            >View {name}'s profile</OvalLinkButton
        >
        
        <OvalLinkButton href="/chat/{user_id}" disabled
            >Send a message <i class="fa fa-comment" aria-hidden="true" />
        </OvalLinkButton>

        <LinkButton href="/pals"
            >Keep Searching <i
                class="fa fa-plus-circle"
                aria-hidden="true"
            /></LinkButton
        >
    </div>
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
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        text-align: start;
        max-width: 17em;
        align-self: center;
    }
</style>
