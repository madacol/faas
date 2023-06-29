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

<textarea name={name} placeholder= {placeholder} required value={value} />


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
