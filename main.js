// Tabs: show one section at a time; the URL hash (#publications, …) keeps links shareable.
(function () {
  var tabs = document.querySelectorAll('.tabs a');
  var panels = document.querySelectorAll('.panel');

  function show(id) {
    if (!document.getElementById(id) || !document.getElementById(id).classList.contains('panel')) id = 'about';
    panels.forEach(function (p) { p.classList.toggle('active', p.id === id); });
    tabs.forEach(function (t) { t.classList.toggle('active', t.dataset.tab === id); });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      history.replaceState(null, '', '#' + t.dataset.tab);
      show(t.dataset.tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
  show(location.hash.slice(1));
})();

// Publication filters
(function () {
  var chips = document.querySelectorAll('.chip');
  var pubs = document.querySelectorAll('.pub');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.dataset.filter;
      pubs.forEach(function (p) {
        var show = f === 'all' || p.dataset.tags.split(' ').indexOf(f) !== -1;
        p.classList.toggle('hidden', !show);
      });
    });
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
