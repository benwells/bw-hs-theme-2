import { q as hydrating, c as create_custom_element, a as append_styles, b as prop, u as user_effect, i as if_block, t as template_effect, e as append, f as pop, l as from_html, p as push, s as set, g as get, o as set_text, h as state, v as user_derived, m as child, j as flushSync, r as reset, k as sibling, n as set_attribute } from "./chunks/custom-element.js";
import { t as to_style, s as set_class } from "./chunks/class.js";
function set_style(dom, value, prev_styles, next_styles) {
  var prev = dom.__style;
  if (hydrating || prev !== value) {
    var next_style_attr = to_style(value);
    if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
      if (next_style_attr == null) {
        dom.removeAttribute("style");
      } else {
        dom.style.cssText = next_style_attr;
      }
    }
    dom.__style = value;
  }
  return next_styles;
}
var root_1 = from_html(`<p class="hero-banner__subheading"> </p>`);
var root_2 = from_html(`<a class="hero-banner__cta hero-banner__cta--primary"> </a>`);
var root_3 = from_html(`<a class="hero-banner__cta hero-banner__cta--secondary"> </a>`);
var root = from_html(`<section><div class="hero-banner__container"><div class="hero-banner__content"><h1 class="hero-banner__heading"> </h1> <!> <div class="hero-banner__actions"><!> <!></div></div></div></section>`);
const $$css = {
  hash: "svelte-mnrbw2",
  code: "\n  /* Light DOM styles with :global() */.hero-banner {position:relative;min-height:600px;display:flex;align-items:center;background-image:var(--bg-image);background-size:cover;background-position:center;background-repeat:no-repeat;}.hero-banner::before {content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg-overlay);}.hero-banner__container {position:relative;max-width:1200px;margin:0 auto;padding:4rem 2rem;width:100%;}.hero-banner__content {max-width:700px;}.hero-banner--center .hero-banner__content {margin:0 auto;text-align:center;}.hero-banner--right .hero-banner__content {margin-left:auto;text-align:right;}.hero-banner__heading {font-size:clamp(2.5rem, 5vw, 4rem);font-weight:700;color:white;margin:0 0 1.5rem;line-height:1.2;}.hero-banner__subheading {font-size:clamp(1.125rem, 2vw, 1.5rem);color:rgba(255, 255, 255, 0.95);margin:0 0 2rem;line-height:1.6;}.hero-banner__actions {display:flex;gap:1rem;flex-wrap:wrap;}.hero-banner--center .hero-banner__actions {justify-content:center;}.hero-banner--right .hero-banner__actions {justify-content:flex-end;}.hero-banner__cta {display:inline-block;padding:1rem 2rem;border-radius:6px;font-weight:600;text-decoration:none;transition:all 0.3s ease;font-size:1.125rem;}.hero-banner__cta--primary {background:var(--primary-color, #0066cc);color:white;}.hero-banner__cta--primary:hover {background:var(--primary-color-dark, #0052a3);transform:translateY(-2px);box-shadow:0 4px 12px rgba(0, 102, 204, 0.4);}.hero-banner__cta--secondary {background:rgba(255, 255, 255, 0.2);color:white;border:2px solid white;backdrop-filter:blur(10px);}.hero-banner__cta--secondary:hover {background:rgba(255, 255, 255, 0.3);transform:translateY(-2px);}\n\n  @media (max-width: 768px) {.hero-banner {min-height:500px;}.hero-banner__actions {flex-direction:column;gap:0.75rem;}.hero-banner__cta {width:100%;text-align:center;}.hero-banner--right .hero-banner__content,\n    .hero-banner--left .hero-banner__content {text-align:center;}.hero-banner--right .hero-banner__actions,\n    .hero-banner--left .hero-banner__actions {justify-content:center;}\n  }"
};
function HeroBanner($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css);
  let heading = prop($$props, "heading", 7, "Welcome to Our Site"), subheading = prop($$props, "subheading", 7, "Build something amazing"), ctaPrimaryText = prop($$props, "ctaPrimaryText", 7, "Get Started"), ctaPrimaryUrl = prop($$props, "ctaPrimaryUrl", 7, "#"), ctaSecondaryText = prop($$props, "ctaSecondaryText", 7, "Learn More"), ctaSecondaryUrl = prop($$props, "ctaSecondaryUrl", 7, "#"), backgroundImage = prop($$props, "backgroundImage", 7, ""), backgroundOverlay = prop($$props, "backgroundOverlay", 7, "rgba(0, 0, 0, 0.4)"), alignment = prop(
    $$props,
    "alignment",
    7,
    "center"
    // left, center, right
  );
  let isVisible = state(false);
  let alignmentClass = user_derived(() => () => {
    const classes = {
      left: "hero-banner--left",
      center: "hero-banner--center",
      right: "hero-banner--right"
    };
    return classes[alignment()] || classes.center;
  });
  let inlineStyles = user_derived(() => () => {
    const bgImageUrl = backgroundImage() ? `url(${backgroundImage()})` : "none";
    return `--bg-image: ${bgImageUrl}; --bg-overlay: ${backgroundOverlay()};`;
  });
  user_effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            set(isVisible, true);
          }
        });
      },
      { threshold: 0.1 }
    );
    const heroElement = document.querySelector(".hero-banner");
    if (heroElement) {
      observer.observe(heroElement);
    }
    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
  });
  var $$exports = {
    get heading() {
      return heading();
    },
    set heading($$value = "Welcome to Our Site") {
      heading($$value);
      flushSync();
    },
    get subheading() {
      return subheading();
    },
    set subheading($$value = "Build something amazing") {
      subheading($$value);
      flushSync();
    },
    get ctaPrimaryText() {
      return ctaPrimaryText();
    },
    set ctaPrimaryText($$value = "Get Started") {
      ctaPrimaryText($$value);
      flushSync();
    },
    get ctaPrimaryUrl() {
      return ctaPrimaryUrl();
    },
    set ctaPrimaryUrl($$value = "#") {
      ctaPrimaryUrl($$value);
      flushSync();
    },
    get ctaSecondaryText() {
      return ctaSecondaryText();
    },
    set ctaSecondaryText($$value = "Learn More") {
      ctaSecondaryText($$value);
      flushSync();
    },
    get ctaSecondaryUrl() {
      return ctaSecondaryUrl();
    },
    set ctaSecondaryUrl($$value = "#") {
      ctaSecondaryUrl($$value);
      flushSync();
    },
    get backgroundImage() {
      return backgroundImage();
    },
    set backgroundImage($$value = "") {
      backgroundImage($$value);
      flushSync();
    },
    get backgroundOverlay() {
      return backgroundOverlay();
    },
    set backgroundOverlay($$value = "rgba(0, 0, 0, 0.4)") {
      backgroundOverlay($$value);
      flushSync();
    },
    get alignment() {
      return alignment();
    },
    set alignment($$value = "center") {
      alignment($$value);
      flushSync();
    }
  };
  var section = root();
  let classes_1;
  var div = child(section);
  var div_1 = child(div);
  var h1 = child(div_1);
  var text = child(h1, true);
  reset(h1);
  var node = sibling(h1, 2);
  {
    var consequent = ($$anchor2) => {
      var p = root_1();
      var text_1 = child(p, true);
      reset(p);
      template_effect(() => set_text(text_1, subheading()));
      append($$anchor2, p);
    };
    if_block(node, ($$render) => {
      if (subheading()) $$render(consequent);
    });
  }
  var div_2 = sibling(node, 2);
  var node_1 = child(div_2);
  {
    var consequent_1 = ($$anchor2) => {
      var a = root_2();
      var text_2 = child(a, true);
      reset(a);
      template_effect(() => {
        set_attribute(a, "href", ctaPrimaryUrl());
        set_text(text_2, ctaPrimaryText());
      });
      append($$anchor2, a);
    };
    if_block(node_1, ($$render) => {
      if (ctaPrimaryText()) $$render(consequent_1);
    });
  }
  var node_2 = sibling(node_1, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var a_1 = root_3();
      var text_3 = child(a_1, true);
      reset(a_1);
      template_effect(() => {
        set_attribute(a_1, "href", ctaSecondaryUrl());
        set_text(text_3, ctaSecondaryText());
      });
      append($$anchor2, a_1);
    };
    if_block(node_2, ($$render) => {
      if (ctaSecondaryText()) $$render(consequent_2);
    });
  }
  reset(div_2);
  reset(div_1);
  reset(div);
  reset(section);
  template_effect(
    ($0, $1) => {
      classes_1 = set_class(section, 1, `hero-banner ${$0 ?? ""}`, null, classes_1, { "is-visible": get(isVisible) });
      set_style(section, $1);
      set_text(text, heading());
    },
    [() => get(alignmentClass)(), () => get(inlineStyles)()]
  );
  append($$anchor, section);
  return pop($$exports);
}
customElements.define("hero-banner", create_custom_element(
  HeroBanner,
  {
    heading: {},
    subheading: {},
    ctaPrimaryText: {},
    ctaPrimaryUrl: {},
    ctaSecondaryText: {},
    ctaSecondaryUrl: {},
    backgroundImage: {},
    backgroundOverlay: {},
    alignment: {}
  },
  [],
  [],
  { mode: "open" }
));
export {
  HeroBanner as default
};
//# sourceMappingURL=hero-banner.js.map
