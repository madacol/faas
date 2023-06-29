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
        width: 308px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 100px;
        border: 0;
        background: #fcfcfc;

        color: rgba(0, 0, 0, 0.79);
        text-align: center;
        font-size: 14px;
        line-height: 171.5%;
    }
</style>
