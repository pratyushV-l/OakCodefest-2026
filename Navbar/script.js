const headerUrl = new URL('./index.html', import.meta.url);

fetch(headerUrl)
  .then(res => res.text())
  .then(html => {
    // inject header HTML
    document.getElementById("navbarcontainer").innerHTML = html;

    // now that it's in the DOM, grab the elements
    const navbar = document.getElementById('navbar');
    const sentinel = document.getElementById('sentinel');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navInner = document.getElementById('navInner');
    let isHamburgerOpen = false;

    // intersection observer
    if (navbar && sentinel) {
      new IntersectionObserver(([e]) => {
        navbar.classList.toggle('dock', !e.isIntersecting);
      }).observe(sentinel);
    }

    // hamburger menu toggle
    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        if (!isHamburgerOpen) {
          navInner.style.overflow = "visible";
          isHamburgerOpen = true;
        }
        else {
          navInner.style.overflow = "hidden";
          isHamburgerOpen = false;
        }
      });
    }
  });
