import { d as delegate, c as create_custom_element, p as push, a as append_styles, b as prop, u as user_effect, g as get, s as set, i as if_block, t as template_effect, e as append, f as pop, h as state, j as flushSync, k as sibling, l as from_html, m as child, r as reset, n as set_attribute, o as set_text } from "./chunks/custom-element.js";
import { e as each, i as index } from "./chunks/each.js";
import { s as set_class } from "./chunks/class.js";
var root_1 = from_html(`<div class="header-nav__logo"><a href="/"><img alt="Logo"/></a></div>`);
var root_2 = from_html(`<li class="header-nav__item"><a class="header-nav__link"> </a></li>`);
var root_3 = from_html(`<a class="header-nav__cta"> </a>`);
var root = from_html(`<header class="header-nav"><div class="header-nav__container"><!> <button class="header-nav__mobile-toggle" aria-label="Toggle menu"><span></span> <span></span> <span></span></button> <nav><ul class="header-nav__list"></ul> <!></nav></div></header>`);
const $$css = {
  hash: "svelte-14lqici",
  code: "\n  /* Use :global() to prevent scoping and use Light DOM */.header-nav {background:var(--header-bg, #ffffff);box-shadow:0 2px 4px rgba(0,0,0,0.1);position:sticky;top:0;z-index:1000;}.header-nav__container {max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;}.header-nav__logo img {height:40px;width:auto;}.header-nav__mobile-toggle {display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:0.5rem;}.header-nav__mobile-toggle span {width:24px;height:3px;background:var(--text-color, #333);transition:all 0.3s ease;}.header-nav__nav {display:flex;align-items:center;gap:2rem;}.header-nav__list {display:flex;list-style:none;margin:0;padding:0;gap:2rem;}.header-nav__link {color:var(--text-color, #333);text-decoration:none;font-weight:500;transition:color 0.2s ease;}.header-nav__link:hover {color:var(--primary-color, #0066cc);}.header-nav__cta {background:var(--primary-color, #0066cc);color:white;padding:0.75rem 1.5rem;border-radius:4px;text-decoration:none;font-weight:600;transition:background 0.2s ease;}.header-nav__cta:hover {background:var(--primary-color-dark, #0052a3);}\n\n  @media (max-width: 768px) {.header-nav__mobile-toggle {display:flex;}.header-nav__nav {position:absolute;top:100%;left:0;right:0;background:var(--header-bg, #ffffff);flex-direction:column;padding:1rem 2rem;box-shadow:0 4px 6px rgba(0,0,0,0.1);transform:translateY(-100%);opacity:0;pointer-events:none;transition:all 0.3s ease;}.header-nav__nav.is-open {transform:translateY(0);opacity:1;pointer-events:all;}.header-nav__list {flex-direction:column;gap:1rem;}\n  }"
};
function HeaderNav($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css);
  let logo = prop($$props, "logo", 7, ""), navigation = prop($$props, "navigation", 23, () => []), ctaText = prop($$props, "ctaText", 7, "Get Started"), ctaUrl = prop($$props, "ctaUrl", 7, "#");
  let mobileMenuOpen = state(false);
  function toggleMobileMenu() {
    set(mobileMenuOpen, !get(mobileMenuOpen));
  }
  user_effect(() => {
    if (!get(mobileMenuOpen)) return;
    function handleClickOutside(event) {
      const nav = event.target.closest(".header-nav");
      if (!nav) {
        set(mobileMenuOpen, false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
  var $$exports = {
    get logo() {
      return logo();
    },
    set logo($$value = "") {
      logo($$value);
      flushSync();
    },
    get navigation() {
      return navigation();
    },
    set navigation($$value = []) {
      navigation($$value);
      flushSync();
    },
    get ctaText() {
      return ctaText();
    },
    set ctaText($$value = "Get Started") {
      ctaText($$value);
      flushSync();
    },
    get ctaUrl() {
      return ctaUrl();
    },
    set ctaUrl($$value = "#") {
      ctaUrl($$value);
      flushSync();
    }
  };
  var header = root();
  var div = child(header);
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      var div_1 = root_1();
      var a = child(div_1);
      var img = child(a);
      reset(a);
      reset(div_1);
      template_effect(() => set_attribute(img, "src", logo()));
      append($$anchor2, div_1);
    };
    if_block(node, ($$render) => {
      if (logo()) $$render(consequent);
    });
  }
  var button = sibling(node, 2);
  button.__click = toggleMobileMenu;
  var nav_1 = sibling(button, 2);
  let classes;
  var ul = child(nav_1);
  each(ul, 21, navigation, index, ($$anchor2, item) => {
    var li = root_2();
    var a_1 = child(li);
    var text = child(a_1, true);
    reset(a_1);
    reset(li);
    template_effect(() => {
      set_attribute(a_1, "href", get(item).url);
      set_text(text, get(item).label);
    });
    append($$anchor2, li);
  });
  reset(ul);
  var node_1 = sibling(ul, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var a_2 = root_3();
      var text_1 = child(a_2, true);
      reset(a_2);
      template_effect(() => {
        set_attribute(a_2, "href", ctaUrl());
        set_text(text_1, ctaText());
      });
      append($$anchor2, a_2);
    };
    if_block(node_1, ($$render) => {
      if (ctaText()) $$render(consequent_1);
    });
  }
  reset(nav_1);
  reset(div);
  reset(header);
  template_effect(() => {
    set_attribute(button, "aria-expanded", get(mobileMenuOpen));
    classes = set_class(nav_1, 1, "header-nav__nav", null, classes, { "is-open": get(mobileMenuOpen) });
  });
  append($$anchor, header);
  return pop($$exports);
}
delegate(["click"]);
customElements.define("header-nav", create_custom_element(HeaderNav, { logo: {}, navigation: {}, ctaText: {}, ctaUrl: {} }, [], [], { mode: "open" }));
export {
  HeaderNav as default
};
//# sourceMappingURL=header-nav.js.map
