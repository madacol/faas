<script>
   /**
     * @type {string}
     */
    export let href;
</script>

<a {href} {...$$restProps}>
    <button type="button">
        <slot />
    </button>
</a>

<style>
    button {
        text-decoration: none;
        background-color: #3d74a6;
        width: 100%;
        padding: 1.2rem;
        border: 0;
        cursor: pointer;
        color: #fff;
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 2rem;
        box-shadow: 0 0.3rem 0.9rem 0 rgba(6, 81, 126, 0.18);
    }
    button:hover {
        background-color: #1d5b96;
    }
</style>