<script>
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import { loadStripe } from '@stripe/stripe-js';
    import { onMount } from 'svelte'

    export let data;

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

    let verification_status = data.user.verification_status;

</script>

<main class="box">

    {#if verification_status === 'pending'}
        <h1>Verification pending</h1>

        <p>Thank you for submitting your verification. We will send you an email once your verification is complete.</p>

        <p>In the meantime, we invite you to go to your <a href="/profile">Profile Page</a> and add some details and a friendly photo to your profile. This simple gesture can help us understand each other better and spark wonderful conversations.</p>

        <LinkButton href="/profile">
            Set profile
        </LinkButton>
    {:else if verification_status === 'verified'}

        <h1>Verification complete!</h1>

        <LinkButton href="/pals">
            Find pals
        </LinkButton>
    {:else}
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
                    verification_status = 'pending';
                }
            }}
        >
            Verify
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
        align-items: stretch;
        gap: 2em;
        max-width: 30rem;
        margin: auto;
    }
    img {
        display: block;
        aspect-ratio: 1/1;
        width: 100%;
        max-width: 20rem;
    }
</style>
