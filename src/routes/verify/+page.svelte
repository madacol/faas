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

    let verificationSubmitted = false;
</script>

<main class="box">

    {#if !verificationSubmitted}
        <img src="/verify.png" alt="An animated person verifying"/>
        <div><h2>We need to verify your identity</h2></div>
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
                    verificationSubmitted = true;
                }
            }}
        >
            Verify
        </PrimaryButton>
    {:else}
        <h1>Verification submitted!</h1>
        <p>Thank you for submitting your verification. We will send you an email once your verification is complete.</p>

        <p>In the meantime, we invite you to go to your <a href="/profile">Profile Page</a> and add some details and a friendly photo to your profile. This simple gesture can help us understand each other better and spark wonderful conversations.</p>

        <PrimaryButton on:click={() => goto('/pals')}>
            Find your first pal!
        </PrimaryButton>
    {/if}

</main>

<style>
    main {
        box-sizing: border-box;
        padding: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2em;
        max-width: 30rem;
        margin: 2rem auto;
    }
    img {
        display: block;
        aspect-ratio: 1/1;
        width: 100%;
        max-width: 20rem;
    }
</style>
