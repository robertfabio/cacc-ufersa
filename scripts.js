// Enhanced Countdown Timer with Animations and Error Handling
const EVENT_DATE = new Date('2025-04-14T08:00:00').getTime();

function updateCountdown() {
    try {
        const now = new Date().getTime();
        const distance = EVENT_DATE - now;

        // Handle event already passed
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = `
                <div class="countdown-message">O evento já começou!</div>
            `;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${String(days).padStart(2, '0')}</span>
                <span class="countdown-label">Dias</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${String(hours).padStart(2, '0')}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${String(minutes).padStart(2, '0')}</span>
                <span class="countdown-label">Minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${String(seconds).padStart(2, '0')}</span>
                <span class="countdown-label">Segundos</span>
            </div>
        `;
    } catch (error) {
        console.error('Error updating countdown:', error);
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Enhanced Photo Gallery with Touch Support and Lazy Loading
class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.images = document.querySelectorAll('.gallery-image');
        this.totalImages = this.images.length;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isAnimating = false;

        // Initialize touch events
        const gallery = document.querySelector('.gallery-container');
        if (gallery) {
            gallery.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            gallery.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
            gallery.addEventListener('touchend', () => this.handleTouchEnd());
        }

        // Initialize navigation buttons
        const nextBtn = document.querySelector('.gallery-next');
        const prevBtn = document.querySelector('.gallery-prev');
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevImage());

        // Initialize lazy loading
        this.setupLazyLoading();

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));

        // Initial update
        this.updateGallery();
    }

    setupLazyLoading() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => {
            if (img.dataset.src) {
                observer.observe(img);
            }
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
        const diff = this.touchStartX - this.touchEndX;
        const sensitivity = 50; // Minimum swipe distance

        if (Math.abs(diff) > sensitivity) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.prevImage();
            }
            this.touchStartX = this.touchEndX; // Reset touch position
        }
    }

    handleTouchEnd() {
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    handleKeyNavigation(e) {
        if (e.key === 'ArrowRight') {
            this.nextImage();
        } else if (e.key === 'ArrowLeft') {
            this.prevImage();
        }
    }

    nextImage() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateGallery();
    }

    prevImage() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateGallery();
    }

    updateGallery() {
        this.images.forEach((img, index) => {
            const offset = 100 * (index - this.currentIndex);
            img.style.transform = `translateX(${offset}%)`;
            img.style.transition = 'transform 0.5s ease-in-out';
            
            // Update visibility and z-index for better performance
            if (Math.abs(offset) > 100) {
                img.style.visibility = 'hidden';
            } else {
                img.style.visibility = 'visible';
                img.style.zIndex = 1000 - Math.abs(offset);
            }
        });

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
}

// Enhanced Form Validation with Accessibility and User Feedback
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.inputs = this.form.querySelectorAll('input, textarea, select');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.isSubmitting = false;

        this.initializeValidation();
        this.setupAccessibility();
    }

    initializeValidation() {
        this.inputs.forEach(input => {
            // Add aria attributes for accessibility
            input.setAttribute('aria-invalid', 'false');
            
            // Real-time validation
            input.addEventListener('input', () => this.handleInput(input));
            input.addEventListener('blur', () => this.validateInput(input));
            
            // Add custom validation messages
            if (input.dataset.validationMessage) {
                input.setCustomValidity(input.dataset.validationMessage);
            }
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupAccessibility() {
        // Add role and live region for screen readers
        const statusRegion = document.createElement('div');
        statusRegion.setAttribute('role', 'status');
        statusRegion.setAttribute('aria-live', 'polite');
        statusRegion.className = 'form-status visually-hidden';
        this.form.appendChild(statusRegion);

        // Make error messages accessible
        this.inputs.forEach(input => {
            const id = `error-${input.name || Math.random().toString(36).substr(2, 9)}`;
            input.setAttribute('aria-describedby', id);
            
            const errorContainer = document.createElement('div');
            errorContainer.id = id;
            errorContainer.className = 'error-message';
            errorContainer.setAttribute('role', 'alert');
            input.parentElement.appendChild(errorContainer);
        });
    }

    handleInput(input) {
        this.clearError(input);
        this.updateSubmitButton();
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.isSubmitting) return;

        this.isSubmitting = true;
        this.updateSubmitButtonState(true);

        if (await this.validateForm()) {
            try {
                await this.submitForm();
                this.showSuccess('Formulário enviado com sucesso!');
                this.form.reset();
            } catch (error) {
                this.showError(this.submitButton, 'Erro ao enviar formulário. Tente novamente.');
            }
        }

        this.isSubmitting = false;
        this.updateSubmitButtonState(false);
    }

    async validateForm() {
        const validations = Array.from(this.inputs).map(input => this.validateInput(input));
        const results = await Promise.all(validations);
        return results.every(Boolean);
    }

    async validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (input.required && value === '') {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        // Email validation
        else if (input.type === 'email' && value !== '' && !this.validateEmail(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido';
        }
        // Custom validation rules
        else if (input.dataset.minLength && value.length < parseInt(input.dataset.minLength)) {
            isValid = false;
            errorMessage = `Mínimo de ${input.dataset.minLength} caracteres necessários`;
        }

        // Update input state and accessibility attributes
        input.setAttribute('aria-invalid', !isValid);
        if (!isValid) {
            this.showError(input, errorMessage);
        } else {
            this.clearError(input);
        }

        return isValid;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(input, message) {
        const errorContainer = this.form.querySelector(`#error-${input.name}`);
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.add('visible');
        }
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
    }

    clearError(input) {
        const errorContainer = this.form.querySelector(`#error-${input.name}`);
        if (errorContainer) {
            errorContainer.textContent = '';
            errorContainer.classList.remove('visible');
        }
        input.classList.remove('invalid');
        input.setAttribute('aria-invalid', 'false');
    }

    updateSubmitButtonState(isSubmitting) {
        if (this.submitButton) {
            this.submitButton.disabled = isSubmitting;
            this.submitButton.innerHTML = isSubmitting ? 
                '<span class="spinner"></span> Enviando...' : 
                'Enviar';
        }
    }

    updateSubmitButton() {
        if (this.submitButton) {
            const isValid = Array.from(this.inputs).every(input => 
                !input.required || input.value.trim() !== '');
            this.submitButton.disabled = !isValid;
        }
    }

    showSuccess(message) {
        const statusRegion = this.form.querySelector('.form-status');
        if (statusRegion) {
            statusRegion.textContent = message;
            statusRegion.classList.remove('visually-hidden');
            setTimeout(() => {
                statusRegion.classList.add('visually-hidden');
            }, 5000);
        }
    }

    async submitForm() {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('.contact-form');
});

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const wasActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle the clicked item
        if (!wasActive) {
            faqItem.classList.add('active');
        }
    });
});

