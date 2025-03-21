// Smooth scroll para os links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Validação do formulário
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        const error = input.parentElement.querySelector('.error-message');
        if (!input.checkValidity()) {
            isValid = false;
            error.style.display = 'block';
            input.style.borderColor = '#e74c3c';
            error.textContent = input.validationMessage;
        } else {
            error.style.display = 'none';
            input.style.borderColor = '#3498db';
        }
    });

    if (isValid) {
        // Enviar formulário
        this.reset();
        alert('Mensagem enviada com sucesso!');
    }
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

document.querySelectorAll('.testimonial-card, .gallery-item').forEach(element => {
    observer.observe(element);
});

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

// Efeito de parallax avançado para a seção hero
function setupHeroParallax() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const content = document.querySelector('.hero-content');
    const mascot = document.querySelector('.mascot-wrapper .hero-logo');
    
    if (!hero || !shapes.length) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });
    
    function animate() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            const x = targetX * 100 * speed;
            const y = targetY * 100 * speed;
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.2}deg)`;
        });
        
        if (content) {
            content.style.transform = `translate(${targetX * 20}px, ${targetY * 20}px)`;
        }
        
        if (mascot) {
            mascot.style.transform = `translate(${targetX * 30}px, ${targetY * 30}px) rotate(${targetX * 10}deg)`;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Efeito de revelação suave para elementos
function setupSmoothReveal() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Adicionar efeito de digitação para textos
                if (entry.target.classList.contains('text-reveal')) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    let index = 0;
                    
                    function typeText() {
                        if (index < text.length) {
                            entry.target.textContent += text[index];
                            index++;
                            setTimeout(typeText, 50);
                        }
                    }
                    
                    typeText();
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-fade-in, .text-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Efeito de hover 3D para cards
function setup3DHoverEffect() {
    const cards = document.querySelectorAll('.info-card, .course-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Sistema de Partículas e Ondas
function setupParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

// Efeito de Ondas
function setupWaves() {
    const waves = document.querySelectorAll('.wave');
    
    waves.forEach((wave, index) => {
        wave.style.animation = `waveFloat ${20 + index * 5}s infinite ease-in-out ${index * 2}s`;
    });
}

// Efeito Parallax no Hero
function setupParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero-content');
    const waves = document.querySelectorAll('.wave');
    
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        content.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
        
        waves.forEach((wave, index) => {
            const factor = (index + 1) * 0.2;
            wave.style.transform = `translate(${x * 50 * factor}px, ${y * 50 * factor}px)`;
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupParticles();
    setupCountdown();
    setupFaq();
    setupMobileMenu();
    setupSmoothScroll();
    setupScrollAnimations();
    setupCourseCards();
    setupHeroParallax();
    setupSmoothReveal();
    setup3DHoverEffect();
    setupWaves();
    setupParallax();
    
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
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            const privacyField = document.getElementById('privacy');
            
            // Validação simples
            let isValid = true;
            
            if (!nameField.value.trim()) {
                markInvalid(nameField, 'Por favor, insira seu nome completo');
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
            
            if (!subjectField.value) {
                markInvalid(subjectField, 'Por favor, selecione um assunto');
                isValid = false;
            } else {
                markValid(subjectField);
            }
            
            if (!messageField.value.trim()) {
                markInvalid(messageField, 'Por favor, insira sua mensagem');
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                markInvalid(messageField, 'Sua mensagem deve ter pelo menos 10 caracteres');
                isValid = false;
            } else {
                markValid(messageField);
            }
            
            if (!privacyField.checked) {
                markInvalid(privacyField, 'Você precisa concordar com o processamento dos seus dados');
                isValid = false;
            } else {
                markValid(privacyField);
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
        
        // Para checkbox, o erro deve ser adicionado ao elemento pai
        const parent = field.type === 'checkbox' ? field.parentNode : field.parentNode;
        
        let errorMessage = parent.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            parent.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function markValid(field) {
        field.classList.remove('invalid');
        
        // Para checkbox, o erro deve ser removido do elemento pai
        const parent = field.type === 'checkbox' ? field.parentNode : field.parentNode;
        
        const errorMessage = parent.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

// Função para mostrar modal de informações
function showInfo(type) {
    alert('Esta funcionalidade estará disponível em breve.');
}

// Inicialização quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a div de partículas existe
    if (document.getElementById('particles-js')) {
        // Carregar a biblioteca particles.js via CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = function() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        };
        document.head.appendChild(script);
    }
    
    // Remover seções desnecessárias
    const sectionsToRemove = document.querySelectorAll('#cursos, .testimonials, .gallery, #eventos, #projetos, #metas');
    sectionsToRemove.forEach(section => {
        if (section) section.remove();
    });

    // Atualizar o iframe do Google Maps com as coordenadas corretas da UFERSA Mossoró
    const mapIframe = document.querySelector('.campus-iframe');
    if (mapIframe) {
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9661356300386!2d-37.32740662466717!3d-5.203763552813322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba05791979e377%3A0xa8b1d13f78f5c397!2sUFERSA%20-%20Universidade%20Federal%20Rural%20do%20Semi-%C3%81rido!5e0!3m2!1spt-BR!2sbr!4v1714431453384!5m2!1spt-BR!2sbr";
    }

    // Criar uma logo do CAComp caso não exista
    const cacompLogo = document.querySelector('.cacomp-logo');
    if (cacompLogo) {
        cacompLogo.onerror = function() {
            // Tenta usar a nova imagem do mascote
            this.src = '@Designer.png';
            
            // Caso a nova imagem também falhe, criar uma com Canvas
            this.onerror = function() {
                const canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 200;
                const ctx = canvas.getContext('2d');
                
                // Fundo
                ctx.fillStyle = '#006747'; // Verde UFERSA
                ctx.beginPath();
                ctx.arc(100, 100, 90, 0, Math.PI * 2);
                ctx.fill();
                
                // Borda
                ctx.strokeStyle = '#FFD100'; // Amarelo UFERSA
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.arc(100, 100, 85, 0, Math.PI * 2);
                ctx.stroke();
                
                // Texto
                ctx.fillStyle = 'white';
                ctx.font = 'bold 40px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('CA', 100, 90);
                ctx.fillText('Comp', 100, 130);
                
                // Substituir a imagem
                this.src = canvas.toDataURL();
            };
        };
    }

    // Atualizar a localização no prédio de computação
    const locationElements = document.querySelectorAll('.info-item:has(.icon:contains("📍"))');
    locationElements.forEach(element => {
        const span = element.querySelector('span:not(.icon)');
        if (span) {
            span.textContent = "LCC - Bloco de Computação";
        }
    });
    
    // Atualizar a localização na seção de contato também
    const contactLocation = document.querySelector('.contact-item:has(.contact-icon:contains("📍")) p');
    if (contactLocation) {
        contactLocation.innerHTML = "LCC - Laboratório de Ciência da Computação<br>Campus Mossoró/RN";
    }

    // Adicionando efeitos avançados para o "ROLE PARA BAIXO"
    const scrollDown = document.querySelector('.scroll-down');
    
    if (scrollDown) {
        // Adicionar efeito de pulsação 3D para o indicador de rolagem
        const mouseElement = scrollDown.querySelector('.mouse');
        
        // Adiciona observador de interseção para animações baseadas no viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animação avançada quando visível
                    mouseElement.style.animation = 'pulse3D 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955)';
                    
                    // Adicionar texto com efeito de digitação
                    const textElement = scrollDown.querySelector('.scroll-text');
                    textElement.textContent = '';
                    const text = 'ROLE PARA BAIXO';
                    let index = 0;
                    
                    function typeText() {
                        if (index < text.length) {
                            textElement.textContent += text.charAt(index);
                            index++;
                            setTimeout(typeText, 100);
                        } else {
                            // Após completar, adicionar classe para estilo especial
                            textElement.classList.add('typed-complete');
                        }
                    }
                    
                    typeText();
                }
            });
        }, {threshold: 0.5});
        
        observer.observe(scrollDown);
    }
    
    // Melhoria avançada para o mapa usando a API de interação do Google Maps
    const mapFrame = document.querySelector('.campus-iframe');
    if (mapFrame) {
        // Adicionar eventos de manipulação avançada
        mapFrame.addEventListener('load', function() {
            // Adicionar overlays personalizados usando postMessage para comunicação com o iframe
            try {
                mapFrame.contentWindow.postMessage(JSON.stringify({
                    command: 'highlightBuilding',
                    coordinates: {lat: -5.203763552813322, lng: -37.32740662466717},
                    label: 'LCC'
                }), '*');
            } catch (e) {
                console.log('Map API communication advanced feature not available');
            }
        });
    }
    
    // Adicionar efeitos avançados para as seções usando Intersection Observer API + CSS Custom Properties
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calcular valor dinâmico baseado na posição da seção
                const viewportHeight = window.innerHeight;
                const ratio = entry.boundingClientRect.top / viewportHeight;
                
                // Definir propriedades CSS personalizadas para animações avançadas
                entry.target.style.setProperty('--scroll-ratio', ratio.toFixed(2));
                entry.target.classList.add('section-visible');
                
                // Aplicar efeito parallax
                const elements = entry.target.querySelectorAll('.parallax-element');
                elements.forEach((el, index) => {
                    const speed = 1 + (index * 0.1);
                    el.style.transform = `translateY(${ratio * 50 * speed}px)`;
                });
            }
        });
    }, {threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-10% 0px"});
    
    sections.forEach(section => sectionObserver.observe(section));

    // Gerar logos para redes sociais se não existirem
    document.querySelectorAll('.social-icon-img').forEach(img => {
        img.onerror = function() {
            const canvas = document.createElement('canvas');
            canvas.width = 50;
            canvas.height = 50;
            const ctx = canvas.getContext('2d');
            
            // Desenhar círculo de fundo
            ctx.beginPath();
            ctx.arc(25, 25, 20, 0, 2 * Math.PI);
            
            // Cor baseada na rede social
            if (this.alt.toLowerCase().includes('discord')) {
                ctx.fillStyle = '#5865F2';
            } else if (this.alt.toLowerCase().includes('instagram')) {
                ctx.fillStyle = '#E1306C';
            } else {
                ctx.fillStyle = '#006747';
            }
            
            ctx.fill();
            
            // Adicionar inicial da rede social
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.alt.charAt(0), 25, 25);
            
            this.src = canvas.toDataURL();
        };
    });

    // Funcionalidade para tornar o path sequential interativo
    const pathSteps = document.querySelectorAll('.path-step');
    let currentStep = 0;
    
    function activateStep(index) {
        pathSteps.forEach((step, i) => {
            if (i <= index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Ativar o primeiro passo inicialmente
    activateStep(currentStep);
    
    // Adicionar evento de clique para avançar no path
    pathSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            currentStep = index;
            activateStep(currentStep);
        });
    });
    
    // Auto-avançar a cada 5 segundos para demonstração
    let autoAdvance = setInterval(function() {
        currentStep = (currentStep + 1) % pathSteps.length;
        activateStep(currentStep);
    }, 5000);
    
    // Parar o avanço automático quando o usuário interagir
    document.querySelector('.path-steps').addEventListener('click', function() {
        clearInterval(autoAdvance);
    });
});

// Melhorar a animação do título com efeitos avançados de texto
window.addEventListener('load', function() {
    const titleSpans = document.querySelectorAll('.text-reveal');
    
    if (titleSpans.length) {
        // Implementação avançada de animação caractere por caractere
        titleSpans.forEach((span, index) => {
            const text = span.textContent;
            span.textContent = '';
            span.style.opacity = '1';
            
            // Criar elementos para cada caractere para animação individual
            [...text].forEach((char, i) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.opacity = '0';
                charSpan.style.transform = 'translateY(20px) rotateX(90deg)';
                charSpan.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.08 + index * 0.3}s`;
                span.appendChild(charSpan);
                
                // Atraso para garantir que o navegador processe as alterações antes da animação
                setTimeout(() => {
                    charSpan.style.opacity = '1';
                    charSpan.style.transform = 'translateY(0) rotateX(0)';
                }, 100);
            });
        });
    }
    
    // Adicionar funcionalidade avançada de tema dinâmico baseado na hora do dia
    const calculateTimeTheme = () => {
        const now = new Date();
        const hour = now.getHours();
        const root = document.documentElement;
        
        // Cores dinâmicas baseadas na hora
        if (hour >= 6 && hour < 12) {
            // Tema matinal
            root.style.setProperty('--dynamic-primary', '#006747');
            root.style.setProperty('--dynamic-secondary', '#FFD100');
            root.style.setProperty('--dynamic-gradient', 'linear-gradient(135deg, #005293 0%, #006747 100%)');
        } else if (hour >= 12 && hour < 18) {
            // Tema da tarde
            root.style.setProperty('--dynamic-primary', '#005293');
            root.style.setProperty('--dynamic-secondary', '#FFD100');
            root.style.setProperty('--dynamic-gradient', 'linear-gradient(135deg, #006747 0%, #005293 100%)');
        } else {
            // Tema noturno
            root.style.setProperty('--dynamic-primary', '#003060');
            root.style.setProperty('--dynamic-secondary', '#CC9900');
            root.style.setProperty('--dynamic-gradient', 'linear-gradient(135deg, #001f3f 0%, #004d40 100%)');
        }
    };
    
    calculateTimeTheme();
    setInterval(calculateTimeTheme, 60000); // Recalcular a cada minuto
});

