<script>
    import { enhance } from '$app/forms'
    import InputText from '$lib/components/InputText.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'

    export let form
</script>

<main>
    <img src="/logo.png" alt="logo" style="padding-top: 10px;" />
    <h3>Find friends in Windsor</h3>
    <div style="max-width: 300px; ">
        <div style="display: flex;">
            <h5>
                Step 1 is to sign up either in person or virtually <a
                    href="/signup">here</a
                >
            </h5>
            <img src="/image_1_intro.png" alt="image_1_intro.png" />
        </div>
        <div style="display: flex;">
            <img src="/image_2_intro.png" alt="image_2_intro.png" />
            <h5>
                Step 2 : After a short Q&A with us, We make sure people are who
                they say they are
            </h5>
        </div>

        <div style="display: flex;">
            <h5>
                Step 3 Pay per meet. You only pay if you agree to meet someone
            </h5>
            <img
                style="padding-left:5px ;"
                src="/image_3_intro.png"
                alt="image_3_intro.png"
            />
        </div>
        <div style="padding-top: 15px;">
            <a href="/signup"
                ><PrimaryButton type="submit">Get Started</PrimaryButton></a
            >
        </div>
    </div>
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
    label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    input {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
    }
</style>
