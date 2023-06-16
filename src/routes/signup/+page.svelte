<script>
    import { enhance } from "$app/forms";

    export let form;

    let password = "";
    let password_repeat = "";
    /**
     * @type {string | null}
     */
    let error = null;

    function validate() {
        if (password !== password_repeat) {
            error = "Passwords do not match";
            return false;
        }
        error = null;
        return true;
    }

    $: if (password !== password_repeat) {
        error = "Passwords do not match";
    } else {
        error = null;
    }

    $: if (form?.error) {
        error = form.error;
    }
</script>

<main>
    {#if error}
        <p class="error">{error}</p>
    {/if}

    <h1>Login</h1>

    <form method="post" use:enhance>
        <label>
            Username:
            <input name="username" type="text" required/>
        </label>

        <label>
            Password:
            <input bind:value={password} name="password" type="password" required/>
        </label>

        <label>
            Repeat password:
            <input bind:value={password_repeat} name="password_repeat" type="password" required/>
        </label>

        <label>
            Name:
            <input name="name" type="text" required/>
        </label>

        <label>
            Lastname:
            <input name="lastname" type="text" required/>
        </label>



        <button type="submit" on:submit={e => validate() || e.preventDefault()} >Login</button>
    </form>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
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