// Implementação avançada de animações fluidas usando requestAnimationFrame
(function() {
    let scrollPosition = window.scrollY;
    let ticking = false;
    
    function updateParallax() {
        // Calcula efeito parallax avançado baseado na posição de rolagem
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const speed = bg.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollPosition * speed);
            bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Adicionar elementos parallax dinamicamente
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Adiciona fundo parallax para algumas seções
        if (index % 2 === 0) {
            const parallaxBg = document.createElement('div');
            parallaxBg.classList.add('parallax-bg');
            parallaxBg.setAttribute('data-speed', (0.3 + (index * 0.1)).toFixed(1));
            section.prepend(parallaxBg);
        }
    });
})();

// Sistema de login
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.createElement('div');
loginModal.className = 'modal';
loginModal.innerHTML = `
    <div class="modal-content">
        <h3>Acesso Restrito</h3>
        <form id="loginForm">
            <input type="email" placeholder="Email institucional" required>
            <input type="password" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>
        <button onclick="showRegistration()">Criar Conta</button>
    </div>
`;

document.body.appendChild(loginModal);

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Função de registro
function openRegistration() {
    window.open('https://forms.example.com/recepcao2025', '_blank');
}

// Remova o sistema de metas anterior e adicione:
document.querySelectorAll('.phase-tasks li').forEach(task => {
    task.addEventListener('click', function() {
        this.classList.toggle('completed');
    });
});

