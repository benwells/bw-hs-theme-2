<svelte:options customElement="hero-banner" />

<script>
  // $props - Props from HubSpot module fields (Svelte 5 rune)
  let { 
    heading = 'Welcome to Our Site',
    subheading = 'Build something amazing',
    ctaPrimaryText = 'Get Started',
    ctaPrimaryUrl = '#',
    ctaSecondaryText = 'Learn More',
    ctaSecondaryUrl = '#',
    backgroundImage = '',
    backgroundOverlay = 'rgba(0, 0, 0, 0.4)',
    alignment = 'center' // left, center, right
  } = $props();

  // $state - reactive state for animation tracking (Svelte 5 rune)
  let isVisible = $state(false);

  // $derived - computed CSS classes (Svelte 5 rune)
  let alignmentClass = $derived(() => {
    const classes = {
      left: 'hero-banner--left',
      center: 'hero-banner--center',
      right: 'hero-banner--right'
    };
    return classes[alignment] || classes.center;
  });

  // $derived - computed inline styles (Svelte 5 rune)
  let inlineStyles = $derived(() => {
    const bgImageUrl = backgroundImage ? `url(${backgroundImage})` : 'none';
    return `--bg-image: ${bgImageUrl}; --bg-overlay: ${backgroundOverlay};`;
  });

  // $effect - intersection observer for scroll animations (Svelte 5 rune)
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = document.querySelector('.hero-banner');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  });
</script>

<section 
  class="hero-banner {alignmentClass()}"
  class:is-visible={isVisible}
  style={inlineStyles()}
>
  <div class="hero-banner__container">
    <div class="hero-banner__content">
      <h1 class="hero-banner__heading">{heading}</h1>
      {#if subheading}
        <p class="hero-banner__subheading">{subheading}</p>
      {/if}
      
      <div class="hero-banner__actions">
        {#if ctaPrimaryText}
          <a href={ctaPrimaryUrl} class="hero-banner__cta hero-banner__cta--primary">
            {ctaPrimaryText}
          </a>
        {/if}
        {#if ctaSecondaryText}
          <a href={ctaSecondaryUrl} class="hero-banner__cta hero-banner__cta--secondary">
            {ctaSecondaryText}
          </a>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  /* Light DOM styles with :global() */
  :global(.hero-banner) {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  :global(.hero-banner::before) {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-overlay);
  }

  :global(.hero-banner__container) {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    width: 100%;
  }

  :global(.hero-banner__content) {
    max-width: 700px;
  }

  :global(.hero-banner--center .hero-banner__content) {
    margin: 0 auto;
    text-align: center;
  }

  :global(.hero-banner--right .hero-banner__content) {
    margin-left: auto;
    text-align: right;
  }

  :global(.hero-banner__heading) {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: white;
    margin: 0 0 1.5rem;
    line-height: 1.2;
  }

  :global(.hero-banner__subheading) {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 2rem;
    line-height: 1.6;
  }

  :global(.hero-banner__actions) {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  :global(.hero-banner--center .hero-banner__actions) {
    justify-content: center;
  }

  :global(.hero-banner--right .hero-banner__actions) {
    justify-content: flex-end;
  }

  :global(.hero-banner__cta) {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1.125rem;
  }

  :global(.hero-banner__cta--primary) {
    background: var(--primary-color, #0066cc);
    color: white;
  }

  :global(.hero-banner__cta--primary:hover) {
    background: var(--primary-color-dark, #0052a3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
  }

  :global(.hero-banner__cta--secondary) {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
    backdrop-filter: blur(10px);
  }

  :global(.hero-banner__cta--secondary:hover) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    :global(.hero-banner) {
      min-height: 500px;
    }

    :global(.hero-banner__actions) {
      flex-direction: column;
      gap: 0.75rem;
    }

    :global(.hero-banner__cta) {
      width: 100%;
      text-align: center;
    }

    :global(.hero-banner--right .hero-banner__content),
    :global(.hero-banner--left .hero-banner__content) {
      text-align: center;
    }

    :global(.hero-banner--right .hero-banner__actions),
    :global(.hero-banner--left .hero-banner__actions) {
      justify-content: center;
    }
  }
</style>
