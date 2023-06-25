<script>
    export let data;
    let bio = data.user.bio;
</script>

<main>
    <form method="post">
        <h2>Public Bio</h2>
        <textarea name="bio" required value={bio}/>

        <button type="submit">Submit</button>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        margin: 2em;
    }
    form {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
        text-align: start;
        max-width: 50em;
    }
    textarea {
        font-size: 0.8em;
        height: 5em;
    }
    button {
        background-color: #4CAF50;
        color: white;
    }
</style>

