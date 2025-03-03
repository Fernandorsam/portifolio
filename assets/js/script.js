
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('nav ul');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    navMenu.classList.remove('active');
                }
            });
        });

        // Initialize ScrollReveal
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
        });

        // Apply reveal animations
        sr.reveal('.skill-item', { 
            interval: 100,
            scale: 0.9
        });

        sr.reveal('.project-card', {
            interval: 200,
            scale: 0.9
        });

        sr.reveal('.section-title', {
            origin: 'left',
            distance: '100px'
        });

        // Parallax effect for header background
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrolled = window.pageYOffset;
            header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });

        // Add active class to nav links on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    