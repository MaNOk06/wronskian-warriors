/* sensitivity.js - two independent live simulators built from one factory:
   one fixed to the time response, one fixed to the phase plane. Each has its
   own sliders, readouts, sweep and reset. No view toggle. */
(function () {
  "use strict";
  if (!window.MSD || !window.Plot) return;

  function shade(c) {
    var ramp = ["#E8C9B6", "#E0B79C", "#D6A079", "#B79A6E", "#94A07E", "#6E7E5E", "#4F6D7A"];
    return ramp[Math.min(ramp.length - 1, Math.round(c / 10 * (ramp.length - 1)))];
  }

  function initLab(cfg) {
    var canvas = document.getElementById(cfg.prefix + "canvas");
    if (!canvas) return;
    var T = 20, dt = 0.01, sweep = false, isTime = cfg.view === "time";
    var chart = new window.Plot.Chart(canvas, isTime
      ? { xlabel: "time  t  (s)", ylabel: "displacement  y(t)", aspect: 0.56, legend: false }
      : { xlabel: "displacement  y", ylabel: "velocity  y'", aspect: 0.62, equalAspect: true, legend: false });

    var names = ["m", "c", "k", "y0", "v0"];
    function el(id) { return document.getElementById(cfg.prefix + id); }
    function get(n) { return parseFloat(el(n).value); }
    function setVal(n, v) { var e = el("v-" + n); if (e) e.textContent = v.toFixed(n === "c" ? 2 : 1); }

    function update(animate) {
      var m = get("m"), c = get("c"), k = get("k"), y0 = get("y0"), v0 = get("v0");
      names.forEach(function (n) { setVal(n, get(n)); });

      var d = window.MSD.describe(m, c, k);
      var pill = el("regime"); if (pill) { pill.textContent = d.regime; pill.style.background = d.color; }
      if (el("zeta")) el("zeta").textContent = d.zeta.toFixed(3);
      if (el("w0")) el("w0").textContent = d.w0.toFixed(2);
      if (el("wd")) el("wd").textContent = d.wd > 0 ? d.wd.toFixed(2) : "\u2014";
      if (el("ccrit")) el("ccrit").textContent = d.cCrit.toFixed(2);

      var sol = window.MSD.integrate(window.MSD.freeMSD(m, c, k), [y0, v0], 0, T, dt);
      var series = [];

      if (isTime) {
        if (sweep) [0, 1, 2, 4, 6, 8, 10].forEach(function (cc) {
          var s = window.MSD.integrate(window.MSD.freeMSD(m, cc, k), [y0, v0], 0, T, dt);
          series.push({ color: shade(cc), width: 1.5, pts: s.y.map(function (r, i) { return [s.t[i], r[0]]; }) });
        });
        series.push({ color: d.color, width: 2.6, pts: sol.y.map(function (r, i) { return [sol.t[i], r[0]]; }) });
        var ymax = Math.max(1, Math.abs(y0), Math.abs(v0) / d.w0) * 1.12;
        chart.setData(series, [0, T], [-ymax, ymax]);
      } else {
        if (sweep) [0, 2, 4, 6, 8, 10].forEach(function (cc) {
          var s = window.MSD.integrate(window.MSD.freeMSD(m, cc, k), [y0, v0], 0, T, dt);
          series.push({ color: shade(cc), width: 1.4, pts: s.y.map(function (r) { return [r[0], r[1]]; }) });
        });
        series.push({ color: d.color, width: 2.4, pts: sol.y.map(function (r) { return [r[0], r[1]]; }) });
        chart.setData(series);
      }
      animate ? chart.animate(700) : chart.draw(1);
    }

    names.forEach(function (n) { el(n).addEventListener("input", function () { update(false); }); });
    var sw = el("sweep"); if (sw) sw.addEventListener("change", function () { sweep = sw.checked; update(true); });
    var rb = el("reset"); if (rb) rb.addEventListener("click", function () {
      var def = { m: 1, c: 2, k: 16, y0: 1, v0: 0 };
      names.forEach(function (n) { el(n).value = def[n]; });
      sweep = false; if (sw) sw.checked = false; update(true);
    });
    update(true);
  }

  initLab({ prefix: "lt-", view: "time" });
  initLab({ prefix: "lp-", view: "phase" });
})();
