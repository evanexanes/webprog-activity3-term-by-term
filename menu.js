/*
Program name: menu.js
Description: Phone menu for Term by Term. Below 40em the hamburger opens a side
   drawer that traps focus and closes on Escape, the close button, the dimmed page
   or any link, then returns focus to the hamburger. Without the script the header
   links stay visible.
Author: Exanes, Evan Prens
Date Compiled: 11/08/2026
======================================================================
Date           Description                      Programmer name
======================================================================
11/08/2026     Initial Implementation           EPPE
11/09/2026     Added header and comment         EPPE with Claude
11/09/2026     Added function comments          EPPE with Claude
======================================================================
*/

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
  /* Pending timer that hides the drawer after its slide-out. Cleared if the menu reopens first. */
  var hideTimer = null;

  /* True while the drawer is open. aria-expanded on the button is the single source of truth. */
  function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

  /* Links and buttons inside the drawer that can take focus, for the Tab trap. Hidden ones are skipped. */
  function focusables() {
    var all = drawer.querySelectorAll('a[href], button:not([disabled])');
    var out = [];
    for (var i = 0; i < all.length; i++) {
      if (all[i].getClientRects().length) { out.push(all[i]); }
    }
    return out;
  }

  /* Shows the drawer and the dimmed page, then moves focus to the first link. */
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

  /* Starts the slide-out and hides the drawer when it ends. returnFocus sends focus back to the hamburger button. */
  function close(returnFocus) {
    if (!isOpen()) { return; }
    drawer.classList.remove('is-open');
    shade.classList.remove('is-open');
    root.classList.remove('drawer-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    /* 260 ms matches the slide transition in style.css. The drawer is hidden once it ends. */
    hideTimer = setTimeout(function () { drawer.hidden = true; shade.hidden = true; },
                           reduce.matches ? 0 : 260);
    if (returnFocus) { toggle.focus(); }
  }

  /* The hamburger button opens the drawer, or closes it if it is already open. */
  toggle.addEventListener('click', function () {
    if (isOpen()) { close(true); } else { open(); }
  });
  /* Clicking the dimmed page closes the drawer. */
  shade.addEventListener('click', function () { close(true); });
  /* The close button and any link inside the drawer close it. */
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-drawer-close]')) { close(true); return; }
    var link = e.target.closest('a[href]');
    /* A link on this page (Contact on About) keeps the focus the browser gives its target. */
    if (link) { close(link.getAttribute('href').indexOf('#') < 0); }
  });

  /* While the drawer is open, Escape closes it and Tab cycles inside it. */
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
