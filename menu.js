/* Term by Term: the phone menu.
   Below 40em the hamburger opens a side drawer with the four links. Focus moves into the
   drawer and stays there; Escape, the close button, the dimmed page and any link close it,
   and focus goes back to the hamburger. Without this script the links stay in the header. */
(function () {
  'use strict';

  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('site-drawer');
  var shade = document.getElementById('drawer-shade');
  if (!toggle || !drawer || !shade) { return; }
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hideTimer = null;

  function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

  function focusables() {
    var all = drawer.querySelectorAll('a[href], button:not([disabled])');
    var out = [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].getClientRects().length) { out.push(all[i]); }
    }
    return out;
  }

  function open() {
    clearTimeout(hideTimer);
    drawer.hidden = false;
    shade.hidden = false;
    root.classList.add('drawer-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    void drawer.offsetWidth;            /* paint the shown frame first so the slide-in runs */
    drawer.classList.add('is-open');
    shade.classList.add('is-open');
    var first = drawer.querySelector('.drawer-nav a');
    if (first) { first.focus(); }
  }

  function close(returnFocus) {
    if (!isOpen()) { return; }
    drawer.classList.remove('is-open');
    shade.classList.remove('is-open');
    root.classList.remove('drawer-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    hideTimer = setTimeout(function () { drawer.hidden = true; shade.hidden = true; },
                           reduce.matches ? 0 : 260);
    if (returnFocus) { toggle.focus(); }
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) { close(true); } else { open(); }
  });
  shade.addEventListener('click', function () { close(true); });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-drawer-close]')) { close(true); return; }
    var link = e.target.closest('a[href]');
    /* A link on this page (Contact on About) keeps the focus the browser gives its target. */
    if (link) { close(link.getAttribute('href').indexOf('#') < 0); }
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) { return; }
    if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
    if (e.key !== 'Tab') { return; }
    var f = focusables();
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (!drawer.contains(document.activeElement)) {
      e.preventDefault(); (e.shiftKey ? last : first).focus(); return;
    }
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* Widening the window to the desktop layout closes the drawer. */
  var wide = window.matchMedia('(min-width: 40em)');
  var onChange = function (e) { if (e.matches) { close(false); } };
  if (wide.addEventListener) { wide.addEventListener('change', onChange); }
  else if (wide.addListener) { wide.addListener(onChange); }
})();