// FAQ Category Filter
document.querySelectorAll('.faq-category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        document.querySelectorAll('.faq-category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show/hide FAQ items based on category
        document.querySelectorAll('.faq-item').forEach(item => {
            if (category === 'todos' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize gallery if it exists
    if (document.querySelector('.gallery-container')) {
        new Gallery();
    }

    // Initialize form validation
    new FormValidator('.contact-form');

    // Enhanced section transitions and smooth scroll behavior
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.classList.remove('section-visible');
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    // Initialize smooth scroll behavior
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

    // Apply transition styles to sections
    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        sectionObserver.observe(section);
    });

    // FAQ Interativo
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.textContent.toLowerCase();
            
            // Show/hide FAQ items based on category
            faqItems.forEach(item => {
                if (category === 'geral' || item.dataset.category === category) {
                    item.style.display = 'block';
                    // Add entrance animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gerenciamento de expansão das perguntas
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Fecha todos os outros itens
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle do item clicado
            faqItem.classList.toggle('active');

            // Adiciona efeito de brilho ao abrir
            if (!isActive) {
                const glow = document.createElement('div');
                glow.className = 'faq-glow-effect';
                faqItem.appendChild(glow);
                setTimeout(() => glow.remove(), 700);
            }
        });
    });
});

// Validação e envio do formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Desabilita o botão durante o envio
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Coleta os dados do formulário
        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        try {
            // Simula o envio do formulário (substitua por sua lógica de envio real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Feedback de sucesso
            submitButton.textContent = '✓ Mensagem Enviada!';
            submitButton.classList.add('success');
            
            // Limpa o formulário
            this.reset();
            
            // Restaura o botão após 3 segundos
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('success');
            }, 3000);
            
        } catch (error) {
            // Feedback de erro
            submitButton.textContent = '× Erro ao enviar';
            submitButton.classList.add('error');
            
            // Restaura o botão após 3 segundos
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('error');
            }, 3000);
        }
    });

    // Validação em tempo real dos campos
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Função para validar campos individuais
function validateField(field) {
    const errorClass = 'error';
    const successClass = 'success';
    
    // Remove classes anteriores
    field.classList.remove(errorClass, successClass);
    
    if (field.checkValidity()) {
        field.classList.add(successClass);
    } else {
        field.classList.add(errorClass);
    }
}

// Adiciona efeito de hover nos itens de contato
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Adiciona efeito de hover nos links sociais
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.social-icon-img');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.social-icon-img');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});