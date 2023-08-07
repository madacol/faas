<script>
    /**
     * @type {string}
     */
    export let name;
    export let selected = "";
    export let placeholder = 'Select an option';

    /**
     * @type {{value: string, label: string}[]}
     */
    export let options;
</script>

<select
    bind:value={selected}
    name={name}
    {...$$restProps}
>
    <option value="" disabled hidden>{placeholder}</option>
    {#each options as option}
        <option value={option.value}>{option.label}</option>
    {/each}
</select>
<input type="hidden" {name} value={selected}>

<style>
    select {
        flex-shrink: 0;
        border-radius: 100px;
        border: 1px solid #e5e5e5;
        background: #fcfcfc;
        height: 3.5rem;

        color: rgba(0, 0, 0, 0.79);
        text-align: center;
        font-size: 14px;
        line-height: 171.5%;
    }
</style>