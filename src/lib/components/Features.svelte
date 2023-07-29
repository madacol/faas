
<div class="features">
    <slot/>
</div>

<style>
    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6rem, 9rem));
        align-items: stretch;
        margin: 0.5em 0;
        justify-content: center;
        width: 100%;
    }
</style>