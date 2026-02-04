import { w as listen_to_event_and_reset_event, x as current_batch, y as effect, z as previous_batch, A as is_array, B as select_multiple_invalid_value, C as is, D as teardown, E as tick, q as hydrating, F as untrack, G as render_effect, c as create_custom_element, p as push, a as append_styles, b as prop, u as user_effect, g as get, s as set, i as if_block, e as append, f as pop, h as state, l as from_html, j as flushSync, m as child, r as reset, k as sibling, t as template_effect, o as set_text, H as remove_input_defaults, n as set_attribute, I as event, v as user_derived } from "./chunks/custom-element.js";
import { e as each, i as index } from "./chunks/each.js";
function select_option(select, value, mounting = false) {
  if (select.multiple) {
    if (value == void 0) {
      return;
    }
    if (!is_array(value)) {
      return select_multiple_invalid_value();
    }
    for (var option of select.options) {
      option.selected = value.includes(get_option_value(option));
    }
    return;
  }
  for (option of select.options) {
    var option_value = get_option_value(option);
    if (is(option_value, value)) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function init_select(select) {
  var observer = new MutationObserver(() => {
    select_option(select, select.__value);
  });
  observer.observe(select, {
    // Listen to option element changes
    childList: true,
    subtree: true,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: true,
    attributeFilter: ["value"]
  });
  teardown(() => {
    observer.disconnect();
  });
}
function bind_select_value(select, get2, set2 = get2) {
  var batches = /* @__PURE__ */ new WeakSet();
  var mounting = true;
  listen_to_event_and_reset_event(select, "change", (is_reset) => {
    var query = is_reset ? "[selected]" : ":checked";
    var value;
    if (select.multiple) {
      value = [].map.call(select.querySelectorAll(query), get_option_value);
    } else {
      var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
      select.querySelector("option:not([disabled])");
      value = selected_option && get_option_value(selected_option);
    }
    set2(value);
    if (current_batch !== null) {
      batches.add(current_batch);
    }
  });
  effect(() => {
    var value = get2();
    if (select === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (batches.has(batch)) {
        return;
      }
    }
    select_option(select, value, mounting);
    if (mounting && value === void 0) {
      var selected_option = select.querySelector(":checked");
      if (selected_option !== null) {
        value = get_option_value(selected_option);
        set2(value);
      }
    }
    select.__value = value;
    mounting = false;
  });
  init_select(select);
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}
function bind_value(input, get2, set2 = get2) {
  var batches = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(input, "input", async (is_reset) => {
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set2(value);
    if (current_batch !== null) {
      batches.add(current_batch);
    }
    await tick();
    if (value !== (value = get2())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var length = input.value.length;
      input.value = value ?? "";
      if (end !== null) {
        var new_length = input.value.length;
        if (start === end && end === length && new_length > length) {
          input.selectionStart = new_length;
          input.selectionEnd = new_length;
        } else {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, new_length);
        }
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get2) == null && input.value
  ) {
    set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    if (current_batch !== null) {
      batches.add(current_batch);
    }
  }
  render_effect(() => {
    var value = get2();
    if (input === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (batches.has(batch)) {
        return;
      }
    }
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}
var root_1 = from_html(`<div class="confirmation-message svelte-77le3i"><div class="confirmation-icon svelte-77le3i">✓</div> <h3 class="svelte-77le3i">Appointment Request Received!</h3> <p> </p> <p class="appointment-details svelte-77le3i"> </p> <p class="confirmation-note svelte-77le3i"> </p></div>`);
var root_3 = from_html(`<p class="description svelte-77le3i"> </p>`);
var root_4 = from_html(`<option> </option>`);
var root_5 = from_html(`<div class="appointment-preview svelte-77le3i"><strong>Your appointment:</strong> <div class="preview-details svelte-77le3i"> </div> <div class="preview-type svelte-77le3i"> </div></div>`);
var root_2 = from_html(`<div class="scheduler-content svelte-77le3i"><h2 class="svelte-77le3i"> </h2> <!> <form><div class="form-group svelte-77le3i"><label for="client-name" class="svelte-77le3i">Full Name *</label> <input id="client-name" type="text" placeholder="John Doe" required class="svelte-77le3i"/></div> <div class="form-group svelte-77le3i"><label for="client-email" class="svelte-77le3i">Email Address *</label> <input id="client-email" type="email" placeholder="john@example.com" required class="svelte-77le3i"/></div> <div class="form-group svelte-77le3i"><label for="appointment-type" class="svelte-77le3i">Appointment Type *</label> <select id="appointment-type" class="svelte-77le3i"><option>Initial Consultation (60 min)</option><option>Follow-up Session (50 min)</option><option>Psychological Evaluation (90 min)</option></select></div> <div class="form-row svelte-77le3i"><div class="form-group svelte-77le3i"><label for="date" class="svelte-77le3i">Preferred Date *</label> <input id="date" type="date" required class="svelte-77le3i"/></div> <div class="form-group svelte-77le3i"><label for="time" class="svelte-77le3i">Preferred Time *</label> <select id="time" required class="svelte-77le3i"><option>Select a time</option><!></select></div></div> <!> <button type="submit" class="submit-btn svelte-77le3i">Request Appointment</button></form></div>`);
var root = from_html(`<div class="appointment-scheduler svelte-77le3i"><!></div>`);
const $$css = {
  hash: "svelte-77le3i",
  code: '.appointment-scheduler.svelte-77le3i {max-width:600px;margin:0 auto;padding:32px;background:white;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);}.scheduler-content.svelte-77le3i h2:where(.svelte-77le3i) {margin:0 0 8px 0;color:#0b6b5a;font-size:24px;}.description.svelte-77le3i {margin:0 0 24px 0;color:#6b6b6b;}.form-group.svelte-77le3i {margin-bottom:20px;}.form-row.svelte-77le3i {display:grid;grid-template-columns:1fr 1fr;gap:16px;}label.svelte-77le3i {display:block;margin-bottom:6px;font-weight:600;color:#202020;font-size:14px;}input[type="text"].svelte-77le3i,\n  input[type="email"].svelte-77le3i,\n  input[type="date"].svelte-77le3i,\n  select.svelte-77le3i {width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:15px;font-family:inherit;transition:border-color 0.2s;}input.svelte-77le3i:focus,\n  select.svelte-77le3i:focus {outline:none;border-color:#0b6b5a;}.appointment-preview.svelte-77le3i {background:#f7f7f7;padding:16px;border-radius:8px;margin-bottom:20px;border-left:4px solid #0b6b5a;}.preview-details.svelte-77le3i {font-size:16px;color:#202020;margin:8px 0;}.preview-type.svelte-77le3i {color:#6b6b6b;font-size:14px;}.submit-btn.svelte-77le3i {width:100%;padding:14px;background:#0b6b5a;color:white;border:none;border-radius:6px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.2s;}.submit-btn.svelte-77le3i:hover:not(:disabled) {background:#085d50;}.submit-btn.svelte-77le3i:disabled {background:#ccc;cursor:not-allowed;}.confirmation-message.svelte-77le3i {text-align:center;padding:40px 20px;}.confirmation-icon.svelte-77le3i {width:80px;height:80px;background:#0b6b5a;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:48px;margin:0 auto 20px;}.confirmation-message.svelte-77le3i h3:where(.svelte-77le3i) {color:#0b6b5a;margin:0 0 16px 0;}.appointment-details.svelte-77le3i {font-size:18px;font-weight:600;color:#202020;margin:16px 0;}.confirmation-note.svelte-77le3i {color:#6b6b6b;font-size:14px;}\n  \n  @media (max-width: 600px) {.appointment-scheduler.svelte-77le3i {padding:20px;}.form-row.svelte-77le3i {grid-template-columns:1fr;}\n  }'
};
function AppointmentScheduler($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css);
  let title = prop($$props, "title", 7, "Schedule an Appointment"), description = prop($$props, "description", 7, "Select your preferred date and time");
  let selectedDate = state("");
  let selectedTime = state("");
  let clientName = state("");
  let clientEmail = state("");
  let appointmentType = state("initial");
  let showConfirmation = state(false);
  let isFormValid = user_derived(() => get(selectedDate) && get(selectedTime) && get(clientName) && get(clientEmail));
  let formattedAppointment = user_derived(() => () => {
    if (!get(selectedDate) || !get(selectedTime)) return "";
    const date = new Date(get(selectedDate));
    return `${date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })} at ${get(selectedTime)}`;
  });
  let appointmentTypeLabel = user_derived(() => () => {
    const types = {
      "initial": "Initial Consultation (60 min)",
      "followup": "Follow-up Session (50 min)",
      "evaluation": "Psychological Evaluation (90 min)"
    };
    return types[get(appointmentType)] || types.initial;
  });
  user_effect(() => {
    if (get(clientName) || get(clientEmail) || get(selectedDate)) {
      const formData = {
        clientName: get(clientName),
        clientEmail: get(clientEmail),
        selectedDate: get(selectedDate),
        selectedTime: get(selectedTime),
        appointmentType: get(appointmentType),
        savedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem("appointmentDraft", JSON.stringify(formData));
    }
  });
  user_effect(() => {
    const saved = localStorage.getItem("appointmentDraft");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        set(clientName, data.clientName || "", true);
        set(clientEmail, data.clientEmail || "", true);
        set(selectedDate, data.selectedDate || "", true);
        set(selectedTime, data.selectedTime || "", true);
        set(appointmentType, data.appointmentType || "initial", true);
      } catch (e) {
        console.log("No saved draft found");
      }
    }
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!get(isFormValid)) return;
    console.log("Appointment request:", {
      clientName: get(clientName),
      clientEmail: get(clientEmail),
      selectedDate: get(selectedDate),
      selectedTime: get(selectedTime),
      appointmentType: get(appointmentType)
    });
    set(showConfirmation, true);
    localStorage.removeItem("appointmentDraft");
    setTimeout(
      () => {
        set(showConfirmation, false);
        resetForm();
      },
      5e3
    );
  }
  function resetForm() {
    set(selectedDate, "");
    set(selectedTime, "");
    set(clientName, "");
    set(clientEmail, "");
    set(appointmentType, "initial");
  }
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM"
  ];
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  var $$exports = {
    get title() {
      return title();
    },
    set title($$value = "Schedule an Appointment") {
      title($$value);
      flushSync();
    },
    get description() {
      return description();
    },
    set description($$value = "Select your preferred date and time") {
      description($$value);
      flushSync();
    }
  };
  var div = root();
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      var div_1 = root_1();
      var p = sibling(child(div_1), 4);
      var text = child(p);
      reset(p);
      var p_1 = sibling(p, 2);
      var text_1 = child(p_1, true);
      reset(p_1);
      var p_2 = sibling(p_1, 2);
      var text_2 = child(p_2);
      reset(p_2);
      reset(div_1);
      template_effect(
        ($0) => {
          set_text(text, `Thank you, ${get(clientName) ?? ""}. We'll confirm your appointment for:`);
          set_text(text_1, $0);
          set_text(text_2, `A confirmation email will be sent to ${get(clientEmail) ?? ""}`);
        },
        [() => get(formattedAppointment)()]
      );
      append($$anchor2, div_1);
    };
    var alternate = ($$anchor2) => {
      var div_2 = root_2();
      var h2 = child(div_2);
      var text_3 = child(h2, true);
      reset(h2);
      var node_1 = sibling(h2, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var p_3 = root_3();
          var text_4 = child(p_3, true);
          reset(p_3);
          template_effect(() => set_text(text_4, description()));
          append($$anchor3, p_3);
        };
        if_block(node_1, ($$render) => {
          if (description()) $$render(consequent_1);
        });
      }
      var form = sibling(node_1, 2);
      var div_3 = child(form);
      var input = sibling(child(div_3), 2);
      remove_input_defaults(input);
      reset(div_3);
      var div_4 = sibling(div_3, 2);
      var input_1 = sibling(child(div_4), 2);
      remove_input_defaults(input_1);
      reset(div_4);
      var div_5 = sibling(div_4, 2);
      var select = sibling(child(div_5), 2);
      var option = child(select);
      option.value = option.__value = "initial";
      var option_1 = sibling(option);
      option_1.value = option_1.__value = "followup";
      var option_2 = sibling(option_1);
      option_2.value = option_2.__value = "evaluation";
      reset(select);
      reset(div_5);
      var div_6 = sibling(div_5, 2);
      var div_7 = child(div_6);
      var input_2 = sibling(child(div_7), 2);
      remove_input_defaults(input_2);
      reset(div_7);
      var div_8 = sibling(div_7, 2);
      var select_1 = sibling(child(div_8), 2);
      var option_3 = child(select_1);
      option_3.value = option_3.__value = "";
      var node_2 = sibling(option_3);
      each(node_2, 17, () => timeSlots, index, ($$anchor3, slot) => {
        var option_4 = root_4();
        var text_5 = child(option_4, true);
        reset(option_4);
        var option_4_value = {};
        template_effect(() => {
          set_text(text_5, get(slot));
          if (option_4_value !== (option_4_value = get(slot))) {
            option_4.value = (option_4.__value = get(slot)) ?? "";
          }
        });
        append($$anchor3, option_4);
      });
      reset(select_1);
      reset(div_8);
      reset(div_6);
      var node_3 = sibling(div_6, 2);
      {
        var consequent_2 = ($$anchor3) => {
          var div_9 = root_5();
          var div_10 = sibling(child(div_9), 2);
          var text_6 = child(div_10, true);
          reset(div_10);
          var div_11 = sibling(div_10, 2);
          var text_7 = child(div_11, true);
          reset(div_11);
          reset(div_9);
          template_effect(
            ($0, $1) => {
              set_text(text_6, $0);
              set_text(text_7, $1);
            },
            [
              () => get(formattedAppointment)(),
              () => get(appointmentTypeLabel)()
            ]
          );
          append($$anchor3, div_9);
        };
        if_block(node_3, ($$render) => {
          if (get(selectedDate) && get(selectedTime)) $$render(consequent_2);
        });
      }
      var button = sibling(node_3, 2);
      reset(form);
      reset(div_2);
      template_effect(() => {
        set_text(text_3, title());
        set_attribute(input_2, "min", today);
        button.disabled = !get(isFormValid);
      });
      event("submit", form, handleSubmit);
      bind_value(input, () => get(clientName), ($$value) => set(clientName, $$value));
      bind_value(input_1, () => get(clientEmail), ($$value) => set(clientEmail, $$value));
      bind_select_value(select, () => get(appointmentType), ($$value) => set(appointmentType, $$value));
      bind_value(input_2, () => get(selectedDate), ($$value) => set(selectedDate, $$value));
      bind_select_value(select_1, () => get(selectedTime), ($$value) => set(selectedTime, $$value));
      append($$anchor2, div_2);
    };
    if_block(node, ($$render) => {
      if (get(showConfirmation)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div);
  append($$anchor, div);
  return pop($$exports);
}
customElements.define("appointment-scheduler", create_custom_element(AppointmentScheduler, { title: {}, description: {} }, [], [], { mode: "open" }));
export {
  AppointmentScheduler as default
};
//# sourceMappingURL=appointment-scheduler.js.map
