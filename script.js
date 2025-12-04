// Mobile menu toggle - исправленная версия
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Блокируем скролл при открытом меню
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Восстанавливаем скролл
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при нажатии ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Gallery slider
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (galleryTrack && prevBtn && nextBtn) {
        let position = 0;
        
        function updateSlider() {
            const slides = document.querySelectorAll('.gallery-item');
            if (slides.length === 0) return;
            
            const slideWidth = slides[0].offsetWidth + 25;
            const containerWidth = galleryTrack.parentElement.offsetWidth;
            const visibleSlides = Math.floor(containerWidth / slideWidth);
            const maxPosition = Math.max(0, slides.length - visibleSlides);
            
            // Ограничиваем позицию
            if (position > maxPosition) position = maxPosition;
            if (position < 0) position = 0;
            
            // Применяем трансформацию
            galleryTrack.style.transform = `translateX(${position * slideWidth}px)`;
            
            // Обновляем кнопки
            prevBtn.disabled = position >= maxPosition;
            nextBtn.disabled = position === 0;
            
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
            prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
            nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
        }
        
        // prevBtn (→) двигает ВПРАВО
        prevBtn.addEventListener('click', function() {
            position++;
            updateSlider();
        });
        
        // nextBtn (←) двигает ВЛЕВО
        nextBtn.addEventListener('click', function() {
            position--;
            updateSlider();
        });
        
        window.addEventListener('resize', updateSlider);
        updateSlider();
    }
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});