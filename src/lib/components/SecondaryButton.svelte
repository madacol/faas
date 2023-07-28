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
    on:input
    on:change
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
