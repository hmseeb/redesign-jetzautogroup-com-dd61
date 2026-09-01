/* =====================================================
   Sacramento Towing Services — interactions
   ===================================================== */
(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile navigation ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  function setActive() {
    var pos = window.scrollY + 140;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= pos) current = sections[i];
    }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections[sections.length - 1];
    }
    navLinks.forEach(function (a) { a.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }
  if (sections.length) {
    setActive();
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
  }

  /* ---------- FAQ accordion ---------- */
  var accItems = Array.prototype.slice.call(document.querySelectorAll('.acc__item'));
  accItems.forEach(function (item) {
    var btn = item.querySelector('.acc__q');
    var panel = item.querySelector('.acc__a');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      accItems.forEach(function (other) {
        var otherPanel = other.querySelector('.acc__a');
        var otherBtn = other.querySelector('.acc__q');
        other.classList.remove('is-open');
        if (otherPanel) otherPanel.style.maxHeight = null;
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  window.addEventListener('resize', function () {
    accItems.forEach(function (item) {
      if (!item.classList.contains('is-open')) return;
      var panel = item.querySelector('.acc__a');
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

  /* Open the first FAQ by default */
  if (accItems.length) {
    var firstBtn = accItems[0].querySelector('.acc__q');
    if (firstBtn) firstBtn.click();
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Gallery lightbox ---------- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbClose = document.getElementById('lb-close');
  var lbPrev = document.getElementById('lb-prev');
  var lbNext = document.getElementById('lb-next');
  var index = 0;
  var lastFocused = null;

  function show(i) {
    if (!shots.length) return;
    index = (i + shots.length) % shots.length;
    var img = shots[index].querySelector('img');
    if (!img || !lbImg) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
  }

  function openLb(i) {
    if (!lb) return;
    lastFocused = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeLb() {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  shots.forEach(function (shot, i) {
    shot.addEventListener('click', function () { openLb(i); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev) lbPrev.addEventListener('click', function () { show(index - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { show(index + 1); });
  if (lb) {
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  }
  document.addEventListener('keydown', function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  /* ---------- Smooth anchor offset for older browsers ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: top, behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', id);
  });
})();
