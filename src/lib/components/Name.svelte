<script>
    import Verified from "./Verified.svelte"

    /** @type {string} */
     export let name;
    export let is_verified = false;
</script>

<div class="name" >
    <h1 title={name}>
        {name}
    </h1>
    {#if is_verified}
        <Verified />
    {/if}
</div>

<style>
    .name {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
    h1 {
        margin: 0;
    }
</style>