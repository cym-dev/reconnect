//nav
const nav = $("nav");
window.addEventListener("scroll", () => {
  const rect = nav[0].getBoundingClientRect();
  console.log(window.scrollY);
  if (window.scrollY > 480 && rect.top < window.scrollY) {
    nav.addClass("scroll");
    nav.removeClass("normal");
  } else {
    nav.addClass("normal");
    nav.removeClass("scroll");
  }
});

var a = $("a");
for (var i = 0; i < a.length; i++) {
  a[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}

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
