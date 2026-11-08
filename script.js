document.body.classList.add('has-js');

const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

function closeNavigation() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      closeNavigation();
    }
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const roleElement = document.querySelector('#typed-role');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (roleElement && !prefersReducedMotion) {
  const roles = ['Web Developer', 'Web Designer', 'Backend Developer'];
  let roleIndex = 0;
  let letterIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    const role = roles[roleIndex];
    roleElement.textContent = role.slice(0, letterIndex);

    if (deleting) {
      letterIndex -= 1;
      if (letterIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        letterIndex = 0;
        window.setTimeout(typeRole, 320);
        return;
      }
    } else {
      letterIndex += 1;
      if (letterIndex > roles[roleIndex].length) {
        deleting = true;
        window.setTimeout(typeRole, 1450);
        return;
      }
    }

    window.setTimeout(typeRole, deleting ? 43 : 68);
  }

  window.setTimeout(typeRole, 1500);
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:prempawar241@gmail.com?subject=${subject}&body=${body}`;
  });
}
