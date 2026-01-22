import { c as create_custom_element, S as SvelteComponent, i as init, f as flush, s as safe_not_equal, a as append_styles, n as noop, d as detach, o as set_data, q as set_style, t as toggle_class, g as insert, h as append, j as element, p as text, k as space, e as attr } from "./chunks/index.js";
function add_css(target) {
  append_styles(target, "svelte-6f6os2", ".hero-banner{position:relative;min-height:600px;display:flex;align-items:center;background-image:var(--bg-image);background-size:cover;background-position:center;background-repeat:no-repeat}.hero-banner::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg-overlay)}.hero-banner__container{position:relative;max-width:1200px;margin:0 auto;padding:4rem 2rem;width:100%}.hero-banner__content{max-width:700px}.hero-banner--center .hero-banner__content{margin:0 auto;text-align:center}.hero-banner--right .hero-banner__content{margin-left:auto;text-align:right}.hero-banner__heading{font-size:clamp(2.5rem, 5vw, 4rem);font-weight:700;color:white;margin:0 0 1.5rem;line-height:1.2}.hero-banner__subheading{font-size:clamp(1.125rem, 2vw, 1.5rem);color:rgba(255, 255, 255, 0.95);margin:0 0 2rem;line-height:1.6}.hero-banner__actions{display:flex;gap:1rem;flex-wrap:wrap}.hero-banner--center .hero-banner__actions{justify-content:center}.hero-banner--right .hero-banner__actions{justify-content:flex-end}.hero-banner__cta{display:inline-block;padding:1rem 2rem;border-radius:6px;font-weight:600;text-decoration:none;transition:all 0.3s ease;font-size:1.125rem}.hero-banner__cta--primary{background:var(--primary-color, #0066cc);color:white}.hero-banner__cta--primary:hover{background:var(--primary-color-dark, #0052a3);transform:translateY(-2px);box-shadow:0 4px 12px rgba(0, 102, 204, 0.4)}.hero-banner__cta--secondary{background:rgba(255, 255, 255, 0.2);color:white;border:2px solid white;backdrop-filter:blur(10px)}.hero-banner__cta--secondary:hover{background:rgba(255, 255, 255, 0.3);transform:translateY(-2px)}@media(max-width: 768px){.hero-banner{min-height:500px}.hero-banner__actions{flex-direction:column;gap:0.75rem}.hero-banner__cta{width:100%;text-align:center}.hero-banner--right .hero-banner__content,.hero-banner--left .hero-banner__content{text-align:center}.hero-banner--right .hero-banner__actions,.hero-banner--left .hero-banner__actions{justify-content:center}}");
}
function create_if_block_2(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(
        /*subheading*/
        ctx[1]
      );
      attr(p, "class", "hero-banner__subheading");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*subheading*/
      2) set_data(
        t,
        /*subheading*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let a;
  let t;
  return {
    c() {
      a = element("a");
      t = text(
        /*ctaPrimaryText*/
        ctx[2]
      );
      attr(
        a,
        "href",
        /*ctaPrimaryUrl*/
        ctx[3]
      );
      attr(a, "class", "hero-banner__cta hero-banner__cta--primary");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*ctaPrimaryText*/
      4) set_data(
        t,
        /*ctaPrimaryText*/
        ctx2[2]
      );
      if (dirty & /*ctaPrimaryUrl*/
      8) {
        attr(
          a,
          "href",
          /*ctaPrimaryUrl*/
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
function create_if_block(ctx) {
  let a;
  let t;
  return {
    c() {
      a = element("a");
      t = text(
        /*ctaSecondaryText*/
        ctx[4]
      );
      attr(
        a,
        "href",
        /*ctaSecondaryUrl*/
        ctx[5]
      );
      attr(a, "class", "hero-banner__cta hero-banner__cta--secondary");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*ctaSecondaryText*/
      16) set_data(
        t,
        /*ctaSecondaryText*/
        ctx2[4]
      );
      if (dirty & /*ctaSecondaryUrl*/
      32) {
        attr(
          a,
          "href",
          /*ctaSecondaryUrl*/
          ctx2[5]
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
  let section;
  let div2;
  let div1;
  let h1;
  let t0;
  let t1;
  let t2;
  let div0;
  let t3;
  let if_block0 = (
    /*subheading*/
    ctx[1] && create_if_block_2(ctx)
  );
  let if_block1 = (
    /*ctaPrimaryText*/
    ctx[2] && create_if_block_1(ctx)
  );
  let if_block2 = (
    /*ctaSecondaryText*/
    ctx[4] && create_if_block(ctx)
  );
  return {
    c() {
      section = element("section");
      div2 = element("div");
      div1 = element("div");
      h1 = element("h1");
      t0 = text(
        /*heading*/
        ctx[0]
      );
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      div0 = element("div");
      if (if_block1) if_block1.c();
      t3 = space();
      if (if_block2) if_block2.c();
      attr(h1, "class", "hero-banner__heading");
      attr(div0, "class", "hero-banner__actions");
      attr(div1, "class", "hero-banner__content");
      attr(div2, "class", "hero-banner__container");
      attr(section, "class", "hero-banner");
      set_style(section, "--bg-image", "url(" + /*backgroundImage*/
      ctx[6] + ")");
      set_style(
        section,
        "--bg-overlay",
        /*backgroundOverlay*/
        ctx[7]
      );
      toggle_class(
        section,
        "hero-banner--left",
        /*alignment*/
        ctx[8] === "left"
      );
      toggle_class(
        section,
        "hero-banner--center",
        /*alignment*/
        ctx[8] === "center"
      );
      toggle_class(
        section,
        "hero-banner--right",
        /*alignment*/
        ctx[8] === "right"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      append(section, div2);
      append(div2, div1);
      append(div1, h1);
      append(h1, t0);
      append(div1, t1);
      if (if_block0) if_block0.m(div1, null);
      append(div1, t2);
      append(div1, div0);
      if (if_block1) if_block1.m(div0, null);
      append(div0, t3);
      if (if_block2) if_block2.m(div0, null);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*heading*/
      1) set_data(
        t0,
        /*heading*/
        ctx2[0]
      );
      if (
        /*subheading*/
        ctx2[1]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_2(ctx2);
          if_block0.c();
          if_block0.m(div1, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*ctaPrimaryText*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1(ctx2);
          if_block1.c();
          if_block1.m(div0, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*ctaSecondaryText*/
        ctx2[4]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block(ctx2);
          if_block2.c();
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & /*backgroundImage*/
      64) {
        set_style(section, "--bg-image", "url(" + /*backgroundImage*/
        ctx2[6] + ")");
      }
      if (dirty & /*backgroundOverlay*/
      128) {
        set_style(
          section,
          "--bg-overlay",
          /*backgroundOverlay*/
          ctx2[7]
        );
      }
      if (dirty & /*alignment*/
      256) {
        toggle_class(
          section,
          "hero-banner--left",
          /*alignment*/
          ctx2[8] === "left"
        );
      }
      if (dirty & /*alignment*/
      256) {
        toggle_class(
          section,
          "hero-banner--center",
          /*alignment*/
          ctx2[8] === "center"
        );
      }
      if (dirty & /*alignment*/
      256) {
        toggle_class(
          section,
          "hero-banner--right",
          /*alignment*/
          ctx2[8] === "right"
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { heading = "Welcome to Our Site" } = $$props;
  let { subheading = "Build something amazing" } = $$props;
  let { ctaPrimaryText = "Get Started" } = $$props;
  let { ctaPrimaryUrl = "#" } = $$props;
  let { ctaSecondaryText = "Learn More" } = $$props;
  let { ctaSecondaryUrl = "#" } = $$props;
  let { backgroundImage = "" } = $$props;
  let { backgroundOverlay = "rgba(0, 0, 0, 0.4)" } = $$props;
  let { alignment = "center" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("heading" in $$props2) $$invalidate(0, heading = $$props2.heading);
    if ("subheading" in $$props2) $$invalidate(1, subheading = $$props2.subheading);
    if ("ctaPrimaryText" in $$props2) $$invalidate(2, ctaPrimaryText = $$props2.ctaPrimaryText);
    if ("ctaPrimaryUrl" in $$props2) $$invalidate(3, ctaPrimaryUrl = $$props2.ctaPrimaryUrl);
    if ("ctaSecondaryText" in $$props2) $$invalidate(4, ctaSecondaryText = $$props2.ctaSecondaryText);
    if ("ctaSecondaryUrl" in $$props2) $$invalidate(5, ctaSecondaryUrl = $$props2.ctaSecondaryUrl);
    if ("backgroundImage" in $$props2) $$invalidate(6, backgroundImage = $$props2.backgroundImage);
    if ("backgroundOverlay" in $$props2) $$invalidate(7, backgroundOverlay = $$props2.backgroundOverlay);
    if ("alignment" in $$props2) $$invalidate(8, alignment = $$props2.alignment);
  };
  return [
    heading,
    subheading,
    ctaPrimaryText,
    ctaPrimaryUrl,
    ctaSecondaryText,
    ctaSecondaryUrl,
    backgroundImage,
    backgroundOverlay,
    alignment
  ];
}
class HeroBanner extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        heading: 0,
        subheading: 1,
        ctaPrimaryText: 2,
        ctaPrimaryUrl: 3,
        ctaSecondaryText: 4,
        ctaSecondaryUrl: 5,
        backgroundImage: 6,
        backgroundOverlay: 7,
        alignment: 8
      },
      add_css
    );
  }
  get heading() {
    return this.$$.ctx[0];
  }
  set heading(heading) {
    this.$$set({ heading });
    flush();
  }
  get subheading() {
    return this.$$.ctx[1];
  }
  set subheading(subheading) {
    this.$$set({ subheading });
    flush();
  }
  get ctaPrimaryText() {
    return this.$$.ctx[2];
  }
  set ctaPrimaryText(ctaPrimaryText) {
    this.$$set({ ctaPrimaryText });
    flush();
  }
  get ctaPrimaryUrl() {
    return this.$$.ctx[3];
  }
  set ctaPrimaryUrl(ctaPrimaryUrl) {
    this.$$set({ ctaPrimaryUrl });
    flush();
  }
  get ctaSecondaryText() {
    return this.$$.ctx[4];
  }
  set ctaSecondaryText(ctaSecondaryText) {
    this.$$set({ ctaSecondaryText });
    flush();
  }
  get ctaSecondaryUrl() {
    return this.$$.ctx[5];
  }
  set ctaSecondaryUrl(ctaSecondaryUrl) {
    this.$$set({ ctaSecondaryUrl });
    flush();
  }
  get backgroundImage() {
    return this.$$.ctx[6];
  }
  set backgroundImage(backgroundImage) {
    this.$$set({ backgroundImage });
    flush();
  }
  get backgroundOverlay() {
    return this.$$.ctx[7];
  }
  set backgroundOverlay(backgroundOverlay) {
    this.$$set({ backgroundOverlay });
    flush();
  }
  get alignment() {
    return this.$$.ctx[8];
  }
  set alignment(alignment) {
    this.$$set({ alignment });
    flush();
  }
}
customElements.define("hero-banner", create_custom_element(HeroBanner, { "heading": {}, "subheading": {}, "ctaPrimaryText": {}, "ctaPrimaryUrl": {}, "ctaSecondaryText": {}, "ctaSecondaryUrl": {}, "backgroundImage": {}, "backgroundOverlay": {}, "alignment": {} }, [], [], true));
export {
  HeroBanner as default
};
//# sourceMappingURL=hero-banner.js.map
