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

<main>

    <form method="post">
        <label class="profile-picture">
            <img
                src={image_data_url ?? '/no_profile.png'}
                alt="Profile"
            >
            <input type="file" hidden accept="image/*" on:change={handleFileSelect} />
            <input type="hidden" name="image_data_url" value={image_data_url} />
        </label>
        <span>{name + " " + lastname}</span>

        <p><i class="fa fa-map-marker" aria-hidden="true" /> Windsor, Canada</p>
        <p><i class="fa fa-user-o" aria-hidden="true" /> Gender: {gender}</p>
        <p>
            <i class="fa fa-calendar-o" aria-hidden="true" /> Birthday on {birthday}
        </p>
        <p>
            <i class="fa fa-comments-o" aria-hidden="true" /> Invitations to
            meet:
            {pal_requests_count}
        </p>

        <TextArea name="bio" placeholder="User Bio" value={bio} />

        <PrimaryButton type="submit">Update</PrimaryButton>
        <LinkButton href="/">View invitations to meet</LinkButton>
    </form>
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    span {
        font-size: 1.5rem;
        text-align: center;
    }
    form {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: stretch;
        gap: 1em;
        padding: 2em;
        text-align: start;
        max-width: 50em;
        align-self: center;
    }
    img {
        display: block;
        width: 8em;
        aspect-ratio: 1/1;
    }
    p {
        margin: 0;
        padding: 0;
        font-size: small;
    }
    .profile-picture {
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
        align-self:center;
    }
</style>
