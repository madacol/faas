<script>
    import Logo from './Logo.svelte';
    import LinkButton from '$lib/components/LinkButton.svelte'
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
</script>

<main class="box">
    <Logo/>
    <h3>Find friends in Windsor</h3>
    {#if browser}
        <Carousel>
            <article>
                <img
                    src="/sing_up.step_1.png"
                    alt="sign up drawing"
                />
                <span>
                    <strong>Step 1:</strong> Sign up <a href="/signup">here</a>
                </span>
            </article>
            <article>
                <img
                    src="/sing_up.step_2.png"
                    alt="ID validation drawing"
                />
                <span>
                    <strong>Step 2:</strong> ID Validation. We make sure people are who
                    they say they are!
                </span>
            </article>

            <article>
                <img
                    src="/sing_up.step_3.png"
                    alt="Pay per meet drawing"
                />
                <span>
                    <strong>Step 3:</strong> Meet. You only pay if you agree to meet someone
                </span>
            </article>
        </Carousel>
    {/if}
    <LinkButton href="/signup">Get Started</LinkButton>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: stretch;
        margin: auto;
        max-width: 26rem;
        gap: 1em;
    }
    h3 {
        margin: 0;
    }
    img {
        width: 100%;
    }
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }
</style>
