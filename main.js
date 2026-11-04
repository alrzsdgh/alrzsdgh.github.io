var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Navbar: turns solid after leaving the hero; mobile menu toggle; back-to-top button
(function () {
  var nav = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('solid', window.scrollY > 60);
    toTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });
})();

// Highlight the nav link of the section on screen
(function () {
  if (!('IntersectionObserver' in window)) return;
  var links = document.querySelectorAll('.nav-links a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) {
    if (document.querySelector('.nav-links a[href="#' + s.id + '"]')) spy.observe(s);
  });
})();

// Typing headline in the hero
(function () {
  var el = document.getElementById('typed');
  var words = ['a Ph.D. Researcher', 'into Causal AI', 'building Medical AI', 'an ML Engineer'];
  if (reduceMotion) return;
  var w = 0, i = words[0].length, deleting = true;
  function tick() {
    var word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    var delay = deleting ? 45 : 95;
    if (!deleting && i === word.length) { deleting = true; delay = 1800; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 2200);
})();

// Hero background: a slowly drifting graph of nodes and edges (a nod to causal graphs)
(function () {
  var canvas = document.getElementById('graph');
  var ctx = canvas.getContext('2d');
  var nodes = [], W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(70, W * H / 18000));
    nodes = [];
    for (var k = 0; k < n; k++) {
      nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var a = 0; a < nodes.length; a++) {
      var p = nodes[a];
      for (var b = a + 1; b < nodes.length; b++) {
        var q = nodes[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.14 * (1 - d / 140)) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    ctx.fillStyle = 'rgba(255,255,255,.45)';
    nodes.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill(); });
  }

  function step() {
    nodes.forEach(function (p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    draw();
    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  if (reduceMotion) draw(); else requestAnimationFrame(step);
})();

// Publication filters
(function () {
  var buttons = document.querySelectorAll('.filter');
  var pubs = document.querySelectorAll('.pub');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      pubs.forEach(function (p) {
        p.classList.toggle('hidden', f !== 'all' && p.dataset.tags.split(' ').indexOf(f) === -1);
      });
    });
  });
})();

// News slider
(function () {
  var slides = document.querySelectorAll('.slide');
  var dots = document.getElementById('dots');
  var cur = 0, timer;
  slides.forEach(function (_, k) {
    var d = document.createElement('button');
    d.setAttribute('aria-label', 'News item ' + (k + 1));
    d.addEventListener('click', function () { go(k); });
    dots.appendChild(d);
  });
  function go(k) {
    cur = (k + slides.length) % slides.length;
    slides.forEach(function (s, j) { s.classList.toggle('active', j === cur); });
    dots.querySelectorAll('button').forEach(function (d, j) { d.classList.toggle('active', j === cur); });
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(function () { go(cur + 1); }, 7000);
  }
  document.getElementById('prev').addEventListener('click', function () { go(cur - 1); });
  document.getElementById('next').addEventListener('click', function () { go(cur + 1); });
  go(0);
})();

// Count-up numbers when the counters scroll into view
(function () {
  var nums = document.querySelectorAll('[data-count]');
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var el = e.target, target = +el.dataset.count, start = null;
      function frame(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.6 });
  nums.forEach(function (n) { io.observe(n); });
})();

document.getElementById('year').textContent = new Date().getFullYear();
