// ⚙️ Pon aquí la URL real de NexusConverter (ej: "https://nexusconverter.com")
const NEXUS_URL = "#";

document.querySelectorAll(".nexus-link").forEach((a) => {
  a.href = NEXUS_URL;
  if (NEXUS_URL === "#") a.removeAttribute("target");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

// Comparador antes / después (funciona con mouse, touch y teclado)
const compare = document.getElementById("compare");
const range = compare.querySelector(".compare-range");
range.addEventListener("input", () => compare.style.setProperty("--pos", range.value + "%"));

// Filtros de la galería
const chips = document.querySelectorAll(".chip");
const figures = document.querySelectorAll(".gallery figure");
chips.forEach((chip) => chip.addEventListener("click", () => {
  chips.forEach((c) => c.classList.toggle("active", c === chip));
  const f = chip.dataset.filter;
  figures.forEach((fig) => fig.classList.toggle("hide", f !== "all" && fig.dataset.cat !== f));
}));

// Animación al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".section-title, .project, .card, .cert, .skill-group, .gallery figure, .tl-item, .stats li, .compare")
  .forEach((el) => { el.classList.add("reveal"); io.observe(el); });

// Visor de imágenes
const lb = document.querySelector(".lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-caption");
figures.forEach((fig) => {
  fig.addEventListener("click", () => {
    const img = fig.querySelector("img");
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = fig.querySelector("figcaption").textContent;
    lb.hidden = false;
  });
});
const closeLb = () => { lb.hidden = true; };
lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

// Si una imagen externa no carga, ocultarla para que no se vea rota
document.querySelectorAll(".gallery img").forEach((img) => {
  const hide = () => img.closest("figure").remove();
  if (img.complete && img.naturalWidth === 0 && img.src) hide(); else img.addEventListener("error", hide);
});
const cmpImgs = compare.querySelectorAll("img");
let cmpFailed = false;
cmpImgs.forEach((img) => img.addEventListener("error", () => {
  if (cmpFailed) return; cmpFailed = true;
  compare.previousElementSibling.remove(); compare.remove();
}));
