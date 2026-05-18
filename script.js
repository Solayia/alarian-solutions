// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ===== MOBILE MENU =====
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    var elements = document.querySelectorAll(
        '.service-card, .avantage-card, .offre-card, .temoignage-card, .section-header, .contact-info, .contact-form-wrapper, .cta-box'
    );

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Check for reduced motion preference
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealOnScroll();
}

// Add .revealed class styles
var style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ACTIVE NAV LINK =====
var sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    var scrollPos = window.scrollY + 150;

    sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        var link = document.querySelector('.navbar-links a[href="#' + id + '"]');

        if (link && !link.classList.contains('btn')) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.style.color = '#01796f';
            } else {
                link.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
