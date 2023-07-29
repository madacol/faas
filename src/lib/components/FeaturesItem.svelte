<script>

    /** @type {string} */
     export let value;
    /** @type {string} */
    export let label;
    /** @type {string} */
    export let sub = '';
</script>

<div class="age">
    <h3>{value}<sub>{sub}</sub></h3>
    <sub>{label}</sub>
</div>

<style>
    .age {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }
    h3 {
        margin: 0;
    }
    sub {
        font-size: small;
    }

    div:not(:first-child) {
        border-left: 1px solid black;
    }
</style>