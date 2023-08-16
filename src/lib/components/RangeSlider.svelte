<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import noUiSlider from 'nouislider';
    import 'nouislider/dist/nouislider.css';

    export let min = 0;
    export let max = 100;

    let internalMin = min;
    let internalMax = max;

    const dispatch = createEventDispatcher();

    let slider;

    onMount(() => {
        noUiSlider.create(slider, {
            start: [min, max],
            connect: true,
            range: {
                'min': 15,
                'max': 70,
            },
            step: 1,
            tooltips: {
                // tooltips are output only, so only a "to" is needed
                to: function(numericValue) {
                    return numericValue.toFixed(0);
                }
            }
        });

        slider.noUiSlider.on('update', (values) => {
            internalMin = parseInt(values[0]);
            internalMax = parseInt(values[1]);
            dispatch('rangeUpdate', { min: internalMin, max: internalMax });
        });
    });
</script>

<div bind:this={slider} class="slider"></div>

<style>
    .slider :global(.noUi-tooltip) {
        font-size: 0.8rem;
    }
    .slider :global(.noUi-connect) {
        background-color: var(--primary-color, #3d74a6);
    }
    .slider:hover :global(.noUi-connect) {
        background-color: var(--primary-hover-color, #1d5b96);
    }
</style>