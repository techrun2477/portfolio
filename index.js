document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburgerBtn.querySelector('i');
        // Toggle between hamburger and close icon
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerBtn.querySelector('i').classList.remove('fa-times');
                hamburgerBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // 3. Active Navbar Link Highlighting (On Scroll)
    const sections = document.querySelectorAll('main section');
    const navLinksList = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', // When the section hits 50% into the viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;

                // Remove active class from all links
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to the corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 4. Testimonial Carousel Logic
    const carousel = document.getElementById('testimonial-carousel');
    const items = carousel.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.control-dot');
    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds

    function showTestimonial(index) {
        // Ensure index is within bounds
        if (index >= items.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = items.length - 1;
        } else {
            currentIndex = index;
        }

        // Hide all items and remove active class from all dots
        items.forEach(item => {
            item.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the current item and activate the corresponding dot
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Auto-advance the carousel
    let autoAdvance = setInterval(() => {
        showTestimonial(currentIndex + 1);
    }, intervalTime);

    // Event listeners for dots (manual control)
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            // Clear auto-advance on manual interaction
            clearInterval(autoAdvance);
            const index = parseInt(e.target.dataset.index);
            showTestimonial(index);
            // Restart auto-advance
            autoAdvance = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, intervalTime);
        });
    });

    // Initialize the carousel
    showTestimonial(0);
});