/* ==========================================================================
   TEKUNO · MICROSITIO — LÓGICA DE NAVEGACIÓN, RENDER Y MANO ROBÓTICA
   --------------------------------------------------------------------------
   SPA con ruteo por hash, sin dependencias externas ni build step.
   Rutas:
     #/                                -> Home (categorías)
     #/categoria/<catId>               -> Submenú (módulos de la categoría)
     #/categoria/<catId>/<moduleId>    -> Detalle del módulo (video + fichas)
   ========================================================================== */

const app = document.getElementById("app");
const handEl = document.getElementById("hand");

const ICONS = {
  doc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="6" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="17" cy="12" r="2.4"/><path d="M7 6h6a4 4 0 014 4M7 18h6a4 4 0 004-4"/></svg>',
  team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.5 13.2c2.3.4 4 2.4 4 4.8"/></svg>',
  cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18a4.5 4.5 0 01-.5-8.97A5.5 5.5 0 0117 9a4 4 0 010 8H7z"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6M15 18h6"/></svg>'
};

function icon(name) { return ICONS[name] || ICONS.doc; }
function esc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c])); }

function findCategory(catId) { return TEKUNO_DATA.categories.find(c => c.id === catId); }
function findModule(catId, modId) {
  const cat = findCategory(catId);
  if (!cat) return null;
  const mod = cat.modules.find(m => m.id === modId);
  return mod ? { cat, mod } : null;
}

/* -------------------------------------------------------------------- */
/* Shell: header repetido en cada vista                                  */
/* -------------------------------------------------------------------- */
function headerHTML(backHref, title) {
  const backBtn = backHref ? `<a class="back-btn" href="${backHref}">${icon("back")} Regresar</a>` : "";
  const titleHTML = title ? `<h1 class="page-title">${esc(title)}</h1>` : "";
  return `
  <header class="topbar">
    <a href="#/" class="logo" aria-label="Tekuno — inicio">
      <span class="wordmark">TEKUN<span class="o-dot"></span></span>
    </a>
    <div class="crumb">${backBtn}${titleHTML}</div>
  </header>`;
}

/* -------------------------------------------------------------------- */
/* Vista: Home — grid de categorías                                      */
/* -------------------------------------------------------------------- */
function renderHome() {
  const cards = TEKUNO_DATA.categories.map(cat => `
    <a class="cat-card" href="#/categoria/${cat.id}">
      <span class="cat-ico">${icon(cat.icon)}</span>
      <span class="cat-name">${esc(cat.name)}</span>
      <span class="cat-desc">${esc(cat.desc)}</span>
      ${cat.status === "pendiente" ? '<span class="badge-pending">En desarrollo</span>' : ""}
    </a>`).join("");

  app.innerHTML = `
    ${headerHTML(null, null)}
    <main class="view home-view">
      <section class="hero">
        <div class="hero-text">
          <h1>Tecnología que impulsa resultados</h1>
          <p>Descubre las soluciones de Tekuno para digitalizar, automatizar y optimizar los procesos de tu organización.</p>
        </div>
      </section>
      <section class="cat-grid">${cards}</section>
    </main>`;

  initHandTracking(".cat-grid", ".cat-card");
}

/* -------------------------------------------------------------------- */
/* Vista: Submenú — módulos de una categoría                             */
/* -------------------------------------------------------------------- */
function renderCategory(catId) {
  const cat = findCategory(catId);
  if (!cat) return renderNotFound();

  const cards = cat.modules.map(mod => `
    <a class="mod-card" href="#/categoria/${cat.id}/${mod.id}">
      <span class="mod-ico">${icon(cat.icon)}</span>
      <span class="mod-name">${esc(mod.name)}</span>
      <span class="mod-desc">${esc(mod.desc)}</span>
    </a>`).join("");

  app.innerHTML = `
    ${headerHTML("#/", cat.name)}
    <main class="view submenu-view">
      <section class="mod-grid">${cards}</section>
    </main>`;

  initHandTracking(".mod-grid", ".mod-card");
}