// Remover qualquer mensagem de erro ou debug no carregamento
window.addEventListener('load', function() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.style.display = 'none';
    });
    
    // Verificar se as logos foram carregadas corretamente
    document.querySelectorAll('.hero-logo').forEach(logo => {
        logo.onerror = function() {
            // Se a imagem não carregar, tenta usar o @Designer.png
            if (this.alt.includes('Mascote') && this.src !== '@Designer.png') {
                this.src = '@Designer.png';
            } else {
                // Se não for o mascote ou já tentou carregar o @Designer.png, use um fallback
                this.src = 'https://via.placeholder.com/120x120?text=Logo';
            }
        };
    });
});

// Adicionar animações aos elementos da timeline quando visíveis
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {threshold: 0.2});

document.querySelectorAll('.timeline-event').forEach(event => {
    event.style.opacity = 0;
    event.style.transform = 'translateX(-20px)';
    event.style.transition = 'all 0.5s ease';
    timelineObserver.observe(event);
});

// Adicionar efeito de hover aos elementos da timeline
document.querySelectorAll('.timeline-event').forEach(event => {
    event.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px) scale(1.02)';
        this.querySelector('.timeline-content').style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
    });
    
    event.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        this.querySelector('.timeline-content').style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    });
});

// Melhorar o formulário de contato para validação em tempo real
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.checkValidity()) {
            this.style.borderColor = 'var(--ufersa-green)';
            this.style.boxShadow = '0 0 0 2px rgba(0, 103, 71, 0.1)';
        } else {
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.1)';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
});

