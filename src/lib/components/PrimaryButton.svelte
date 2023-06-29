<script>
    /** @type {"button" | "submit" | "reset" | null | undefined} */
    export let type = 'button'
</script>

<button {type}>
    <slot />
</button>

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
