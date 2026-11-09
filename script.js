// ⚙️ Pon aquí la URL real de NexusConverter
const NEXUS_URL = "#";

document.querySelectorAll("#nexus-link, #nexus-link-2").forEach((a) => {
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

// Animación al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".section-title, .project, .card, .cert, .skill-group, .gallery figure, .tl-item")
  .forEach((el) => { el.classList.add("reveal"); io.observe(el); });

// Visor de imágenes
const lb = document.querySelector(".lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lb-caption");
document.querySelectorAll(".gallery figure").forEach((fig) => {
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
