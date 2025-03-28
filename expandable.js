document.addEventListener('DOMContentLoaded', function() {
    // Inicializar seções expansíveis
    const expandableSections = document.querySelectorAll('.expandable-section');
    
    expandableSections.forEach(section => {
        const header = section.querySelector('.expandable-header');
        const content = section.querySelector('.expandable-content');
        
        header.addEventListener('click', () => {
            // Toggle da classe active para expandir/recolher a seção
            section.classList.toggle('active');
            
            // Atualizar o ícone
            const icon = header.querySelector('.expand-icon');
            if (section.classList.contains('active')) {
                icon.textContent = '×';
            } else {
                icon.textContent = '+';
            }
        });
    });
    
    // Inicializar itens de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Fechar outros itens de FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
            
            // Atualizar o ícone
            const icon = question.querySelector('.faq-icon');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '×' : '+';
            }
            
            // Animar a resposta
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
        
        // Inicializar altura da resposta
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
    });
    
    // Inicializar menu mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Adicionar smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fechar menu mobile se estiver aberto
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajustar para o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});