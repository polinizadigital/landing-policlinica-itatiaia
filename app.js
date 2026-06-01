document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // WHATSAPP DYNAMIC MESSAGES & LINKS
    // ==========================================================================
    const WHATSAPP_NUMBER = '5524981530023'; // 55 (Brazil) + 24 (DDD) + 981530023
    
    const messages = {
        general: 'Olá! Vim pelo site da Policlínica Itatiaia e gostaria de agendar uma consulta.',
        convenio: 'Olá! Gostaria de saber se a Policlínica Itatiaia aceita meu plano de saúde.',
        specialty: (name) => `Olá! Vim pelo site da Policlínica Itatiaia e gostaria de agendar uma consulta na especialidade de ${name}.`
    };

    // Helper to generate whatsapp url
    function getWhatsAppUrl(text) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    // Set general buttons (Hero, CTA, Header)
    const generalBtns = document.querySelectorAll('.whatsapp-btn, #whatsappFloat');
    generalBtns.forEach(btn => {
        btn.setAttribute('href', getWhatsAppUrl(messages.general));
    });

    // Set convenio button
    const convenioBtns = document.querySelectorAll('.whatsapp-convenio-btn');
    convenioBtns.forEach(btn => {
        btn.setAttribute('href', getWhatsAppUrl(messages.convenio));
    });

    // Set specialty buttons
    const specialtyBtns = document.querySelectorAll('.specialty-whatsapp-btn');
    specialtyBtns.forEach(btn => {
        const specialtyName = btn.getAttribute('data-specialty') || 'Clínica Geral';
        btn.setAttribute('href', getWhatsAppUrl(messages.specialty(specialtyName)));
        
        // Add click listener just in case they want fallback behavior
        btn.addEventListener('click', (e) => {
            // Let native link navigate
        });
    });

    // ==========================================================================
    // NAVIGATION SCROLL EFFECT & ACTIVE STATE
    // ==========================================================================
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll header background transition
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link highlighting
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    
    function toggleMenu() {
        mobileNavToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        navOverlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMenu() {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    mobileNavToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Close menu when navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ==========================================================================
    // STRUCTURE GALLERY LIGHTBOX
    // ==========================================================================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const imgPath = trigger.getAttribute('data-img');
            const captionText = trigger.getAttribute('data-caption');
            
            lightboxImg.setAttribute('src', imgPath);
            lightboxImg.setAttribute('alt', captionText);
            lightboxCaption.textContent = captionText;
            
            lightboxModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });
    
    function closeLightbox() {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = ''; // Restore scroll
        // Clean image source after transition
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 300);
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking background shadow
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
            closeLightbox();
        }
    });

});
