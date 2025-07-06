/* 
 * Script para incluir componentes HTML dinamicamente
 * Este script busca arquivos HTML e os insere em elementos com o atributo `data-include`.
 * Ele lida com erros de forma elegante, exibindo uma mensagem de erro se a busca falhar.
 * Inicializa eventos do menu hamburger e atualiza o ano no footer.
 */
$(document).ready(function() {
  $("[data-include]").each(function() {
      const $el = $(this);
      const file = $el.attr("data-include");
      
      $.get(file)
          .done(function(html) {
            $el.html(html);
            
             // Após carregar o componente, inicialize os scripts apropriados
              if (file === "footer.html") {
                  // Atualiza o ano no footer
                  const $anoElement = $("#ano");
                  if ($anoElement.length) {
                      $anoElement.text(new Date().getFullYear());
                  } else {
                      console.error("Elemento com id 'ano' não encontrado no footer.");
                  }
              } else if (file === "header.html") {
                  // Inicializa o menu hamburger e outros eventos do header
                  const $header = $("header");
                  const $navBar = $(".nav-bar");
                  const $menu = $(".menu");
                  let isOpen = false;

                  if ($menu.length && $navBar.length) {
                      $menu.on("click", function() {
                          if (!isOpen) {
                              $navBar.addClass("menu-opened");
                              isOpen = true;
                          } else {
                              $navBar.removeClass("menu-opened");
                              isOpen = false;
                          }
                      });

                      $navBar.on("click", function(evt) {
                          if (evt.target.tagName === "A") {
                              $navBar.removeClass("menu-opened");
                              isOpen = false;
                          }
                      });
                  } else {
                      console.error("Elementos .menu ou .nav-bar não encontrados no header.");
                  }

                  // Inicializa o comportamento do header no scroll
                  if ($header.length && $navBar.length) {
                      $(window).on("scroll", function() {
                          if (
                              $(window).scrollTop() > 70 &&
                              $header.hasClass("header-padrao")
                          ) {
                              $header.removeClass("header-padrao")
                                    .addClass("header-modificado");
                              $navBar.removeClass("nav-bar-padrao")
                                    .addClass("nav-bar-modificado");
                          } else if (
                              $(window).scrollTop() <= 70 &&
                              $header.hasClass("header-modificado")
                          ) {
                              $header.removeClass("header-modificado")
                                    .addClass("header-padrao");
                              $navBar.addClass("nav-bar-padrao")
                                    .removeClass("nav-bar-modificado");
                          }
                      });
                  }
              }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
              const errorMsg = `<p>Erro ao carregar componente: ${file}</p>`;
              $el.html(errorMsg);
              console.error(`Erro ao carregar ${file}:`, textStatus, errorThrown);
          });
  });
});