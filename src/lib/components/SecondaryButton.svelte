<script>
    import Button from "./Button.svelte"

    /** @type {"button" | "submit" | "reset" | null | undefined } */
    export let type = 'button'
    /** @type {boolean} */
    export let disabled = false
</script>

<Button
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
    --background-color="var(--secondary-color)"
    --background-hover-color="var(--secondary-hover-color)"
    --color="#05517E"
>
    <slot />
</Button>
