<script>
   /**
     * @type {string}
     */
    export let href;
</script>

<a {href} {...$$restProps}>
    <button>
        <slot />
    </button>
</a>

<style>
    button {
        background-color: #3d74a6;
        width: 308px;
        height: 50px;
        flex-shrink: 0;
        border: 0;
        cursor: pointer;

        color: #fff;
        text-align: center;
        font-size: 20px;

        font-weight: 700;
        line-height: 171.5%;
        align-self: center;
    }
    button:hover {
        background-color: #3d74a6;
        opacity: 0.8;
    }
</style>