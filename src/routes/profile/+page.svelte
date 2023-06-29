<script>
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import TextArea from '$lib/components/TextArea.svelte'

    export let data
    let {
        name,
            lastname,
            email,
            gender,
            birthday,
            bio,
            pal_requests_count
        } = data.user

</script>

<main style="display: flex; flex-direction: column">
    <img
        src="/logo.png"
        alt="logo"
        style="padding-top: 10px; width:90px; align-self:center"
    />

    <form method="post">
        <h2 style="margin: 0; padding:0;">{name + " " + lastname}</h2>

        <p><i class="fa fa-map-marker" aria-hidden="true" /> Windsor, Canada</p>
        <p><i class="fa fa-user-o" aria-hidden="true" /> Gender: {gender}</p>
        <p>
            <i class="fa fa-calendar-o" aria-hidden="true" /> Birthday on {birthday}
        </p>
        <p>
            <i class="fa fa-comments-o" aria-hidden="true" /> Invitations to meet:
            {pal_requests_count}
        </p>

        <TextArea name="bio" placeholder="User Bio" required value={bio} />
        <PrimaryButton type="submit">Update</PrimaryButton>
        <LinkButton>View invitations to meet</LinkButton>
    </form>

</main>

<style>
    main {
        display: flex;
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
        max-width: 50em;
        align-self: center;
    }
    p {
        margin: 0;
        padding: 0;
        font-size: small;
    }
</style>