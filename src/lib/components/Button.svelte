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
        background-color: var(--background-color);
        width: 100%;
        padding: 1.2rem;
        border: 0;
        cursor: pointer;
        color: var(--color);
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 2rem;
        box-shadow: 0 0.3rem 0.9rem 0 rgba(6, 81, 126, 0.18);
    }
    button:not(:disabled):hover {
        background-color: var(--background-hover-color);
    }
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
