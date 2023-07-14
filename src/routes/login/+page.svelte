<script>
    import { enhance } from '$app/forms'
    import Input from '$lib/components/Input.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'

    export let form
</script>

<main>
    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <img src="/logo.png" alt="logo" style="padding-top: 40px;"/>
    <h2>Welcome back!</h2>
    <img src="/login_image_decor.png" alt="image_decor" />
    <form method="post">
        <Input
            name="email"
            type="email"
            required
            placeholder="Enter your username"
            autocomplete="username"
        />

        <Input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            autocomplete="current-password"
        />
        <div style="padding-top: 20px;">
            <PrimaryButton type="submit">Log in</PrimaryButton>
        </div>
    </form>
    <h5 style="margin: 0; padding: 0">Don’t have an account? <a href="/signup">Sign Up</a></h5>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: auto;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 20rem;
        padding: 1rem;
    }
</style>
