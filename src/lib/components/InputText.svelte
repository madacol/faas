<script>
    /** @type {string} */
    export let placeholder

    /** @type {string} */
    export let name

    /** @type {} */
    export let type = 'text'
</script>

<input {name} {type} {placeholder} />

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
