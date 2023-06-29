<script>
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import TextArea from '$lib/components/TextArea.svelte'

    export let data
    let bio = data.user.bio
</script>

<main style="display: flex; flex-direction: column">
    <img
        src="/logo.png"
        alt="logo"
        style="padding-top: 10px; width:110px; align-self:center"
    />

    <form method="post">
        <h2 style="margin: 0; padding:0;">Mary O’Brien</h2>

        <p><i class="fa fa-map-marker" aria-hidden="true"/> Windsor, Canada</p>
        <p><i class="fa fa-user-o" aria-hidden="true"></i> Gender: Female</p>
        <p><i class="fa fa-calendar-o" aria-hidden="true"></i> Birthday on May 6th 1977</p>
        <p><i class="fa fa-clock-o" aria-hidden="true"></i> Attendance score: 10/10</p>
        <p><i class="fa fa-comments-o" aria-hidden="true"></i> Invitations to meet: 1</p>

        <TextArea name="bio" placeholder="User Bio" required value={bio} />

        <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
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
        align-self: center;
    }
    p {
        margin: 0;
        padding: 0;
    }
</style>
