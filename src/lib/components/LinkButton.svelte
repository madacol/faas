<script>
    import PrimaryButton from "./PrimaryButton.svelte"

   /** @type {string} */
    export let href;

    /** @type {boolean} */
    export let disabled = false
</script>

<a
    {href}
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
    <PrimaryButton {disabled}>
        <slot />
    </PrimaryButton>
</a>