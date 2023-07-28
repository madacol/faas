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
        text-decoration: none;
        background-color: #EBF7FF;
        width: 100%;
        padding: 1.2rem;
        border: 0;
        cursor: pointer;
        color: #05517E;
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 2rem;
    }
    button:hover {
        background-color: #EBF7FF;
        opacity: 0.8;
    }
</style>