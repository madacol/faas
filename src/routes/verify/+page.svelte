<script>
    import { goto } from '$app/navigation'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import { loadStripe } from '@stripe/stripe-js';
    import { onMount } from 'svelte'

    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

    /**
     * @type {import("@stripe/stripe-js").Stripe | null}
     */
    let stripe = null;
    onMount(async () => {
        stripe = await stripePromise;
    })
</script>

<main>
    <div>
        <p>In order to continue,</p>
        <p>we need to verify your identity</p>
    </div>
    <PrimaryButton
        disabled={!stripe}
        on:click={ async function() {
            if (!stripe) return;

            // Get the VerificationSession client secret using the server-side
            const response = await fetch('/verify', {method: 'POST'})
            const client_secret = await response.json();

            // Show the verification modal.
            const { error } = await stripe.verifyIdentity(client_secret);

            if (error) {
                console.error({error});
            } else {
                setTimeout(() => {
                    goto('/')
                }, 2000)
            }
        }}
    >
        Verify
    </PrimaryButton>
</main>

<style>
    main {
        box-sizing: border-box;
        padding: 2em;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2em;
    }
</style>
