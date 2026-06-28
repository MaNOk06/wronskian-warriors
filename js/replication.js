/* replication.js - small per-case displacement charts for the side-by-side
   comparison with the paper's figures. Same RK4 engine, one case each. */
(function () {
  "use strict";
  if (!window.MSD || !window.Plot) return;
  var m = 1, k = 16, T = 20, dt = 0.01;
  var cases = [
    { id: "repl-c0",  c: 0,  color: "#BC5B3C" },
    { id: "repl-c2",  c: 2,  color: "#C2913B" },
    { id: "repl-c8",  c: 8,  color: "#6E7E5E" },
    { id: "repl-c10", c: 10, color: "#4F6D7A" }
  ];

  cases.forEach(function (o) {
    var el = document.getElementById(o.id);
    if (!el) return;
    var chart = new window.Plot.Chart(el, { xlabel: "time  t  (s)", ylabel: "displacement  y(t)", aspect: 0.6, legend: false });
    var sol = window.MSD.integrate(window.MSD.freeMSD(m, o.c, k), [1, 0], 0, T, dt);
    chart.setData([{ color: o.color, width: 2.6, pts: sol.y.map(function (r, i) { return [sol.t[i], r[0]]; }) }],
                  [0, T], [-1.05, 1.05]);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { chart.animate(1000); io.unobserve(e.target); } });
      }, { threshold: 0.25 });
      io.observe(el);
    } else { chart.draw(1); }
  });
})();
