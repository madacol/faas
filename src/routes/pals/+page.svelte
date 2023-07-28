<script>
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import SecondaryLinkButton from '$lib/components/SecondaryLinkButton.svelte'

    export let data
</script>

<main class="box">
    {#each data.pals as pal}
        <div>
            <article class="user box">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <div class="image">
                    <img src={pal.image_data_url || '/no_profile.png'} alt="profile" />
                </div>
                <!-- <p class="score">score 7.8/10</p> -->
                <div class="name" >
                    <h1 class:verified={pal.is_verified} title={pal.is_verified ? 'Verified' : ''}>{pal.name} {pal.lastname}</h1>
                </div>
                <div class="features">
                    <div class="age">
                        <h3>{pal.birthday}<sub>yr</sub></h3>
                        <sub>Age</sub>
                    </div>
                    <span/>
                    <div class="gender">
                        <h3>{pal.gender}</h3>
                        <sub>Gender</sub>
                    </div>
                </div>
                <div class="bio">
                    <p>{pal.bio}</p>
                </div>
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
        padding: 1rem;
        text-align: center;
        max-width: 700px;
    }
    .user {
        display: flex;
        flex-direction: column;
        border-radius: 3em;
        padding: 0 1rem 1rem 1rem;
        gap: 1rem;
        position: relative;
        margin-top: 5rem;
    }
    .image {
        position: relative;
        border-radius: 50%;
        margin: auto;
    }
    .user img {
        position: relative;
        border-radius: 50%;
        width: 8em;
        margin: -50% auto auto auto;
        box-shadow: 0 0 0.5rem 0 #aaaaaa;
        aspect-ratio: 1/1;
    }
    .name {
        position: relative;
    }
    .name h1 {
        margin: 0;
    }
    .user .verified::after {
        content: ' ✅';
        display: inline;
        right: 0;
        color: #3d74a6;
    }
    .features {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        gap: 1em;
        margin: 0.5em 0;
    }
    .features > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        padding: 0 3rem;
    }
    .features > div > h3 {
        margin: 0;
    }
    .features > div > h3 > sub {
        font-size: medium;
    }

    .features > span {
        width: 1px;
        background-color: black;
    }
    .bio p {
        padding: 2rem;
        font-size: medium;
    }
    p {
        text-align: start;
        background-color: white;
        white-space: pre-wrap;
        border-radius: 1em;
        padding: 1rem;
        box-sizing: border-box;
        margin: 0;
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
</style>
