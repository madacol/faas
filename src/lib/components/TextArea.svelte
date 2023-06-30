<script>
    export let value = ''
</script>

<textarea
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
    
    textarea {
        font-size: 0.8em;
        height: 5em;
        border-radius: 13px;
        padding: 0.5em;
        height: 150px;
        resize: none;
        margin-bottom: 5px;
    }

    textarea:focus {
        outline: none;
    }
</style>
