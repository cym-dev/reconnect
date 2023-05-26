//effect
const inViewport = (entries, observer) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

//Attach observer to every [data-inViewport] element
const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});
