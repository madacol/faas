<script>
    import { enhance } from '$app/forms'
    import InputText from '$lib/components/InputText.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'

    export let form

    let password = ''
    let password_repeat = ''
    /**
     * @type {string | null}
     */
    let error = null

    function validate() {
        if (password !== password_repeat) {
            error = 'Passwords do not match'
            return false
        }
        error = null
        return true
    }

    $: if (password !== password_repeat) {
        error = 'Passwords do not match'
    } else {
        error = null
    }

    $: if (form?.error) {
        error = form.error
    }
</script>

<main>
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <img src="/logo.png" alt="logo" style="padding-top: 40px;" />
    <div style="display: flex; align-items: center;">
        <h1 style="align-self: flex-end;">Welcome!</h1>
        <img
            src="/image_1_sign_up.png"
            alt="image_decor"
            style="padding-left: 5px;"
        />
    </div>

    <form method="post">
        <InputText name="name" type="text" required placeholder="First Name" />
        <InputText
            name="lastname"
            type="text"
            required
            placeholder="Last Name"
        />
        <InputText name="username" type="email" required placeholder="Email" />
        <InputText
            name="email_repeat"
            type="email"
            required
            placeholder="Confirm email"
        />

        <InputText
            bind:value={password}
            name="password"
            type="password"
            required
            placeholder="Password"
        />
        <InputText
            bind:value={password_repeat}
            name="password_repeat"
            type="password"
            required
            placeholder="Confirm password"
        />
        <select name="gender" id="gender" placeholder="Gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>

        <div style="padding-top: 20px;">
            <PrimaryButton
                type="submit"
                on:submit={(e) => validate() || e.preventDefault()}
                >Sign up</PrimaryButton
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
    label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
