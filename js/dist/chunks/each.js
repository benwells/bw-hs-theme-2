import { J as create_text, K as block, g as get, L as internal_set, x as current_batch, M as branch, N as should_defer_append, O as derived_safe_equal, A as is_array, P as array_from, Q as EACH_INDEX_REACTIVE, R as source, S as EACH_ITEM_REACTIVE, T as EACH_ITEM_IMMUTABLE, U as mutable_source, V as EFFECT_OFFSCREEN, W as resume_effect, X as pause_effect, Y as INERT, Z as BRANCH_EFFECT, _ as clear_text_content, $ as destroy_effect, q as hydrating, a0 as set_hydrate_node, a1 as get_first_child, a2 as hydrate_next, a3 as read_hydration_instruction, a4 as HYDRATION_START_ELSE, a5 as skip_nodes, a6 as set_hydrating, a7 as hydrate_node, a8 as COMMENT_NODE, a9 as HYDRATION_END, aa as get_next_sibling, ab as EACH_IS_CONTROLLED, ac as queue_micro_task, ad as EACH_IS_ANIMATED } from "./custom-element.js";
function index(_, i) {
  return i;
}
function pause_effects(state, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  var group;
  var remaining = to_destroy.length;
  for (var i = 0; i < length; i++) {
    let effect = to_destroy[i];
    pause_effect(
      effect,
      () => {
        if (group) {
          group.pending.delete(effect);
          group.done.add(effect);
          if (group.pending.size === 0) {
            var groups = (
              /** @type {Set<EachOutroGroup>} */
              state.outrogroups
            );
            destroy_effects(array_from(group.done));
            groups.delete(group);
            if (groups.size === 0) {
              state.outrogroups = null;
            }
          }
        } else {
          remaining -= 1;
        }
      },
      false
    );
  }
  if (remaining === 0) {
    var fast_path = transitions.length === 0 && controlled_anchor !== null;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state.items.clear();
    }
    destroy_effects(to_destroy, !fast_path);
  } else {
    group = {
      pending: new Set(to_destroy),
      done: /* @__PURE__ */ new Set()
    };
    (state.outrogroups ?? (state.outrogroups = /* @__PURE__ */ new Set())).add(group);
  }
}
function destroy_effects(to_destroy, remove_dom = true) {
  for (var i = 0; i < to_destroy.length; i++) {
    destroy_effect(to_destroy[i], remove_dom);
  }
}
var offscreen_anchor;
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(get_first_child(parent_node)) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback = null;
  var each_array = derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  var array;
  var first_run = true;
  function commit() {
    state.fallback = fallback;
    reconcile(state, array, anchor, flags, get_key);
    if (fallback !== null) {
      if (array.length === 0) {
        if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
          resume_effect(fallback);
        } else {
          fallback.f ^= EFFECT_OFFSCREEN;
          move(fallback, null, anchor);
        }
      } else {
        pause_effect(fallback, () => {
          fallback = null;
        });
      }
    }
  }
  var effect = block(() => {
    array = /** @type {V[]} */
    get(each_array);
    var length = array.length;
    let mismatch = false;
    if (hydrating) {
      var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
      if (is_else !== (length === 0)) {
        anchor = skip_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    for (var index2 = 0; index2 < length; index2 += 1) {
      if (hydrating && hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
      hydrate_node.data === HYDRATION_END) {
        anchor = /** @type {Comment} */
        hydrate_node;
        mismatch = true;
        set_hydrating(false);
      }
      var value = array[index2];
      var key = get_key(value, index2);
      var item = first_run ? null : items.get(key);
      if (item) {
        if (item.v) internal_set(item.v, value);
        if (item.i) internal_set(item.i, index2);
        if (defer) {
          batch.skipped_effects.delete(item.e);
        }
      } else {
        item = create_item(
          items,
          first_run ? anchor : offscreen_anchor ?? (offscreen_anchor = create_text()),
          value,
          key,
          index2,
          render_fn,
          flags,
          get_collection
        );
        if (!first_run) {
          item.e.f |= EFFECT_OFFSCREEN;
        }
        items.set(key, item);
      }
      keys.add(key);
    }
    if (length === 0 && fallback_fn && !fallback) {
      if (first_run) {
        fallback = branch(() => fallback_fn(anchor));
      } else {
        fallback = branch(() => fallback_fn(offscreen_anchor ?? (offscreen_anchor = create_text())));
        fallback.f |= EFFECT_OFFSCREEN;
      }
    }
    if (hydrating && length > 0) {
      set_hydrate_node(skip_nodes());
    }
    if (!first_run) {
      if (defer) {
        for (const [key2, item2] of items) {
          if (!keys.has(key2)) {
            batch.skipped_effects.add(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(() => {
        });
      } else {
        commit();
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get(each_array);
  });
  var state = { effect, items, outrogroups: null, fallback };
  first_run = false;
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function skip_to_branch(effect) {
  while (effect !== null && (effect.f & BRANCH_EFFECT) === 0) {
    effect = effect.next;
  }
  return effect;
}
function reconcile(state, array, anchor, flags, get_key) {
  var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state.items;
  var current = skip_to_branch(state.effect.first);
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var effect;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      effect = /** @type {EachItem} */
      items.get(key).e;
      if ((effect.f & EFFECT_OFFSCREEN) === 0) {
        effect.nodes?.a?.measure();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(effect);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    effect = /** @type {EachItem} */
    items.get(key).e;
    if (state.outrogroups !== null) {
      for (const group of state.outrogroups) {
        group.pending.delete(effect);
        group.done.delete(effect);
      }
    }
    if ((effect.f & EFFECT_OFFSCREEN) !== 0) {
      effect.f ^= EFFECT_OFFSCREEN;
      if (effect === current) {
        move(effect, null, anchor);
      } else {
        var next = prev ? prev.next : current;
        if (effect === state.effect.last) {
          state.effect.last = effect.prev;
        }
        if (effect.prev) effect.prev.next = effect.next;
        if (effect.next) effect.next.prev = effect.prev;
        link(state, prev, effect);
        link(state, effect, next);
        move(effect, next, anchor);
        prev = effect;
        matched = [];
        stashed = [];
        current = skip_to_branch(prev.next);
        continue;
      }
    }
    if ((effect.f & INERT) !== 0) {
      resume_effect(effect);
      if (is_animated) {
        effect.nodes?.a?.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(effect);
      }
    }
    if (effect !== current) {
      if (seen !== void 0 && seen.has(effect)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state, a.prev, b.next);
          link(state, prev, a);
          link(state, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(effect);
          move(effect, current, anchor);
          link(state, effect.prev, effect.next);
          link(state, effect, prev === null ? state.effect.first : prev.next);
          link(state, prev, effect);
          prev = effect;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current !== effect) {
        (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
        stashed.push(current);
        current = skip_to_branch(current.next);
      }
      if (current === null) {
        continue;
      }
    }
    if ((effect.f & EFFECT_OFFSCREEN) === 0) {
      matched.push(effect);
    }
    prev = effect;
    current = skip_to_branch(effect.next);
  }
  if (state.outrogroups !== null) {
    for (const group of state.outrogroups) {
      if (group.pending.size === 0) {
        destroy_effects(array_from(group.done));
        state.outrogroups?.delete(group);
      }
    }
    if (state.outrogroups.size === 0) {
      state.outrogroups = null;
    }
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = [];
    if (seen !== void 0) {
      for (effect of seen) {
        if ((effect.f & INERT) === 0) {
          to_destroy.push(effect);
        }
      }
    }
    while (current !== null) {
      if ((current.f & INERT) === 0 && current !== state.fallback) {
        to_destroy.push(current);
      }
      current = skip_to_branch(current.next);
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.fix();
        }
      }
      pause_effects(state, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      if (to_animate === void 0) return;
      for (effect of to_animate) {
        effect.nodes?.a?.apply();
      }
    });
  }
}
function create_item(items, anchor, value, key, index2, render_fn, flags, get_collection) {
  var v = (flags & EACH_ITEM_REACTIVE) !== 0 ? (flags & EACH_ITEM_IMMUTABLE) === 0 ? mutable_source(value, false, false) : source(value) : null;
  var i = (flags & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
  return {
    v,
    i,
    e: branch(() => {
      render_fn(anchor, v ?? value, i ?? index2, get_collection);
      return () => {
        items.delete(key);
      };
    })
  };
}
function move(effect, next, anchor) {
  if (!effect.nodes) return;
  var node = effect.nodes.start;
  var end = effect.nodes.end;
  var dest = next && (next.f & EFFECT_OFFSCREEN) === 0 ? (
    /** @type {EffectNodes} */
    next.nodes.start
  ) : anchor;
  while (node !== null) {
    var next_node = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    dest.before(node);
    if (node === end) {
      return;
    }
    node = next_node;
  }
}
function link(state, prev, next) {
  if (prev === null) {
    state.effect.first = next;
  } else {
    prev.next = next;
  }
  if (next === null) {
    state.effect.last = prev;
  } else {
    next.prev = prev;
  }
}
export {
  each as e,
  index as i
};
//# sourceMappingURL=each.js.map
