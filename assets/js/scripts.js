document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.getElementById('startOverlay');

  const btn = document.getElementById('dropdownBtn');
  const menu = document.getElementById('menu');

  function openMenu() { if(menu && btn){ menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); } }
  function closeMenu() { if(menu && btn){ menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } }
  function toggleMenu() { menu && btn && (menu.classList.contains('open') ? closeMenu() : openMenu()); }

  if (btn) btn.addEventListener('click', e => { e.stopPropagation(); toggleMenu(); });
  document.addEventListener('click', e => { if(menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

  const btnInicio = document.getElementById('btnInicio');
  const btnLinks = document.getElementById('btnLinks');
  const btnContacto = document.getElementById('btnContacto');

  if(btnInicio) btnInicio.addEventListener('click', () => { window.location.href = 'inicio.html'; });
  if(btnLinks) btnLinks.addEventListener('click', () => { window.location.href = 'proyectos.html'; });
  if(btnContacto) btnContacto.addEventListener('click', () => { window.location.href = 'contacto.html'; });

  if(overlay){
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
      tryAutoplay();
    });
  } else {
    tryAutoplay();
  }

});
