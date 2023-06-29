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
        image_data_url,
        pal_requests_count
    } = data.user

    /**
     * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event
     */
    function handleFileSelect(event) {
        if (!event?.currentTarget?.files?.length) return;

        const file = event.currentTarget.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          // @ts-ignore
          const base64String = event.target.result;
          // Do something with the base64String, like displaying it or sending it to the server
          if (typeof base64String !== 'string') {
            console.error('Result is not a string', base64String);
            return;
          }
          image_data_url = base64String;
        };

        reader.readAsDataURL(file);
    }
</script>

<main style="display: flex; flex-direction: column">

    <form method="post">
        <label style="align-self:center;">
            <img
                src={image_data_url ?? '/no_profile.png'}
                alt="Profile"
                height="100px"
            >
            <input type="file" hidden accept="image/*" on:change={handleFileSelect} />
            <input type="hidden" name="image_data_url" value={image_data_url} />
        </label>
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

        <TextArea name="bio" placeholder="User Bio" value={bio} />

        <PrimaryButton type="submit">Update</PrimaryButton>
    </form>

    <LinkButton>View invitations to meet</LinkButton>
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