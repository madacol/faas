<script>

    /** @type {"button" | "submit" | "reset" | null | undefined } */
    export let type = 'button'
      /** @type {boolean} */
      export let disabled = false
</script>

<button
    {type}
    {disabled}
    {...$$restProps}
    on:blur
    on:focus
    on:mousedown
    on:mouseup
    on:mouseenter
    on:mouseleave
    on:mouseover
    on:mouseout
    on:keydown
    on:keyup
    on:keypress
    on:click
>
    <slot />
</button>

<style>
    button {
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
    button:not(:disabled):hover {
        background-color: #1d5b96;
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
