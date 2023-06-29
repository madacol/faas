<script>
// @ts-nocheck

    import Input from '$lib/components/Input.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import { PASSWORD_MINLENGTH } from '$lib/config.js'

    export let form

    let password = ''
    let password_repeat = ''
    let email = ''
    let email_repeat = ''
    /** @type {string | null} */
    let error = null

    function validate() {
        if (password !== password_repeat) {
            error = 'Passwords do not match'
            return false
        }
        error = null
        return true
    }

    $: if (email_repeat !== '' && email !== email_repeat) {
        error = 'Emails do not match'
    } else if (password !== password_repeat) {
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
        <Input name="name" type="text" required placeholder="First Name" />
        <Input
            name="lastname"
            type="text"
            required
            placeholder="Last Name"
        />
        <Input
            name="email"
            type="email"
            bind:value={email}
            required
            placeholder="Email"
        />
        <Input
            type="email"
            bind:value={email_repeat}
            placeholder="Confirm email"
        />

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
        <Input
            name="birthday"
            type="text"
            required
            on:focus={e=>e.currentTarget.type='date'}
            placeholder="Birthday"
        />
        <select name="gender">
            <option disabled selected hidden>Gender</option>
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
    <h5 style="margin: 0; padding: 0; padding-bottom: 10px">
        Already have an account? <a href="/login">Sign in</a>
    </h5>
    <h6 style="margin: 0; padding: 0; padding-bottom: 20px">
        By clicking sign up, you agree to our <a href="/">Terms</a>,
        <a href="/">Privacy</a>
        and <a href="/">Cookies policy</a>. You might received SMS notifications
        from us and can opt out any time.
    </h6>
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
    select {
        width: 308px;
        height: 50px;
        flex-shrink: 0;
        border-radius: 100px;
        border: 0;
        background: #fcfcfc;

        color: rgba(0, 0, 0, 0.79);
        text-align: center;
        font-size: 14px;
        line-height: 171.5%;
    }
</style>
