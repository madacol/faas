<script>
    /** @type {string} */
    export let src;
</script>

<div class="image">
    <img src={src || '/no_profile.png'} alt="profile" />
</div>

<style>

    .image {
        margin: auto;
    }
    img {
        border-radius: 50%;
        width: 6rem;
        margin: -50% auto auto auto;
        box-shadow: 0 0 0.5rem 0 #aaaaaa;
        aspect-ratio: 1/1;
        border: 0.3rem solid #fff;
    }
</style>