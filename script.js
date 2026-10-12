/* ============================================
   CONFIGURATION
   Remplace les valeurs ci-dessous par tes vrais liens et ton adresse e-mail.
============================================ */
const PORTFOLIO_CONFIG = {
  email: "ndiogouba.developpeur@gmail.com",
  github: "https://github.com/OmelhorDev",
  linkedin: "https://www.linkedin.com/in/ndiogou-ba-5696242a9/", 
  youtube: "",
  instagram: "https://www.instagram.com/o_melhor_dev/"
};

$(document).ready(function () {

  /* ============================================
     PRELOADER
  ============================================ */
  setTimeout(function () {
    $("#preloader").addClass("hidden");
  }, 600);

    /* ============================================
     ✨ ANIMATION TYPEWRITER SUR LE NOM
     Alterne entre "NDIOGOU BA" et "DÉVELOPPEUR FULL-STACK"
  ============================================ */
  (function initTypewriter() {
    const $target = $("#typewriter");
    if (!$target.length) return;

    const words = [
      "Ndiogou Ba",
      "Développeur\nFull-Stack"   // ← \n = retour à la ligne
    ];

    let wordIndex = 0;      // mot actuel
    let charIndex = 0;      // position du caractère
    let isDeleting = false; // mode effacement
    let isPaused = false;   // pause entre les mots

    const TYPING_SPEED = 100;    // vitesse frappe (ms)
    const DELETING_SPEED = 55;   // vitesse effacement (ms)
    const PAUSE_AFTER_WORD = 1600; // pause quand mot complet
    const PAUSE_BEFORE_NEXT = 400; // pause avant mot suivant

    function type() {
      const currentWord = words[wordIndex];

      if (isPaused) return;

      if (!isDeleting) {
        // ÉCRITURE
        charIndex++;
        $target.text(currentWord.substring(0, charIndex));

        if (charIndex === currentWord.length) {
          // Mot complet → pause
          isPaused = true;
          setTimeout(function () {
            isPaused = false;
            isDeleting = true;
            type();
          }, PAUSE_AFTER_WORD);
          return;
        }

        setTimeout(type, TYPING_SPEED);

      } else {
        // EFFACEMENT
        charIndex--;
        $target.text(currentWord.substring(0, charIndex));

        if (charIndex === 0) {
          // Mot effacé → mot suivant
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;

          isPaused = true;
          setTimeout(function () {
            isPaused = false;
            type();
          }, PAUSE_BEFORE_NEXT);
          return;
        }

        setTimeout(type, DELETING_SPEED);
      }
    }

    // Démarrage après le preloader
    setTimeout(type, 900);
  })(); 

  /* ============================================
     THÈME SOMBRE / CLAIR
  ============================================ */
  const savedTheme = localStorage.getItem("theme") || "dark";
  $("html").attr("data-theme", savedTheme);

  $("#themeToggle").on("click", function () {
    const current = $("html").attr("data-theme");
    const next = current === "dark" ? "light" : "dark";
    $("html").attr("data-theme", next);
    localStorage.setItem("theme", next);

    // Animation douce de transition
    $("body").css("transition", "background .4s ease, color .4s ease");
  });

  /* ============================================
     MENU MOBILE
  ============================================ */
  $("#menuToggle").on("click", function () {
    const isOpen = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!isOpen));
    $(this).attr("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    $("#navLinks").toggleClass("open", !isOpen);
  });

  // Fermer le menu au clic sur un lien
  $(".nav-link, .nav-cta").on("click", function () {
    $("#navLinks").removeClass("open");
    $("#menuToggle").attr("aria-expanded", "false");
  });

  /* ============================================
     NAVIGATION ACTIVE AU SCROLL
  ============================================ */
  const sections = $("section[id]");
  const navLinks = $(".nav-link");

  $(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop() + 120;

    sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr("id");

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.removeClass("active");
        $(`.nav-link[href="#${id}"]`).addClass("active");
      }
    });

    // Back to top
    if ($(window).scrollTop() > 400) {
      $("#backToTop").addClass("visible");
    } else {
      $("#backToTop").removeClass("visible");
    }
  });

  /* ============================================
     BACK TO TOP
  ============================================ */
  $("#backToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  /* ============================================
     SMOOTH SCROLL
  ============================================ */
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: target.offset().top - 80
      }, 700, "swing");
    }
  });

  /* ============================================
     REVEAL AU SCROLL
  ============================================ */
  const revealElements = $(".reveal");

  function checkReveal() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    revealElements.each(function () {
      const elTop = $(this).offset().top + 80;
      if (windowBottom > elTop && !$(this).hasClass("visible")) {
        $(this).addClass("visible");

        // Animation des barres de compétences
        $(this).find(".skill-level i").each(function () {
          const width = $(this).data("width");
          $(this).css("width", width);
        });
      }
    });
  }

  $(window).on("scroll", checkReveal);
  checkReveal();

  /* ============================================
     FILTRAGE DES PROJETS
  ============================================ */
  $(".filter-button").on("click", function () {
    const filter = $(this).data("filter");

    $(".filter-button").removeClass("active");
    $(this).addClass("active");

    $(".project-card").each(function () {
      const category = $(this).data("category");

      if (filter === "all" || category === filter) {
        $(this).fadeIn(400).removeAttr("hidden");
      } else {
        $(this).fadeOut(300, function () {
          $(this).attr("hidden", true);
        });
      }
    });
  });

  /* ============================================
     CONFIGURATION DES CONTACTS
  ============================================ */
  const emailIsConfigured = PORTFOLIO_CONFIG.email && PORTFOLIO_CONFIG.email !== "ndiogouba.developpeur@gmail.com";

  // Liens sociaux
  $("[data-social]").each(function () {
    const network = $(this).data("social");
    const url = PORTFOLIO_CONFIG[network];

    if (url) {
      $(this).attr("href", url);
      $(this).attr("target", "_blank");
      $(this).attr("rel", "noopener noreferrer");
    } else {
      $(this).on("click", function (e) {
        e.preventDefault();
        showToast(`Ajoute ton vrai lien ${network} dans script.js.`);
      });
    }
  });

  /* ============================================
     COPIE EMAIL AU CLIC
  ============================================ */
  $('a[href^="mailto:"]').on("click", function (e) {
    if (!emailIsConfigured) {
      e.preventDefault();
      showToast("Remplace ndiogouba.developpeur@gmail.com dans script.js par ton adresse e-mail.");
      return;
    }

    // Essayer de copier en plus
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PORTFOLIO_CONFIG.email).then(function () {
        showToast("Adresse e-mail copiée !");
      }).catch(function () {
        // silencieux
      });
    }
  });

  /* ============================================
     FORMULAIRE DE CONTACT
  ============================================ */
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const subject = $("#subject").val().trim();
    const message = $("#message").val().trim();

    if (!name || !email || !subject || !message) {
      showToast("Merci de remplir tous les champs.");
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Adresse e-mail invalide.");
      return;
    }

    // Ici tu peux envoyer via un backend ou un service comme EmailJS
    // Pour l'instant, on simule l'envoi
    const submitBtn = $(this).find(".form-submit");
    const originalText = submitBtn.html();
    submitBtn.html("Envoi en cours...").prop("disabled", true);

    setTimeout(function () {
      submitBtn.html("Message envoyé ✓").css({
        background: "#22c55e",
        color: "#fff"
      });

      showToast("Merci ! Votre message a bien été envoyé.");
      $("#contactForm")[0].reset();

      setTimeout(function () {
        submitBtn.html(originalText).css({
          background: "",
          color: ""
        }).prop("disabled", false);
      }, 2500);
    }, 1200);
  });

  /* ============================================
     TOAST
  ============================================ */
  function showToast(message) {
    const $toast = $("#toast");
    $toast.text(message).addClass("show");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(function () {
      $toast.removeClass("show");
    }, 3200);
  }

  /* ============================================
     ANNÉE AUTOMATIQUE
  ============================================ */
  $("#currentYear").text(new Date().getFullYear());

  /* ============================================
     PARALLAX LÉGER SUR LES GLOWS
  ============================================ */
  $(window).on("scroll", function () {
    const scrollY = $(window).scrollTop();
    $(".glow-one").css("transform", `translateY(${scrollY * 0.15}px)`);
    $(".glow-two").css("transform", `translateY(${-scrollY * 0.1}px)`);
  });

  /* ============================================
     ANIMATION DES CARTES AU SURVOL (tilt léger)
  ============================================ */
  $(".project-card, .skill-card").on("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    $(this).css("transform", `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  });

  $(".project-card, .skill-card").on("mouseleave", function () {
    $(this).css("transform", "");
  });

});