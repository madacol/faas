<script>
    /** @type {string} */
    export let placeholder

    /** @type {string} */
    export let name

    /** @type {string} */
    export let type = 'text'
    
    /** @type {boolean} */
    export let required = false
    
    /** @type {string} */
    export let value = ""

</script>

<input {name} {type} {placeholder} {required} {value}/>

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