/* -------------------------------------------------------------------- */
/* Vista: Detalle de módulo — video + ficha funcional + ficha técnica    */
/* -------------------------------------------------------------------- */
function renderModule(catId, modId) {
  const found = findModule(catId, modId);
  if (!found) return renderNotFound();
  const { cat, mod } = found;
  const ff = mod.ficha_funcional || {};
  const ft = mod.ficha_tecnica || {};

  const componentesHTML = (ff.componentes && ff.componentes.length)
    ? `<ul class="check-list">${ff.componentes.map(c => `<li><b>${esc(c.titulo)}:</b> ${esc(c.desc)}</li>`).join("")}</ul>`
    : `<p class="muted">Aún no hay componentes documentados para este módulo.</p>`;

  const fichaTecnicaGroup = (label, items) => (items && items.length)
    ? `<div class="ft-group"><span class="ft-label">${label}:</span><span class="ft-value">${items.map(esc).join(", ")}</span></div>`
    : "";

  app.innerHTML = `
    ${headerHTML(`#/categoria/${cat.id}`, mod.name)}
    <main class="view detail-view">
      <section class="video-col">
        <div class="panel-h"><span class="ico-ring">${icon("play")}</span><h3>Video Demo</h3></div>
        ${videoPlayerHTML(mod.video, mod.name)}
      </section>

      <section class="info-col">
        <div class="ficha">
          <div class="panel-h">
            <span class="ico-ring">${icon("doc")}</span><h3>Ficha Funcional</h3>
            ${(ff.componentes && ff.componentes.length) ? `<button class="ver-mas" data-toggle-resumen>Ver más</button>` : ""}
          </div>
          <p class="ficha-resumen" data-resumen>${esc(ff.resumen || "Aún no hay descripción para este módulo.")}</p>
          ${ff.componentes && ff.componentes.length ? `<span class="ficha-sub">Componentes y módulos</span>` : ""}
          ${componentesHTML}
        </div>
        <div class="ficha">
          <div class="panel-h tech"><span class="ico-ring">${icon("code")}</span><h3>Ficha Técnica</h3></div>
          ${fichaTecnicaGroup("Tecnologías", ft.tecnologias)}
          ${fichaTecnicaGroup("Lenguaje", ft.lenguaje)}
          ${fichaTecnicaGroup("Frameworks", ft.frameworks)}
          ${(!ft.tecnologias?.length && !ft.lenguaje?.length && !ft.frameworks?.length)
            ? `<p class="muted">Aún no hay ficha técnica para este módulo.</p>` : ""}
        </div>
      </section>
    </main>`;

  const playBtn = app.querySelector("[data-play]");
  if (playBtn) playBtn.addEventListener("click", onPlayPlaceholder);

  const verMas = app.querySelector("[data-toggle-resumen]");
  if (verMas) verMas.addEventListener("click", () => {
    const p = app.querySelector("[data-resumen]");
    p.classList.toggle("expanded");
    verMas.textContent = p.classList.contains("expanded") ? "Ver menos" : "Ver más";
  });

  hideHand();
}

function videoPlayerHTML(videoSrc, moduleName) {
  if (videoSrc) {
    return `<video class="video-real" controls preload="metadata">
      <source src="${esc(videoSrc)}" type="video/mp4">
      Tu navegador no soporta video HTML5.
    </video>`;
  }
  return `
    <div class="video-placeholder" data-play role="button" tabindex="0" aria-label="Reproducir video demo de ${esc(moduleName)}">
      <svg class="video-bg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0d1520"/>
            <stop offset="0.55" stop-color="#101c2e"/>
            <stop offset="1" stop-color="#1a1030"/>
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#vg)"/>
        <g stroke="#3a6b8a" stroke-width="0.5" opacity="0.35">
          <path d="M0 50h400M0 100h400M0 150h400M0 200h400"/>
          <path d="M70 0v250M150 0v250M250 0v250M330 0v250"/>
        </g>
        <g opacity="0.8">
          <rect x="240" y="40" width="14" height="70" fill="#14b8a6" opacity="0.5"/>
          <rect x="258" y="60" width="14" height="50" fill="#14b8a6" opacity="0.35"/>
          <rect x="276" y="20" width="14" height="90" fill="#14b8a6" opacity="0.6"/>
          <rect x="294" y="70" width="14" height="40" fill="#14b8a6" opacity="0.3"/>
        </g>
        <path d="M70 150 L100 120 L140 140 L165 100 L165 100 L150 165 L110 155 L90 175 Z" fill="#e8ecf2" opacity="0.9"/>
        <circle cx="118" cy="128" r="2" fill="#0d1520"/>
      </svg>
      <span class="rec-label"><span class="dot"></span>REC // DEMO_LIVE</span>
      <span class="res-label">1080p_60FPS</span>
      <span class="play-btn">${icon("play")}</span>
      <span class="video-bar"><i></i></span>
    </div>`;
}

function onPlayPlaceholder() {
  const el = document.querySelector(".video-toast");
  if (el) el.remove();
  const toast = document.createElement("div");
  toast.className = "video-toast";
  toast.textContent = "Este módulo aún no tiene un video asignado. Agrégalo en assets/js/data.js (campo \"video\").";
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 300); }, 3200);
}

function renderNotFound() {
  app.innerHTML = `
    ${headerHTML("#/", null)}
    <main class="view">
      <section class="empty-state">
        <h2>No encontramos esa página</h2>
        <p>Regresa al inicio para continuar navegando.</p>
        <a class="btn-primary" href="#/">Ir al inicio</a>
      </section>
    </main>`;
  hideHand();
}

/* -------------------------------------------------------------------- */
/* Mano robótica: sigue al cursor sobre las tarjetas (grid de home y     */
/* de submenú), igual que en el video de referencia.                    */
/* -------------------------------------------------------------------- */
function initHandTracking(gridSelector, cardSelector) {
  const grid = app.querySelector(gridSelector);
  if (!grid || !handEl) return;

  const cards = grid.querySelectorAll(cardSelector);

  // Posición de reposo: arriba a la derecha del grid, visible desde que
  // carga la vista (igual que en el video, antes de cualquier hover).
  requestAnimationFrame(() => moveHandToRest(grid));

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(c => c.classList.remove("is-hot"));
      card.classList.add("is-hot");
      moveHandTo(card);
    });
    card.addEventListener("focus", () => {
      cards.forEach(c => c.classList.remove("is-hot"));
      card.classList.add("is-hot");
      moveHandTo(card);
    });
  });

  grid.addEventListener("mouseleave", () => {
    cards.forEach(c => c.classList.remove("is-hot"));
    moveHandToRest(grid);
  });
}

function frameOffset(rect) {
  const frameRect = document.querySelector(".page-frame").getBoundingClientRect();
  return { x: rect.left - frameRect.left, y: rect.top - frameRect.top, right: rect.right - frameRect.left };
}

function moveHandTo(card) {
  const rect = card.getBoundingClientRect();
  const off = frameOffset(rect);
  const x = off.right - 64;
  const y = off.y - 78;
  handEl.style.transform = `translate(${x}px, ${y}px) rotate(-6deg)`;
  handEl.classList.add("is-active");
}

function moveHandToRest(grid) {
  const rect = grid.getBoundingClientRect();
  const off = frameOffset(rect);
  const x = off.right - 96;
  const y = off.y - 96;
  handEl.style.transform = `translate(${x}px, ${y}px) rotate(-4deg)`;
  handEl.classList.add("is-active");
}

function hideHand() {
  if (handEl) handEl.classList.remove("is-active");
}

/* -------------------------------------------------------------------- */
/* Router                                                                */
/* -------------------------------------------------------------------- */
function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (parts.length === 0) return renderHome();
  if (parts[0] === "categoria" && parts[1] && !parts[2]) return renderCategory(parts[1]);
  if (parts[0] === "categoria" && parts[1] && parts[2]) return renderModule(parts[1], parts[2]);
  return renderNotFound();
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
