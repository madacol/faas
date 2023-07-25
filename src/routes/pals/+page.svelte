<script>
    export let data
</script>

<main>
    {#each data.pals as pal}
        <article class="user">
            <!-- <p class="score">score 7.8/10</p> -->
            <p class="name">{pal.name} {pal.lastname}</p>
            <p class="age">Age {pal.birthday}</p>
            <p class="gender">{pal.gender}</p>
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={pal.image_data_url || '/no_profile.png'} alt="Profile Picture" />
            <div class="bio">
                <p>{pal.bio}</p>
            </div>
            <a href={`/pal_profile/${pal.user_id}`} class="profile">View profile!</a>
            <form class="meet" method="post">
                <input type="hidden" name="pal_id" value={pal.user_id} />
                <button>Meet!</button>
            </form>
        </article>
    {/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 1.5em;
        padding: 2em;
        text-align: center;
        max-width: 700px;
        margin: auto;
    }
    .user {
        font-size: 0.7em;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        border-radius: 3em;
        box-sizing: border-box;
    }
    .user img {
        border-radius: 50%;
        margin: auto;
        width: 8em;
        aspect-ratio: 1/1;
    }
    .bio {
        grid-column: 2 / 4;
        min-height: 8em;
    }
    .bio p {
        padding: 0.7em;
    }

    button, a {
        width: 100%;
        background-color: #3d74a6;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        padding: 0.5em;
        cursor: pointer;
        border-radius: 1em;
        font-family: inherit;
        font-weight: bolder;
    }

    p {
        background-color: white;
        white-space: pre-wrap;
        border-radius: 1em;
        padding: 0.3em;
        box-sizing: border-box;
        margin: 0;
    }
    .meet {
        grid-row: 3;
        grid-column: 3;
    }
    .bio p {
        width: 100%;
        height: 100%;
        max-height: 0;
        min-height: 100%;
        overflow: auto;
    }
</style>
