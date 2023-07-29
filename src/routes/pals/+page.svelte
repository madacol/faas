<script>
    import Bio from '$lib/components/Bio.svelte'
    import Features from '$lib/components/Features.svelte'
    import FeaturesItem from '$lib/components/FeaturesItem.svelte'
    import Name from '$lib/components/Name.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import ProfileImage from '$lib/components/ProfileImage.svelte'
    import SecondaryLinkButton from '$lib/components/SecondaryLinkButton.svelte'

    export let data
</script>

<main class="box">
    {#each data.pals as pal}
        <div>
            <article class="user box">
                <ProfileImage src={pal.image_data_url} />
                <Name name={`${pal.name} ${pal.lastname}`} is_verified={pal.is_verified} />
                <Features>
                    <FeaturesItem
                        value={pal.age}
                        sub="yr"
                        label="Age"
                    />
                    <FeaturesItem
                        value={pal.gender}
                        label=Gender
                    />
                </Features>
                <Bio bio={pal.bio} />
                <div class="actions">
                    <SecondaryLinkButton href={`/pal_profile/${pal.user_id}`} class="profile">View profile!</SecondaryLinkButton>
                    <form class="meet" method="post">
                        <input type="hidden" name="pal_id" value={pal.user_id} />
                        <PrimaryButton type="submit">Meet!</PrimaryButton>
                    </form>
                </div>
            </article>
        </div>
    {/each}
</main>

<style>
    main {
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
        text-align: center;
        max-width: 700px;
    }
    .user {
        display: flex;
        flex-direction: column;
        border-radius: 3em;
        padding: 0 1rem 1rem 1rem;
        gap: 1rem;
        margin-top: 3rem;
    }
    .actions {
        display: flex;
        min-width: 60%;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        gap: 1em;
        margin: 0.5em 0;
        margin: auto;
    }
    .actions > :global(*) {
        flex: 1;
    }
    .meet > :global(button) {
        height: 100%;
    }
</style>
