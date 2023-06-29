<script>
    export let data
</script>

<main>
    {#each data.pals as pal}
        <article class="user">
            <!-- <p class="score">score 7.8/10</p> -->
            <p class="age">Age {pal.birthday} | {pal.gender}</p>
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={pal.image_data_url ?? '/no_profile.png'} alt="Profile Picture" />
            <div class="bio">
                <p>{pal.bio}</p>
            </div>
            <div class="actions">
                <a href="/pay_per_meet/{pal.user_id}">
                    <button>Meet!</button>
                </a>
            </div>
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
        grid-row: 1 / 3;
        width: 8em;
        aspect-ratio: 1/1;
    }
    .age,
    .bio {
        grid-column: 2 / 4;
    }
    .bio {
        min-height: 8em;
    }

    button {
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
    }

    p {
        background-color: white;
        white-space: pre-wrap;
        border-radius: 1em;
        padding: 0.3em;
        box-sizing: border-box;
        margin: 0;
    }
    .actions {
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
