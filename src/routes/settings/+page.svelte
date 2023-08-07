<script>

    import Input from '$lib/components/Input.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import { PASSWORD_MINLENGTH } from '$lib/config.js'

    export let form

    let password = ''
    let password_repeat = ''
    /** @type {string | null} */
    let error = null

    function validate() {
        if (password !== password_repeat) {
            form = {error: 'Passwords do not match'}
            return false
        }
        error = null
        return true
    }

    $: if (form?.error) {
        error = form.error
    }
</script>

<main>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    {#if form?.message}
        <p class="success">{form.message}</p>
    {/if}

    <h2>Change password</h2>

    <form method="post" action="?/password_change">
        <Input
            bind:value={password}
            name="password"
            type="password"
            required
            placeholder="Password"
            autocomplete="new-password"
            minlength={PASSWORD_MINLENGTH}
        />
        <Input
            bind:value={password_repeat}
            type="password"
            placeholder="Confirm password"
            autocomplete="new-password"
            minlength={PASSWORD_MINLENGTH}
        />

        <div style="padding-top: 20px;">
            <PrimaryButton
                type="submit"
                on:click={(e) => (validate() || e.preventDefault())}
                >Change password</PrimaryButton
            >
        </div>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 20rem;
        padding: 1rem;
    }
    .error {
        color: red;
    }
    .success {
        color: green;
    }
</style>
