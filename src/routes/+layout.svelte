<script>
  import { page } from '$app/stores';
  export let data;

  let menu_open = false;
</script>

<header>
  <div class="logo_links">
    <div class="logo">
      <a href="/" aria-label="logo" />
    </div>
    <div class="links">
      <a href="/pending_users">Pending Users</a>
      <a href="/pals">Show Pals</a>
      <a href="/personality_test">form</a>
    </div>
  </div>
  <nav>
    {#if data.user}
        <button
            id="profile-menu-button"
            on:click={e => {
                e.stopPropagation()
                menu_open = !menu_open
            }}
            on:keypress|self={e => e.key === 'Enter' && (menu_open = !menu_open)}
        >{data.user.name}</button>

        <div
            id="profile-menu"
            class:open={menu_open}
        >
            <div class="profile-menu-item">
              <a href="/profile">Profile</a>
            </div>
            <div class="profile-menu-item">
              <a href="/settings">Settings</a>
            </div>
            <hr>
            <div class="profile-menu-item">
              <a class="logout" href="/logout?redirectTo={$page.url.pathname}">Logout</a>
            </div>
        </div>
    {:else}
        <a id="login-button" href="/login">Login</a>
    {/if}
  </nav>
</header>


<div id="content"
    on:click={()=>menu_open = false}
    on:keypress|self={e => e.key === 'Enter' && (menu_open = false)}
>
    <slot />
</div>

<style>
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
      min-height: 400px;
      align-items: stretch;
    }

    header {
      background: #95b1ca;
      padding: 0 1em 0 0;
      display: flex;
      gap: 2em;
      justify-content: space-between;
      align-items: center;
    }

    .logo_links {
      display: flex;
      align-items: stretch;
      overflow: auto;
    }

    .links {
      display: flex;
      gap: 1em;
      overflow: auto;
      align-items: center;
      padding-left: 1em;
    }

    nav {
      position: relative;
    }

    .logo > a {
      background-image: url(/logo.png);
      background-size: contain;
      height: 4em;
      width: 4em;
      display: block;
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
      align-items: start;
    }

    #profile-menu-button {
      background: #333;
      color: #fff;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      border-radius: 0.7em;
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
      border-radius: 0.7em;
    }

    #content {
      overflow: auto;
      flex-grow: 1;
      text-align: center;
    }

    a {
      color: #333;
    }

    .profile-menu-item a {
      text-decoration: none;
    }

    a.logout {
      color: #9d0000;
    }
    hr {
      align-self: stretch;
      margin: 0;
    }
</style>