// Configuração do countdown
function setupCountdown() {
    const eventDate = new Date('April 14, 2025 08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            document.getElementById('days').innerHTML = "00";
            document.getElementById('hours').innerHTML = "00";
            document.getElementById('minutes').innerHTML = "00";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').innerHTML = days < 10 ? `0${days}` : days;
        document.getElementById('hours').innerHTML = hours < 10 ? `0${hours}` : hours;
        document.getElementById('minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60); // Atualiza a cada minuto
}

// Manipulação do FAQ
function setupFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Abre o item clicado (se não estava ativo)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Manipulação do menu mobile
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fecha o menu quando um link é clicado
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Animação de scroll suave para links de âncora
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuração de animações baseadas em scroll
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;

        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;

            // Verifica se o elemento está visível
            if (
                (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Checa inicialmente
    checkIfInView();
}

// Efeito de hover nas cards de cursos
function setupCourseCards() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Inicialização de todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    setupCountdown();
    setupFaq();
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollAnimations();
    setupCourseCards();
    
    // Inicialização do Particles.js se existir
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
                opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: {
                    enable: true, speed: 6, direction: 'none', random: false, straight: false,
                    out_mode: 'out', bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Revela elementos de texto com atraso
    const textElements = document.querySelectorAll('.text-reveal');
    textElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, 300 * index);
    });
});

// Validação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter campos
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // Validação simples
            let isValid = true;
            
            if (!nameField.value.trim()) {
                markInvalid(nameField, 'Por favor, insira seu nome');
                isValid = false;
            } else {
                markValid(nameField);
            }
            
            if (!emailField.value.trim()) {
                markInvalid(emailField, 'Por favor, insira seu email');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                markInvalid(emailField, 'Por favor, insira um email válido');
                isValid = false;
            } else {
                markValid(emailField);
            }
            
            if (!messageField.value.trim()) {
                markInvalid(messageField, 'Por favor, insira sua mensagem');
                isValid = false;
            } else {
                markValid(messageField);
            }
            
            if (isValid) {
                // Simulação de envio do formulário
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                // Simulação de resposta do servidor após 2 segundos
                setTimeout(() => {
                    submitButton.textContent = 'Mensagem Enviada!';
                    submitButton.classList.add('success');
                    
                    // Limpa o formulário
                    contactForm.reset();
                    
                    // Restaura o botão após 3 segundos
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('success');
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    function markInvalid(field, message) {
        field.classList.add('invalid');
        
        let errorMessage = field.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
    }
    
    function markValid(field) {
        field.classList.remove('invalid');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});