// Adicionar interatividade ao mascote
document.addEventListener('DOMContentLoaded', function() {
    // Encontrar todas as instâncias do mascote
    const mascotes = document.querySelectorAll('img[src="@Designer.png"]');
    
    mascotes.forEach(mascote => {
        // Adicionar um efeito de pulsar quando o mouse passar por cima
        mascote.addEventListener('mouseover', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            
            // Adicionar um pequeno movimento aleatório para dar mais personalidade
            const randomRotate = Math.random() * 10 - 5; // valor entre -5 e 5
            this.style.transform = `rotate(${randomRotate}deg)`;
            
            // Se for o mascote do hero, mostrar uma mensagem de boas-vindas
            if (this.classList.contains('hero-logo')) {
                // Criar um balão de mensagem se não existir
                let msgBalloon = document.querySelector('.mascote-message');
                if (!msgBalloon) {
                    msgBalloon = document.createElement('div');
                    msgBalloon.className = 'mascote-message';
                    msgBalloon.style.position = 'absolute';
                    msgBalloon.style.backgroundColor = 'white';
                    msgBalloon.style.padding = '8px 15px';
                    msgBalloon.style.borderRadius = '20px';
                    msgBalloon.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
                    msgBalloon.style.maxWidth = '200px';
                    msgBalloon.style.textAlign = 'center';
                    msgBalloon.style.zIndex = '100';
                    msgBalloon.style.opacity = '0';
                    msgBalloon.style.transition = 'opacity 0.3s ease';
                    
                    // Inserir na página perto do mascote
                    this.parentNode.appendChild(msgBalloon);
                }
                
                // Escolher uma mensagem aleatória
                const messages = [
                    "Olá! Bem-vindo ao CAComp!",
                    "Feliz em te ver por aqui! 😊",
                    "Precisa de ajuda com algo?",
                    "Estou aqui para te guiar!",
                    "Fique à vontade para explorar!"
                ];
                
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                msgBalloon.textContent = randomMsg;
                
                // Posicionar balão de acordo com a posição do mascote
                const rect = this.getBoundingClientRect();
                msgBalloon.style.left = `${rect.right}px`;
                msgBalloon.style.top = `${rect.top}px`;
                msgBalloon.style.opacity = '1';
                
                // Remover depois de um tempo
                setTimeout(() => {
                    if (msgBalloon) {
                        msgBalloon.style.opacity = '0';
                        setTimeout(() => {
                            if (msgBalloon.parentNode) {
                                msgBalloon.parentNode.removeChild(msgBalloon);
                            }
                        }, 300);
                    }
                }, 3000);
            }
        });
        
        // Restaurar após a animação terminar
        mascote.addEventListener('animationend', function() {
            this.style.animation = '';
            if (this.classList.contains('hero-logo')) {
                // Restaurar animação de flutuação para o mascote do hero
                this.style.animation = 'float 5s ease-in-out infinite';
            }
        });
        
        // Restaurar quando tirar o mouse
        mascote.addEventListener('mouseout', function() {
            if (!this.classList.contains('hero-logo')) {
                this.style.transform = '';
            }
        });
    });
    
    // Adicionar keyframe de pulsar se não existir
    const styleSheet = document.styleSheets[0];
    let pulseExists = false;
    
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].name === 'pulse') {
            pulseExists = true;
            break;
        }
    }
    
    if (!pulseExists) {
        styleSheet.insertRule(`
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `, styleSheet.cssRules.length);
    }
});

