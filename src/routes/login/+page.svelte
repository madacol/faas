<script>
    import { enhance } from '$app/forms'
    import Input from '$lib/components/Input.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'

    export let form
</script>

<main class="box">
    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}
    <img src="/login_image_decor.png" alt="image_decor" />
    <form method="post">
        <Input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            autocomplete="email"
        />

        <Input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            autocomplete="current-password"
        />

        <PrimaryButton type="submit">Log in</PrimaryButton>
    </form>
    <h5 style="margin: 0; padding: 0">Don’t have an account? <a href="/signup">Sign Up</a></h5>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: stretch;
        margin: 2rem auto;
        gap: 2rem;
        max-width: 25rem;
    }
    img {
        align-self: center;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
        padding: 0 2rem;
    }
</style>
