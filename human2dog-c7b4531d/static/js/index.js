// Play each video only while it is on screen; the poster shows otherwise.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        var p = v.play();
        if (p && p.catch) p.catch(function () { /* autoplay refused: poster and controls remain */ });
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('video.autoplay-when-visible').forEach(function (v) { io.observe(v); });
})();