// Função para animações suaves ao rolar
document.addEventListener('DOMContentLoaded', () => {
    // Animação suave ao rolar para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação das formas geométricas
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
    });

    // Contador regressivo para o evento
    const countdownDate = new Date('2025-04-14T08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        if (document.getElementById('days')) {
            document.getElementById('days').textContent = String(days).padStart(2, '0');
        }
        if (document.getElementById('hours')) {
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        }
        if (document.getElementById('minutes')) {
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000 * 60); // Atualiza a cada minuto

    // Animação do menu mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Efeito parallax suave nas formas
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 2;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
        });
    });

    // Animação de fade in para elementos quando entram na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach(element => {
        observer.observe(element);
    });
});

// Função para animação de digitação do texto
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar animação de digitação quando a página carregar
window.addEventListener('load', () => {
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
        typeWriter(scrollText, 'Role para baixo');
    }
});

// Manipulação do formulário de login
function setupLoginForm() {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validação do email institucional
            if (!email.endsWith('@alunos.ufersa.edu.br')) {
                showLoginError('Por favor, use seu email institucional (@alunos.ufersa.edu.br)');
                return;
            }
            
            // Simulação de login
            const loginButton = this.querySelector('button[type="submit"]');
            const originalText = loginButton.textContent;
            
            loginButton.textContent = 'Entrando...';
            loginButton.disabled = true;
            
            // Simular resposta do servidor após 1.5 segundos
            setTimeout(() => {
                loginButton.textContent = 'Sucesso!';
                loginButton.classList.add('success');
                
                // Redirecionar após login bem-sucedido
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            }, 1500);
        });
    }
}

function showLoginError(message) {
    // Remove qualquer erro existente
    const existingError = document.querySelector('.login-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Cria e adiciona nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.login-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Adiciona a inicialização do formulário de login
document.addEventListener('DOMContentLoaded', function() {
    setupLoginForm();
    // ... existing code ...
}); 