<script>
    import SecondaryLinkButton from '$lib/components/SecondaryLinkButton.svelte'
    import Location from '$lib/components/Location.svelte'
    import Name from '$lib/components/Name.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import ProfileImageEdit from '$lib/components/ProfileImageEdit.svelte'
    import TextArea from '$lib/components/TextArea.svelte'
    import Input from '$lib/components/Input.svelte'
    import Select from '$lib/components/Select.svelte'

    export let data
    let {
        name,
        lastname,
        email,
        gender,
        birthday,
        bio,
        image_data_url,
        is_verified
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

<main class="box">

    <form method="post">

        <ProfileImageEdit on:change={handleFileSelect} src={image_data_url} />
        <Name name={`${name} ${lastname}`} is_verified={is_verified} />
        <Location />
        <Input
            value={birthday}
            label="Birthday"
            type="date"
            name="birthday"
        />

        <Select
            options={[
                {value: "male", label: "Male"},
                {value: "female", label: "Female"},
                {value: "non-binary", label: "Non-binary"},
                {value: "other", label: "Other"},
            ]}
            bind:selected={gender}
            name="gender"
        />

        <TextArea name="bio" placeholder="User Bio" value={bio} />

        <div class="actions">
            <SecondaryLinkButton href="/">Keep Searching</SecondaryLinkButton>
            <PrimaryButton type="submit">Update</PrimaryButton>
        </div>
    </form>
</main>


<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 40rem;
        margin: auto;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 1em;
        align-self: stretch;
    }
    .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-width: 70%;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        gap: 1em;
        margin-top: 1rem;
    }
</style>
