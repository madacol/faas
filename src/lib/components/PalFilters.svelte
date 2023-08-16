<script>
    import { createEventDispatcher } from 'svelte';
    import RangeSlider from './RangeSlider.svelte';
    import Select from './Select.svelte'

    /**
     * @type {{age: string, gender: string}[]}
     */
     export let pals;

    let minAge = 0;
    let maxAge = 100;
    let gender = "";
    const dispatch = createEventDispatcher();

    function handleRangeUpdate(event) {
        minAge = event.detail.min;
        maxAge = event.detail.max;

        applyFilters();
    }

    function applyFilters() {
        let filteredItems = pals.filter(item => {
            const age = parseInt(item.age, 10);
            return (
                age >= minAge &&
                age <= maxAge &&
                (gender ? item.gender === gender : true)
            );
        });
        dispatch('update', { items: filteredItems });
    }
</script>

<div class="filters">
    <div class="age">
        Age
        <RangeSlider bind:min={minAge} bind:max={maxAge} on:rangeUpdate={handleRangeUpdate} />
    </div>

    <Select
        options={[
            {value: "", label: "Any Gender"},
            {value: "male", label: "Male"},
            {value: "female", label: "Female"},
            {value: "non-binary", label: "Non-binary"},
            {value: "other", label: "Other"},
        ]}
        bind:selected={gender}
        name="gender"
        on:change={applyFilters}
    />
</div>

<style>
    .age {
        text-align: center;
    }
.filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin: 1rem;
}
</style>