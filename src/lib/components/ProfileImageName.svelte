<script>
    import Location from "./Location.svelte"
    import Name from "./Name.svelte"
    import ProfileImage from "./ProfileImage.svelte"

    /**
     * @type {string}
     */
     export let src;
    /**
     * @type {string}
     */
     export let name;
    /**
     * @type {boolean}
     */
     export let is_verified;
</script>

<div class="header">
    <ProfileImage {src} />
    <div class="name">
        <Name {name} {is_verified} />
        <Location />
    </div>
</div>

<style>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .name {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 0.5em;
    }
</style>