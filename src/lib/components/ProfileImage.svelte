<script>
    /** @type {string} */
    export let src;
</script>

<img src={src || '/no_profile.png'} alt="profile" on:load />

<style>

    img {
        border-radius: 50%;
        width: 6rem;
        box-shadow: 0 0 0.5rem 0 #aaaaaa;
        aspect-ratio: 1/1;
        border: 0.3rem solid #fff;
    }
</style>