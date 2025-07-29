document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula o offset para considerar a altura do header fixo
                const headerOffset = document.querySelector('.fixed-nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu hambúrguer após clicar em mobile
                const navList = document.querySelector('.nav-list');
                const hamburger = document.querySelector('.hamburger-menu');
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Menu Fixo ao Rolar
    const header = document.querySelector('.fixed-nav');
    const headerHeight = header.offsetHeight; // Altura original do header

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            header.classList.add('scrolled');
            // Você pode adicionar um estilo CSS para 'scrolled' que mude o padding ou background
            // Ex: .fixed-nav.scrolled { padding: 10px 0; background-color: rgba(0, 0, 0, 0.95); }
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu Hambúrguer (Mobile)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburgerMenu.classList.toggle('active'); // Para animação do ícone
    });

    // Slider de Depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;

    // Cria os dots dinamicamente
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                card.classList.add('active');
                dots[i].classList.add('active');
            }
        });
        currentIndex = index;
    }

    prevArrow.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = testimonialCards.length - 1;
        }
        showTestimonial(newIndex);
    });

    nextArrow.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showTestimonial(parseInt(dot.dataset.index));
        });
    });

    // Auto-play do slider (opcional)
    let autoPlayInterval = setInterval(() => {
        nextArrow.click();
    }, 5000); // Muda a cada 5 segundos

    // Pausar auto-play no hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    testimonialsSlider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    testimonialsSlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            nextArrow.click();
        }, 5000);
    });


    // Validação e Envio do Formulário
    const form = document.getElementById('free-class-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        // Limpa mensagens anteriores
        formMessage.textContent = '';
        formMessage.classList.remove('success', 'error');
        formMessage.style.display = 'none';

        // Validação simples
        if (nome === '' || email === '' || telefone === '') {
            displayMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            displayMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        if (!isValidPhone(telefone)) {
            displayMessage('Por favor, insira um telefone válido (ex: (XX) XXXXX-XXXX).', 'error');
            return;
        }

        // Simula o envio (em um ambiente real, você enviaria para um backend aqui)
        setTimeout(() => {
            displayMessage('Sua aula gratuita foi agendada com sucesso! Em breve entraremos em contato.', 'success');
            form.reset(); // Limpa o formulário
        }, 1000);
    });

    function isValidEmail(email) {
        // Regex simples para validação de e-mail
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        // Regex para telefone brasileiro (com ou sem DDD, com ou sem nono dígito, com ou sem hífen)
        return /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(phone);
    }

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.classList.add(type);
        formMessage.style.display = 'block';
    }
});