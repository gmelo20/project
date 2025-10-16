const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const scheduleForm = document.getElementById('scheduleForm');

if (scheduleForm) {
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.phone || !data.email || !data.vehicle || !data.service) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        showLoadingState();
        
        setTimeout(() => {
            showSuccessMessage();
            scheduleForm.reset();
        }, 2000);
    });
}

function showLoadingState() {
    const submitBtn = document.querySelector('#scheduleForm button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function showSuccessMessage() {
    const existingMessages = document.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 1001;
            max-width: 400px;
            width: 90%;
            margin: 20px;
        ">
            <h3 style="color: #28a745; margin-bottom: 1rem;">✅ Agendamento Solicitado!</h3>
            <p style="margin-bottom: 1rem;">Sua solicitação foi enviada com sucesso!</p>
            <p style="margin-bottom: 1.5rem; font-size: 0.9rem; color: #666;">
                Nossa equipe entrará em contato em breve para confirmar o agendamento.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #f4a837; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 1rem;">
                Fechar
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(successDiv);
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(4, 4, 4, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

document.querySelectorAll('.brand-logo').forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(logo);
});

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 24 ? 'h' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 24 ? 'h' : '+');
        }
    }, 30);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Site Renovo Assistance carregado com sucesso!');
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
    });

    const logos = document.querySelectorAll('.logo-img');
    logos.forEach(logo => {
        logo.style.opacity = '1';
        logo.style.display = 'block';
    });
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('success-message')) {
        e.target.remove();
    }
});