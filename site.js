// Shared script for every page: mobile menu + home-page photo slideshow.
(function () {
  var es = document.documentElement.lang === 'es';

  // Mobile menu (the three-lines button)
  var btn = document.querySelector('.menu-btn');
  var links = document.getElementById('nav-links');
  if (btn && links) {
    function setOpen(open) {
      links.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? (es ? 'Cerrar menú' : 'Close menu') : (es ? 'Abrir menú' : 'Open menu'));
    }
    btn.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', function (e) { if (!e.target.closest('header')) setOpen(false); });
  }

  // Hero slideshow with pause button (home pages only)
  var imgs = document.querySelectorAll('.slides img');
  var pause = document.querySelector('.pause');
  if (imgs.length && pause) {
    var i = 0, timer = null;
    var L = es ? ['Pausar presentación', 'Reproducir presentación'] : ['Pause slideshow', 'Play slideshow'];
    function next() { imgs[i].classList.remove('on'); i = (i + 1) % imgs.length; imgs[i].classList.add('on'); }
    function play() { timer = setInterval(next, 6000); pause.textContent = '❚❚'; pause.setAttribute('aria-label', L[0]); }
    function stop() { clearInterval(timer); timer = null; pause.textContent = '▶'; pause.setAttribute('aria-label', L[1]); }
    pause.addEventListener('click', function () { timer ? stop() : play(); });
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? stop() : play();
  }
})();
