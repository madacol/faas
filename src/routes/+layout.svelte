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
      font-family: 'Poppins', sans-serif;
      font-weight: bold;
      font-size: calc(10px + 1vmin);
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
    .links a {
      text-decoration: none;
      color: #000000;
      font-weight: bold;
      font-size: 1.2em;
    }
    .links a:hover {
      color: #fffafa;
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
      margin: 5px;
      
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
      padding: 10px 20px;
      background: #3D74A6;
      color: #fff8f8;
      border: none;
      cursor: pointer;
      border-radius: 0.7em;
      text-decoration: none;
      font-weight: bold;
    }
    #profile-menu-button:hover {
      opacity: 0.8;
    }
    #profile-menu.open {
      display: flex;
    }

    .profile-menu-item {
      margin-right: 10px;
    }

    #login-button {
      padding: 10px 20px;
      background: #3D74A6;
      color: #fff8f8;
      border: none;
      cursor: pointer;
      border-radius: 0.7em;
      text-decoration: none;
      font-weight: bold;

    }
    #login-button:hover {
      opacity: 0.8;
    }
    

    #content {
      overflow: auto;
      flex-grow: 1;
      text-align: center;
      background: #EEE;
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