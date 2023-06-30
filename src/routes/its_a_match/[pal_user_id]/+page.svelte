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
        image_data_url,
        pal_requests_count,
    } = data.user
</script>

<main>
    <div>
        <h2>It's a match</h2>
        <div style="display: flex; flex-direction:row">
            <img src={data.user_image_url} alt="profile_picture" />
            <img src={image_data_url} alt="profile_picture" />
        </div>
        <p />

        <p>
            You and {name} have shown interest! Now you can see {name} contact information
            on they profile, chat and maybe propose an in-person meeting.
        </p>

        <OvalLinkButton href="/pal_profile/{user_id}"
            >View {name}'s profile</OvalLinkButton
        >

        <!-- <OvalLinkButton href="/chat/{user_id}" disabled
            >Send a message <i class="fa fa-comment" aria-hidden="true" />
        </OvalLinkButton> -->

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

    p {
        margin: 0;
        padding: 0;
        font-size: small;
        text-align: center;
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
