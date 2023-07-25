<script>
    export let data
    let { user_id, name, lastname, email, gender, birthday, bio, image_data_url } =
        data.user
</script>

<main style="display: flex; flex-direction: column">
    <img src={image_data_url || "/no_profile.png"} alt="profile_picture" />


    <form method="post">
        <h2 style="margin: 0; padding:0;">{name + ' ' + lastname}</h2>

        <p><i class="fa fa-map-marker" aria-hidden="true" /> Windsor, Canada</p>
        <p><i class="fa fa-user-o" aria-hidden="true" /> Gender: {gender}</p>
     

        <p class="bio">{bio}</p>
    </form>
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
    .bio {
        font-size: small;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: #ffffff;
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
