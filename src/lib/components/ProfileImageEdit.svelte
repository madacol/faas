<script>
    import CameraIcon from "./CameraIcon.svelte"
    import ProfileImage from "./ProfileImage.svelte"

    /** @type {string} */
    export let src
</script>

<label class="profile-picture">
    <ProfileImage {src} />
    <CameraIcon />
    <input type="file" hidden accept="image/*" on:change />
    <input type="hidden" name="image_data_url" value={src} />
</label>

<style>
    .profile-picture {
        position: relative;
        margin: auto;
        cursor: pointer;
    }
    .profile-picture:hover {
        opacity: 0.8;
    }
        
    .profile-picture :global(div) {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        background-color: #06517E;
        border: 0.2rem solid var(--light-mode-white-01, #FFF);
        box-shadow: 0 0.3rem 0.9rem 0 rgba(6, 81, 126, 0.18);
        cursor: pointer;
    }

    .profile-picture:hover > :global(div) {
        background-color: #044168;
    }
</style>