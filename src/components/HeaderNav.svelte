<svelte:options customElement="header-nav" />

<script>
  // $props - Props from HubSpot module fields (Svelte 5 rune)
  let { 
    logo = '', 
    navigation = [], 
    ctaText = 'Get Started', 
    ctaUrl = '#' 
  } = $props();

  // $state - reactive state for mobile menu (Svelte 5 rune)
  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // $effect - close menu when clicking outside (Svelte 5 rune)
  $effect(() => {
    if (!mobileMenuOpen) return;

    function handleClickOutside(event) {
      const nav = event.target.closest('.header-nav');
      if (!nav) {
        mobileMenuOpen = false;
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<header class="header-nav">
  <div class="header-nav__container">
    {#if logo}
      <div class="header-nav__logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
    {/if}

    <button 
      class="header-nav__mobile-toggle" 
      onclick={toggleMobileMenu}
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="header-nav__nav" class:is-open={mobileMenuOpen}>
      <ul class="header-nav__list">
        {#each navigation as item}
          <li class="header-nav__item">
            <a href={item.url} class="header-nav__link">
              {item.label}
            </a>
          </li>
        {/each}
      </ul>

      {#if ctaText}
        <a href={ctaUrl} class="header-nav__cta">
          {ctaText}
        </a>
      {/if}
    </nav>
  </div>
</header>

<style>
  /* Use :global() to prevent scoping and use Light DOM */
  :global(.header-nav) {
    background: var(--header-bg, #ffffff);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  :global(.header-nav__container) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  :global(.header-nav__logo img) {
    height: 40px;
    width: auto;
  }

  :global(.header-nav__mobile-toggle) {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  :global(.header-nav__mobile-toggle span) {
    width: 24px;
    height: 3px;
    background: var(--text-color, #333);
    transition: all 0.3s ease;
  }

  :global(.header-nav__nav) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  :global(.header-nav__list) {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  :global(.header-nav__link) {
    color: var(--text-color, #333);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  :global(.header-nav__link:hover) {
    color: var(--primary-color, #0066cc);
  }

  :global(.header-nav__cta) {
    background: var(--primary-color, #0066cc);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s ease;
  }

  :global(.header-nav__cta:hover) {
    background: var(--primary-color-dark, #0052a3);
  }

  @media (max-width: 768px) {
    :global(.header-nav__mobile-toggle) {
      display: flex;
    }

    :global(.header-nav__nav) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--header-bg, #ffffff);
      flex-direction: column;
      padding: 1rem 2rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    :global(.header-nav__nav.is-open) {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    :global(.header-nav__list) {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
