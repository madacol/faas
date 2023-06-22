<script>
    import { enhance } from "$app/forms";

	export let form;
</script>

<main>
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

    <h1>Login</h1>

    <form method="post" use:enhance>
        <label>
            Username:
            <input name="username" type="text" required/>
        </label>

        <label>
            Password:
            <input name="password" type="password" required/>
        </label>

        <button type="submit">Login</button>
    </form>
    <a href="/signup">Sign Up</a>
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

