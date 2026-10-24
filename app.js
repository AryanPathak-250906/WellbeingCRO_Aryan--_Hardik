/* ==========================================================================
   Korean Marine Collagen Peptides: CRO concept prototype
   Plain JavaScript, no dependencies. All commerce actions are SIMULATED.
   ========================================================================== */
(function () {
  "use strict";

  // ---------- Product data (observed on the live page, 21 Oct 2026) ----------
  var SERVINGS_PER_JAR = 25;
  var PLANS = {
    1: { jars: 1, days: 25,  price: 1439, mrp: 1799, sku: "WBNCL",   img: "assets/jar-front.jpg", thumb: "assets/jar-front-thumb.jpg",
         note: "1 jar lasts about 3½ weeks. That's enough to try it, but short of the 3–4 months on the label." },
    2: { jars: 2, days: 50,  price: 2878, mrp: 3598, sku: "WBNCL-2", img: "assets/pack-2.jpg", thumb: "assets/pack-2-thumb.jpg",
         note: "2 jars last about 7 weeks, still short of the 3–4 months on the label." },
    3: { jars: 3, days: 75,  price: 4318, mrp: 5397, sku: "WBNCL-3", img: "assets/pack-3.jpg", thumb: "assets/pack-3-thumb.jpg",
         note: "3 jars last about 11 weeks (2½ months)." },
    4: { jars: 4, days: 100, price: 5757, mrp: 7196, sku: "WBNCL-4", img: "assets/pack-4.jpg", thumb: "assets/pack-4-thumb.jpg",
         note: "4 jars last 100 days (about 3⅓ months), which falls within the label's 3–4 month guidance." }
  };
  var FREE_SHIPPING_MIN = 499;

  // 30 most recent reviews on the live page (sorted "Most Recent"), sampled 21 Oct 2026.
  // Empty t/b = the review had no written text (the live page shows the product name instead).
  var REVIEWS = [
    {"d": "2026-01-29", "s": 5, "v": false, "t": "No fishy Taste", "b": "By far the best marine collagen I have tasted", "tags": ["taste"]},
    {"d": "2025-12-16", "s": 4, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-12-15", "s": 4, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-12-08", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-11-15", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-08-30", "s": 4, "v": true, "t": "", "b": "I'm unable to notice any changes, but my friend n my parents are able to notice the change in my skin health", "tags": ["results"]},
    {"d": "2025-08-23", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-08-16", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-08-10", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-08-05", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-08-01", "s": 3, "v": false, "t": "No result", "b": "No recommended no result", "tags": ["results", "problem"]},
    {"d": "2025-07-28", "s": 5, "v": true, "t": "Good One", "b": "Good product", "tags": []},
    {"d": "2025-07-24", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-07-23", "s": 5, "v": false, "t": "box was not full of powder but was half", "b": "I’m happy with marine collagen , but little unsatisfied because inside box they to fill half powders not only little bit half box was empty", "tags": ["problem"]},
    {"d": "2025-07-18", "s": 5, "v": true, "t": "Love the collagen, hate the Delivary and customer support", "b": "Very happy with your product but extremally unhappy with the Delivary that has been delayed every single time and your customer support is ZERO help. Even your AI is infuriating. Maybe improve your backend also for the customers to have a better experience.", "tags": ["delivery", "problem"]},
    {"d": "2025-07-09", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-06-21", "s": 5, "v": true, "t": "", "b": "A good Product. Thanks❤🌹🙏", "tags": []},
    {"d": "2025-06-19", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-06-10", "s": 5, "v": true, "t": "Best collagen", "b": "This collagen really works on the entire body just not the face. It makes the skin real smooth. It definitely worked for me as I have been taking it for almost an year now.", "tags": ["results"]},
    {"d": "2025-06-04", "s": 5, "v": true, "t": "The Best", "b": "Korean collagen has shown results in 3 weeks, I am so glad that Shubham gave me choice to decide. Thank you so much. Please keep the quality", "tags": ["results"]},
    {"d": "2025-06-01", "s": 5, "v": true, "t": "WORST", "b": "worst fishy smell and taste, can't even smell or drink", "tags": ["taste", "problem"]},
    {"d": "2025-05-15", "s": 5, "v": false, "t": "Quick Delivery", "b": "After watching lots of videos and reviews decided to give this brand a try. Delivery is super quick. Ordered yesterday and got it today afternoon, not even 24hrs taken. Let’s see how the product will give result. Will update after 6 months.", "tags": ["delivery"]},
    {"d": "2025-05-02", "s": 5, "v": true, "t": "Good", "b": "Good", "tags": []},
    {"d": "2025-04-21", "s": 5, "v": true, "t": "Visible changes in skin", "b": "Very happy after taking 3 jars of collagen", "tags": ["results"]},
    {"d": "2025-04-17", "s": 5, "v": true, "t": "", "b": "I haven’t received my order pls look and deliver soon", "tags": ["delivery", "problem"]},
    {"d": "2025-04-14", "s": 5, "v": true, "t": "Never received the product", "b": "Hence no review to share", "tags": ["delivery", "problem"]},
    {"d": "2025-04-11", "s": 4, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-04-08", "s": 4, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-04-07", "s": 5, "v": true, "t": "", "b": "", "tags": []},
    {"d": "2025-04-04", "s": 5, "v": true, "t": "", "b": "", "tags": []}

  ];

  // ---------- Helpers ----------
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var inr = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var perServing = function (p) { return "₹" + (p.price / (p.jars * SERVINGS_PER_JAR)).toFixed(1); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); };

  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
  }

  // ---------- State ----------
  var state = { plan: 1, cart: [] }; // cart: [{plan, qty}]

  // ---------- Gallery ----------
  var mainImg = $("#mainImage");
  function setMainImage(src, alt) {
    mainImg.src = src;
    mainImg.alt = alt;
  }
  $$(".thumb").forEach(function (btn, i, all) {
    btn.addEventListener("click", function () {
      all.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      setMainImage(btn.dataset.src, btn.dataset.alt);
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var next = all[(i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
      next.focus();
      next.click();
    });
  });

  // ---------- Plan selector (I1) ----------
  function renderPlan() {
    var p = PLANS[state.plan];
    $("#price").textContent = inr(p.price);
    $("#mrp").textContent = inr(p.mrp);
    $("#ctaPrice").textContent = inr(p.price);
    $("#stickyPrice").textContent = inr(p.price);
    $("#stickyPlan").textContent = p.jars + (p.jars === 1 ? " jar · " : " jars · ") + p.days + " days";
    $(".per-serving").textContent = perServing(p) + " per serving · MRP inclusive of all taxes";
    $("#planNote").textContent = p.note;
    setMainImage(p.img, "Korean Marine Collagen Peptides, " + p.jars + (p.jars === 1 ? " jar" : " jars") + ", unflavoured, 200 g each");
    $$(".thumb").forEach(function (b, i) { b.classList.toggle("is-active", i === 0); b.setAttribute("aria-pressed", i === 0 ? "true" : "false"); });
  }
  $$('input[name="plan"]').forEach(function (r) {
    r.addEventListener("change", function () {
      state.plan = parseInt(r.value, 10);
      renderPlan();
      // analytics hook: GA4 select_item event with sku + days of supply
      track("select_item", { sku: PLANS[state.plan].sku, days: PLANS[state.plan].days });
    });
  });

  // ---------- Analytics stub (logs only; no network) ----------
  function track(name, params) {
    if (window.console && console.info) console.info("[prototype analytics]", name, params || {});
  }
  track("experience_impression", { exp_variant_string: "PROTO-PDP_CRO-V1" });

  // ---------- Cart (simulated) ----------
  function cartCount() { return state.cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return state.cart.reduce(function (n, l) { return n + PLANS[l.plan].price * l.qty; }, 0); }

  function addToCart() {
    var line = state.cart.filter(function (l) { return l.plan === state.plan; })[0];
    if (line) line.qty += 1; else state.cart.push({ plan: state.plan, qty: 1 });
    var p = PLANS[state.plan];
    track("add_to_cart", { sku: p.sku, value: p.price, currency: "INR" });
    state.lastAdded = "Added " + p.jars + (p.jars === 1 ? " jar" : " jars") + " (" + p.days + " days) to your cart.";
    openCart();
  }
  $("#addToCart").addEventListener("click", addToCart);
  $("#stickyAdd").addEventListener("click", addToCart);

  function renderCart() {
    var n = cartCount();
    $("#cartCount").textContent = n;
    $("#cartCount").setAttribute("aria-label", n + (n === 1 ? " item" : " items") + " in cart");
    var body = $("#cartBody"), foot = $("#cartFoot");
    if (!state.cart.length) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      foot.innerHTML = "";
      return;
    }
    var added = state.lastAdded ? '<p class="added-msg" role="status">' + esc(state.lastAdded) + "</p>" : "";
    state.lastAdded = "";
    body.innerHTML = added + state.cart.map(function (l, idx) {
      var p = PLANS[l.plan];
      return '<div class="line">' +
        '<img src="' + p.thumb + '" width="64" height="64" alt="">' +
        '<div>' +
          '<p class="line-title">Korean Marine Collagen Peptides, ' + p.jars + (p.jars === 1 ? " jar" : " jars") + '</p>' +
          '<p class="line-meta">' + p.days + ' days of supply · ' + perServing(p) + ' per serving</p>' +
          '<div class="line-row">' +
            '<div class="qty" role="group" aria-label="Quantity">' +
              '<button type="button" data-act="dec" data-i="' + idx + '" aria-label="Decrease quantity">−</button>' +
              '<output aria-live="polite">' + l.qty + '</output>' +
              '<button type="button" data-act="inc" data-i="' + idx + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<span class="line-price">' + inr(p.price * l.qty) + '</span>' +
          '</div>' +
          '<button type="button" class="text-link remove" data-act="rm" data-i="' + idx + '">Remove</button>' +
        '</div>' +
      '</div>';
    }).join("");
    var total = cartTotal();
    var ship = total >= FREE_SHIPPING_MIN ? 0 : 50;
    foot.innerHTML =
      '<div class="sum-row"><span>Subtotal</span><span>' + inr(total) + '</span></div>' +
      '<div class="sum-row"><span>Delivery</span><span>' + (ship ? inr(ship) : "Free") + '</span></div>' +
      '<div class="sum-row total"><span>Total</span><span>' + inr(total + ship) + '</span></div>' +
      '<p class="sum-note">Extra 5% off if you pay online, applied at checkout. Cash on delivery depends on your pincode.</p>' +
      '<button type="button" class="btn btn-primary" id="checkoutBtn">Continue to checkout</button>' +
      '<p class="sim-msg" id="simMsg" hidden></p>';
    $("#checkoutBtn").addEventListener("click", function () {
      track("begin_checkout", { value: total, currency: "INR" });
      var m = $("#simMsg");
      m.hidden = false;
      m.textContent = "Prototype: checkout is simulated. No order has been placed and no payment was taken. In production, this button would hand the cart to the store's existing checkout.";
      m.focus && m.setAttribute("tabindex", "-1");
      m.focus();
    });
  }
  $("#cartBody").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-act]");
    if (!b) return;
    var i = parseInt(b.dataset.i, 10), l = state.cart[i];
    if (b.dataset.act === "inc") l.qty += 1;
    if (b.dataset.act === "dec") l.qty = Math.max(0, l.qty - 1);
    if (b.dataset.act === "rm" || l.qty === 0) state.cart.splice(i, 1);
    renderCart();
    var focusTarget = $('#cartBody button[data-act="' + b.dataset.act + '"][data-i="' + i + '"]') || $("#cartClose");
    focusTarget.focus();
  });

  // ---------- Dialog management (drawer + modal) ----------
  var lastFocus = null;
  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    var f = $$('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])', container).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openCart() {
    lastFocus = document.activeElement;
    renderCart();
    $("#scrim").hidden = false;
    $("#cartDrawer").hidden = false;
    $("#cartClose").focus();
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    $("#scrim").hidden = true;
    $("#cartDrawer").hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#scrim").addEventListener("click", closeCart);
  $("#cartDrawer").addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); trapFocus($("#cartDrawer"), e); });

  function openModal(title, html) {
    lastFocus = document.activeElement;
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = html;
    $("#modal").hidden = false;
    $("#modalClose").focus();
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    $("#modal").hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", function (e) { if (e.target.id === "modal") closeModal(); });
  $("#modal").addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); trapFocus($("#modal"), e); });

  $("#labelOpen").addEventListener("click", function () {
    openModal("Back label",
      '<img src="assets/label-back.jpg" width="900" height="900" alt="Back label of the jar showing usage, allergen information and caution text">' +
      "<ul>" +
      "<li><strong>Recommended usage:</strong> 1 level scoop (about 8 g) per day.</li>" +
      "<li><strong>Duration of use:</strong> daily for a minimum of 3–4 months to see visible results.</li>" +
      "<li><strong>Allergen information:</strong> contains fish derivatives. Made in a facility that also processes milk, nuts and soy.</li>" +
      "<li><strong>Caution:</strong> not intended for pregnant or lactating women or anyone undergoing medical treatment. For adult use only.</li>" +
      "</ul>");
  });
  $("#policyOpen").addEventListener("click", function () {
    openModal("Delivery and returns (summary)",
      "<ul>" +
      "<li>Most orders are dispatched within 2 business days (excluding Sundays and public holidays).</li>" +
      "<li>Estimated delivery: 5–8 days from order confirmation.</li>" +
      "<li>Free shipping on orders of ₹499 and above. Below that, shipping costs ₹50.</li>" +
      "<li>Orders can be cancelled only before they are shipped.</li>" +
      "<li>Returns are accepted only for damaged, defective or incorrect products. Report them within 48 hours of receipt, with photos. Used or unsealed products cannot be returned.</li>" +
      "<li>Refunds: online payments within 7 working days, cash-on-delivery orders within 14 working days.</li>" +
      "</ul><p>Summarised from the store's published Orders &amp; Shipping and Refunds &amp; Cancellation pages (observed 21 Oct 2026).</p>");
  });

  // ---------- Pincode delivery estimate (simulated from policy) ----------
  $("#pincodeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("#pincode"), out = $("#pincodeResult");
    var v = input.value.trim();
    out.className = "pincode-result";
    if (!/^[1-9][0-9]{5}$/.test(v)) {
      input.setAttribute("aria-invalid", "true");
      out.classList.add("is-error");
      out.textContent = "Enter a valid 6-digit Indian pincode.";
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    var fmt = { weekday: "short", day: "numeric", month: "short" };
    var a = new Date(), b = new Date();
    a.setDate(a.getDate() + 5); b.setDate(b.getDate() + 8);
    out.classList.add("is-ok");
    out.textContent = "Estimated delivery to " + v + ": " + a.toLocaleDateString("en-IN", fmt) + " – " + b.toLocaleDateString("en-IN", fmt) + " (demo estimate)";
    track("delivery_estimate_check", { pincode_prefix: v.slice(0, 2) });
  });
  $("#pincode").addEventListener("input", function (e) { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6); });

  // ---------- Reviews (I4) ----------
  var filter = "text";
  function stars(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }
  function renderReviews() {
    var list = REVIEWS.filter(function (r) {
      if (filter === "all") return true;
      if (filter === "text") return !!r.b;
      if (filter === "critical") return r.s <= 3 || r.tags.indexOf("problem") > -1;
      return r.tags.indexOf(filter) > -1;
    });
    var labels = { text: "with written text", critical: "that are critical or report a problem", results: "mentioning results", delivery: "mentioning delivery", taste: "mentioning taste or smell", all: "in the sample, including those without text" };
    $("#revStatus").textContent = "Showing " + list.length + " of the 30 most recent reviews " + labels[filter] + ".";
    $("#revList").innerHTML = list.map(function (r) {
      var mismatch = r.s === 5 && r.tags.indexOf("problem") > -1;
      var date = new Date(r.d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      return '<li class="rev' + (r.b ? "" : " rev--empty") + '">' +
        '<div class="rev-head"><span class="rev-stars" aria-label="' + r.s + ' out of 5 stars">' + stars(r.s) + '</span><span>' + (r.v ? "Verified buyer" : "Reviewer") + " · " + date + "</span></div>" +
        (r.t ? "<h3>" + esc(r.t) + "</h3>" : "") +
        "<p>" + (r.b ? esc(r.b) : "No written review (rating only).") + "</p>" +
        (mismatch ? '<span class="rev-flag">Rating and text disagree. In production this would ask the reviewer to confirm.</span>' : "") +
      "</li>";
    }).join("");
  }
  $$(".rev-filters .chip").forEach(function (c, i, all) {
    c.addEventListener("click", function () {
      all.forEach(function (x) { x.classList.remove("is-on"); x.setAttribute("aria-pressed", "false"); });
      c.classList.add("is-on");
      c.setAttribute("aria-pressed", "true");
      filter = c.dataset.filter;
      renderReviews();
    });
  });

  // ---------- FAQ accordion ----------
  $$(".accordion h3 button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      document.getElementById(btn.getAttribute("aria-controls")).hidden = open;
    });
  });

  // ---------- Sticky bar: visible once the main CTA scrolls out of view ----------
  var sticky = $("#stickyBar");
  function setSticky(on) {
    sticky.classList.toggle("is-visible", on);
    sticky.setAttribute("aria-hidden", on ? "false" : "true");
    $("#stickyAdd").tabIndex = on ? 0 : -1;
  }
  if ("IntersectionObserver" in window) {
    var cta = $("#ctaRow");
    var io = new IntersectionObserver(function (entries) {
      var e = entries[0];
      setSticky(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(cta);
  }

  // ---------- Simulated links / newsletter ----------
  $$("[data-sim]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); toast(a.dataset.sim); });
  });
  $("#nlForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = $("#nlEmail").value.trim();
    $("#nlResult").textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? "Prototype: nothing was sent or stored."
      : "Enter a valid email address.";
  });

  // ---------- CRO rationale toggle ----------
  $("#annoToggle").addEventListener("click", function () {
    var on = this.getAttribute("aria-pressed") !== "true";
    this.setAttribute("aria-pressed", String(on));
    this.textContent = on ? "Hide CRO rationale" : "Show CRO rationale";
    $$(".anno").forEach(function (a) { a.hidden = !on; });
  });
  if (/[?&]annotate=1/.test(location.search)) $("#annoToggle").click();

  // ---------- Init ----------
  renderPlan();
  renderCart();
  renderReviews();
})();
