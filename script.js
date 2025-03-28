// Função para atualizar o contador regressivo
function updateCountdown() {
    const eventDate = new Date('2025-04-14T08:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

// Atualiza o contador a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Atualização inicial

// Adiciona partículas espaciais ao card do evento
function createSpaceParticles() {
    const particlesContainer = document.querySelector('.space-particles');
    if (!particlesContainer) return;

    const numberOfParticles = 20;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'space-particle';
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Inicializa as partículas quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', createSpaceParticles); 