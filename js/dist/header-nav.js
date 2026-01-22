import { c as create_custom_element, S as SvelteComponent, i as init, s as safe_not_equal, f as flush, a as append_styles, n as noop, d as detach, b as destroy_each, e as attr, t as toggle_class, g as insert, h as append, l as listen, j as element, k as space, m as src_url_equal, o as set_data, p as text } from "./chunks/index.js";
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function add_css(target) {
  append_styles(target, "svelte-12ruva7", ".header-nav{background:var(--header-bg, #ffffff);box-shadow:0 2px 4px rgba(0,0,0,0.1);position:sticky;top:0;z-index:1000}.header-nav__container{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:2rem}.header-nav__logo img{height:40px;width:auto}.header-nav__mobile-toggle{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:0.5rem}.header-nav__mobile-toggle span{width:24px;height:3px;background:var(--text-color, #333);transition:all 0.3s ease}.header-nav__nav{display:flex;align-items:center;gap:2rem}.header-nav__list{display:flex;list-style:none;margin:0;padding:0;gap:2rem}.header-nav__link{color:var(--text-color, #333);text-decoration:none;font-weight:500;transition:color 0.2s ease}.header-nav__link:hover{color:var(--primary-color, #0066cc)}.header-nav__cta{background:var(--primary-color, #0066cc);color:white;padding:0.75rem 1.5rem;border-radius:4px;text-decoration:none;font-weight:600;transition:background 0.2s ease}.header-nav__cta:hover{background:var(--primary-color-dark, #0052a3)}@media(max-width: 768px){.header-nav__mobile-toggle{display:flex}.header-nav__nav{position:absolute;top:100%;left:0;right:0;background:var(--header-bg, #ffffff);flex-direction:column;padding:1rem 2rem;box-shadow:0 4px 6px rgba(0,0,0,0.1);transform:translateY(-100%);opacity:0;pointer-events:none;transition:all 0.3s ease}.header-nav__nav.is-open{transform:translateY(0);opacity:1;pointer-events:all}.header-nav__list{flex-direction:column;gap:1rem}}");
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let div;
  let a;
  let img;
  let img_src_value;
  return {
    c() {
      div = element("div");
      a = element("a");
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*logo*/
      ctx[0])) attr(img, "src", img_src_value);
      attr(img, "alt", "Logo");
      attr(a, "href", "/");
      attr(div, "class", "header-nav__logo");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, a);
      append(a, img);
    },
    p(ctx2, dirty) {
      if (dirty & /*logo*/
      1 && !src_url_equal(img.src, img_src_value = /*logo*/
      ctx2[0])) {
        attr(img, "src", img_src_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block(ctx) {
  let li;
  let a;
  let t0_value = (
    /*item*/
    ctx[6].label + ""
  );
  let t0;
  let a_href_value;
  let t1;
  return {
    c() {
      li = element("li");
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "href", a_href_value = /*item*/
      ctx[6].url);
      attr(a, "class", "header-nav__link");
      attr(li, "class", "header-nav__item");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      append(a, t0);
      append(li, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*navigation*/
      2 && t0_value !== (t0_value = /*item*/
      ctx2[6].label + "")) set_data(t0, t0_value);
      if (dirty & /*navigation*/
      2 && a_href_value !== (a_href_value = /*item*/
      ctx2[6].url)) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
    }
  };
}
function create_if_block(ctx) {
  let a;
  let t;
  return {
    c() {
      a = element("a");
      t = text(
        /*ctaText*/
        ctx[2]
      );
      attr(
        a,
        "href",
        /*ctaUrl*/
        ctx[3]
      );
      attr(a, "class", "header-nav__cta");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*ctaText*/
      4) set_data(
        t,
        /*ctaText*/
        ctx2[2]
      );
      if (dirty & /*ctaUrl*/
      8) {
        attr(
          a,
          "href",
          /*ctaUrl*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(a);
      }
    }
  };
}
function create_fragment(ctx) {
  let header;
  let div;
  let t0;
  let button;
  let span0;
  let t1;
  let span1;
  let t2;
  let span2;
  let t3;
  let nav;
  let ul;
  let t4;
  let mounted;
  let dispose;
  let if_block0 = (
    /*logo*/
    ctx[0] && create_if_block_1(ctx)
  );
  let each_value = ensure_array_like(
    /*navigation*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  let if_block1 = (
    /*ctaText*/
    ctx[2] && create_if_block(ctx)
  );
  return {
    c() {
      header = element("header");
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      button = element("button");
      span0 = element("span");
      t1 = space();
      span1 = element("span");
      t2 = space();
      span2 = element("span");
      t3 = space();
      nav = element("nav");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      if (if_block1) if_block1.c();
      attr(button, "class", "header-nav__mobile-toggle");
      attr(button, "aria-label", "Toggle menu");
      attr(
        button,
        "aria-expanded",
        /*mobileMenuOpen*/
        ctx[4]
      );
      attr(ul, "class", "header-nav__list");
      attr(nav, "class", "header-nav__nav");
      toggle_class(
        nav,
        "is-open",
        /*mobileMenuOpen*/
        ctx[4]
      );
      attr(div, "class", "header-nav__container");
      attr(header, "class", "header-nav");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      append(header, div);
      if (if_block0) if_block0.m(div, null);
      append(div, t0);
      append(div, button);
      append(button, span0);
      append(button, t1);
      append(button, span1);
      append(button, t2);
      append(button, span2);
      append(div, t3);
      append(div, nav);
      append(nav, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(nav, t4);
      if (if_block1) if_block1.m(nav, null);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*toggleMobileMenu*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*logo*/
        ctx2[0]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*mobileMenuOpen*/
      16) {
        attr(
          button,
          "aria-expanded",
          /*mobileMenuOpen*/
          ctx2[4]
        );
      }
      if (dirty & /*navigation*/
      2) {
        each_value = ensure_array_like(
          /*navigation*/
          ctx2[1]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (
        /*ctaText*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(nav, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*mobileMenuOpen*/
      16) {
        toggle_class(
          nav,
          "is-open",
          /*mobileMenuOpen*/
          ctx2[4]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      if (if_block0) if_block0.d();
      destroy_each(each_blocks, detaching);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { logo = "" } = $$props;
  let { navigation = [] } = $$props;
  let { ctaText = "Get Started" } = $$props;
  let { ctaUrl = "#" } = $$props;
  let mobileMenuOpen = false;
  function toggleMobileMenu() {
    $$invalidate(4, mobileMenuOpen = !mobileMenuOpen);
  }
  $$self.$$set = ($$props2) => {
    if ("logo" in $$props2) $$invalidate(0, logo = $$props2.logo);
    if ("navigation" in $$props2) $$invalidate(1, navigation = $$props2.navigation);
    if ("ctaText" in $$props2) $$invalidate(2, ctaText = $$props2.ctaText);
    if ("ctaUrl" in $$props2) $$invalidate(3, ctaUrl = $$props2.ctaUrl);
  };
  return [logo, navigation, ctaText, ctaUrl, mobileMenuOpen, toggleMobileMenu];
}
class HeaderNav extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        logo: 0,
        navigation: 1,
        ctaText: 2,
        ctaUrl: 3
      },
      add_css
    );
  }
  get logo() {
    return this.$$.ctx[0];
  }
  set logo(logo) {
    this.$$set({ logo });
    flush();
  }
  get navigation() {
    return this.$$.ctx[1];
  }
  set navigation(navigation) {
    this.$$set({ navigation });
    flush();
  }
  get ctaText() {
    return this.$$.ctx[2];
  }
  set ctaText(ctaText) {
    this.$$set({ ctaText });
    flush();
  }
  get ctaUrl() {
    return this.$$.ctx[3];
  }
  set ctaUrl(ctaUrl) {
    this.$$set({ ctaUrl });
    flush();
  }
}
customElements.define("header-nav", create_custom_element(HeaderNav, { "logo": {}, "navigation": {}, "ctaText": {}, "ctaUrl": {} }, [], [], true));
export {
  HeaderNav as default
};
//# sourceMappingURL=header-nav.js.map
