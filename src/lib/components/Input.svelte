<script>
    export let value = ''
</script>

<input
    bind:value
    {...$$restProps}
    on:input
    on:change
    on:blur
    on:focus
    on:keydown
    on:keyup
    on:keypress
    on:click
/>

<style>
    input {
        height: 3.5rem;
        flex-shrink: 0;
        border-radius: 100px;
        border: 1px solid #e5e5e5;
        background: #fcfcfc;
        color: rgba(0, 0, 0, 0.79);
        text-align: center;
        font-size: 1rem;
    }
</style>
