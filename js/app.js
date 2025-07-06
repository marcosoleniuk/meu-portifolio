/*  Arquivo: app.js */
const $header = document.querySelector('header');
const $intLinks = document.querySelectorAll("ul li a[href^='#']");
const $toTop = document.querySelectorAll(".to-top")[0];
const $btnProjeto = document.querySelector('.btn-projeto');
const $navBar = document.querySelectorAll('.nav-bar')[0];
const $menu = document.querySelectorAll('.menu')[0];

/* Fecha o menu ao clicar em um link */
function navClick(evt) {
  if (evt.target.tagName == 'A') {
    toggleMenu();
  }
}

/*Scroll Suave */
function scrollToSection(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute("href");
  const section = document.querySelector(href);
  //section.scrollIntoView({
  //  behavior: "smooth",
  //  block: "start"
  // });

  const topo = section.offsetTop - 70;

  window.scrollTo({
    top: topo,
    behavior: "smooth"
  });
}

/*Adiciona o evento de click para os links internos */
$intLinks.forEach(link => {
  link.addEventListener("click", scrollToSection);

  $btnProjeto.addEventListener("click", scrollToSection);
});

/*botao que leva ao topo (scroll 0) */
window.addEventListener(
  "scroll",
  () => {
    if (window.pageYOffset > 840) {

      $toTop.classList.add("active");
    } else {
      $toTop.classList.remove("active");
    }
  },
  false
);

/*Botão que leva ao topo */
$toTop.addEventListener(
  "click",
  function (evt) {
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  false
);