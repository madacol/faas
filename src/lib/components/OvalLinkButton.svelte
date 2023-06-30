<script>
// @ts-nocheck

    /**
      * @type {string}
      */
     export let href;
      /**
      * @type {boolean}
      */
      export let disabled = false;
 </script>
 
 <a {href} {...$$restProps} {disabled}>
     <button {disabled}>
         <slot />
     </button>
 </a>

<style>
    button {
        width: 308px;
        height: 50px;
        flex-shrink: 0;
        border: 0;
        cursor: pointer;

        border-radius: 100px;
        background: #95B1CA;

        color: #fff;
        text-align: center;
        font-size: 15px;
        
        font-weight: 700;
        line-height: 171.5%;
        align-self: center;
    }
    button:hover {
        background-color: #3d74a6;
        opacity: 1;
    }
</style>
