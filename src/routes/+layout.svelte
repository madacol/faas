<script>
	export let data;
    let menu_open = false;
</script>



<header>
  <div class="logo_links">
    <div class="logo">
      <a href="/">
        <img src="/logo.png" alt="logo" height="80px" width="80px"/>
      </a>
    </div>
    <div class="links">
      <a href="/pending_users">Pending Users</a>
      <a href="/link 2">link 2</a>
      <a href="/link 3">link 3</a>
    </div>
  </div>
  <nav>
    {#if data.user}
        <button
            id="profile-menu-button"
            on:click={e => menu_open = !menu_open}
            on:keypress|self={e => e.key === 'Enter' && (menu_open = !menu_open)}
        >{data.user.name}</button>

        <div
            id="profile-menu"
            class:open={menu_open}
        >
            <div class="profile-menu-item">Profile</div>
            <div class="profile-menu-item">Settings</div>
            <div class="profile-menu-item">
                <form method="post" action="/logout" >
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
    {:else}
        <a id="login-button" href="/login">Login</a>
    {/if}
  </nav>
</header>


<main>
  <slot />
</main>

<style>
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    header {
      background: #f9f9f9;
      margin: 0 1em 0 0;
      display: flex;
      gap: 2em;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
    }

    .logo_links {
      display: flex;
      gap: 2em;
      align-items: center;
    }

    .links {
      display: flex;
      gap: 1em;
    }

    nav {
      position: relative;
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
    }

    #profile-menu {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        flex-direction: column;
        gap: 10px;
        align-items: center;

    }

    #profile-menu-button {
        background: #333;
        color: #fff;
        border: none;
        cursor: pointer;
        padding: 10px 20px;
    }

    #profile-menu.open {
      display: flex;
    }

    .profile-menu-item {
      margin-right: 10px;
    }

    #login-button {
      padding: 10px 20px;
      background: #333;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    main {
      padding: 50px;
      overflow: auto;
    }
</style>