// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Feather
    feather.replace();
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar scroll animations
    setupScrollAnimations();
    
    // Configurar formulario
    setupContactForm();
    
    // Configurar funcionalidades adicionales
    setupMoreInfo();
    
    // Configurar scroll suave para enlaces
    setupSmoothScroll();
});

// Configuración de la navegación
function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    const header = document.getElementById('header');
    
    // Toggle menú móvil
    menuToggle.addEventListener('click', function() {
        navMobile.classList.toggle('show');
        
        // Cambiar icono del menú
        const icon = menuToggle.querySelector('i');
        if (navMobile.classList.contains('show')) {
            icon.setAttribute('data-feather', 'x');
        } else {
            icon.setAttribute('data-feather', 'menu');
        }
        feather.replace();
    });
    
    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-feather', 'menu');
            feather.replace();
        });
    });
    
    // Resaltar enlace activo en el scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Cambiar estilo del header en scroll
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Actualizar enlace activo
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase active de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar clase active al enlace correspondiente
                const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
            }
        });
    });
}

// Configuración de animaciones en scroll mejoradas
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar animación con delay escalonado
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, Math.random() * 200);
            }
        });
    }, observerOptions);
    
    // Observer para secciones completas
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animar elementos hijos con delay
                const childElements = entry.target.querySelectorAll('.slide-up:not(.animate)');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 150);
                });
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.3
    });
    
    // Observar todos los elementos con clase slide-up
    const animatedElements = document.querySelectorAll('.slide-up');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Animación del hero al cargar
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
    }, 300);
}

// Configuración del scroll suave
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuración de información adicional expandible
function setupMoreInfo() {
    window.toggleMoreInfo = function(section) {
        const moreInfo = document.getElementById(`${section}-more-info`);
        const button = event.target;
        
        if (moreInfo.classList.contains('show')) {
            moreInfo.classList.remove('show');
            button.textContent = 'Más información';
        } else {
            moreInfo.classList.add('show');
            button.textContent = 'Menos información';
            
            // Scroll suave hacia la información expandida
            setTimeout(() => {
                moreInfo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };
}

// Configuración del formulario de contacto
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        clearFormErrors();
        
        // Validar formulario
        if (validateForm()) {
            // Mostrar estado de carga
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            
            // Simular envío (en producción conectar con backend)
            setTimeout(() => {
                // Resetear botón
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                
                // Mostrar modal de confirmación
                showConfirmationModal();
                
                // Limpiar formulario
                form.reset();
                
            }, 2000);
        }
    });
    
    // Validación en tiempo real
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Limpiar error cuando el usuario empiece a escribir
            const errorElement = document.getElementById(`${this.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                this.style.borderColor = '';
            }
        });
    });
}

// Validación del formulario
function validateForm() {
    let isValid = true;
    
    // Validar campos requeridos
    const requiredFields = [
        { id: 'nombre', name: 'Nombre completo' },
        { id: 'email', name: 'Correo electrónico' },
        { id: 'edad', name: 'Edad', type: 'number' },
        { id: 'modalidad', name: 'Modalidad' },
        { id: 'tipo-sesion', name: 'Tipo de sesión' },
        { id: 'motivo', name: 'Motivo de consulta' },
        { id: 'acepto-terminos', name: 'Aceptar términos y condiciones', type: 'checkbox' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!validateField(element, field.name, field.type)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validar campo individual
function validateField(element, fieldName = null, fieldType = 'text') {
    const value = element.value.trim();
    const errorElement = document.getElementById(`${element.id}-error`);
    let isValid = true;
    let errorMessage = '';
    
    // Obtener nombre del campo si no se proporciona
    if (!fieldName) {
        const label = document.querySelector(`label[for="${element.id}"]`);
        fieldName = label ? label.textContent.replace(' *', '') : 'Este campo';
    }
    
    // Validaciones específicas por tipo
    switch (fieldType) {
        case 'checkbox':
            if (!element.checked) {
                errorMessage = `Debes ${fieldName.toLowerCase()}`;
                isValid = false;
            }
            break;
        default:
            if (!value) {
                errorMessage = `${fieldName} es obligatorio`;
                isValid = false;
            } else if (element.type === 'email' && !isValidEmail(value)) {
                errorMessage = 'Ingresa un correo electrónico válido';
                isValid = false;
            } else if (element.id === 'edad') {
                const age = parseInt(value);
                if (isNaN(age) || age < 1 || age > 120) {
                    errorMessage = 'Por favor, ingresa una edad válida (entre 1 y 120 años)';
                    isValid = false;
                }
            } else if (element.id === 'motivo' && value.length < 10) {
                errorMessage = 'Por favor, describe con más detalle tu motivo de consulta (mínimo 10 caracteres)';
                isValid = false;
            }
            break;
    }
    
    // Mostrar/ocultar error
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
    
    // Cambiar estilo del campo
    if (isValid) {
        element.style.borderColor = '';
    } else {
        element.style.borderColor = '#e53e3e';
    }
    
    return isValid;
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Limpiar errores del formulario
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formFields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Mostrar modal de confirmación
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.add('show');
    
    // Reemplazar iconos en el modal
    feather.replace();
    
    // Cerrar modal al hacer click fuera de él
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('show');
}

// Función global para cerrar modal (llamada desde HTML)
window.closeModal = closeModal;

// Funciones para el modal de emergencia
function openEmergencyForm() {
    const modal = document.getElementById('emergencyModal');
    modal.classList.add('show');
    
    // Reemplazar iconos en el modal
    feather.replace();
    
    // Cerrar modal al hacer click fuera de él
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEmergencyModal();
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeEmergencyModal();
        }
    });
    
    // Configurar formulario de emergencia
    setupEmergencyForm();
}

function closeEmergencyModal() {
    const modal = document.getElementById('emergencyModal');
    modal.classList.remove('show');
}

function setupEmergencyForm() {
    const form = document.getElementById('emergencyForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Evitar múltiples event listeners
    form.removeEventListener('submit', handleEmergencySubmit);
    form.addEventListener('submit', handleEmergencySubmit);
    
    function handleEmergencySubmit(e) {
        e.preventDefault();
        
        // Validar mensaje de emergencia
        const messageField = document.getElementById('emergency-message');
        const messageError = document.getElementById('emergency-message-error');
        
        if (!messageField.value.trim()) {
            messageError.textContent = 'Por favor, describe tu situación para poder orientarte mejor';
            messageField.style.borderColor = '#e53e3e';
            return;
        }
        
        if (messageField.value.trim().length < 20) {
            messageError.textContent = 'Por favor, proporciona más detalles sobre tu situación (mínimo 20 caracteres)';
            messageField.style.borderColor = '#e53e3e';
            return;
        }
        
        // Limpiar errores
        messageError.textContent = '';
        messageField.style.borderColor = '';
        
        // Mostrar estado de carga
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando orientación...';
        
        // Simular envío
        setTimeout(() => {
            // Resetear botón
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar solicitud de orientación';
            
            // Mostrar confirmación específica para emergencia
            showEmergencyConfirmation();
            
            // Limpiar formulario y cerrar modal
            form.reset();
            closeEmergencyModal();
            
        }, 2000);
    }
}

function showEmergencyConfirmation() {
    // Crear modal de confirmación específico para emergencia
    const confirmationHtml = `
        <div class="modal show" id="emergencyConfirmationModal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="success-icon">
                        <i data-feather="heart" style="width: 4rem; height: 4rem; color: #38a169;"></i>
                    </div>
                    <h3>Solicitud de orientación recibida</h3>
                </div>
                <div class="modal-body">
                    <p><strong>Gracias por confiar en mí.</strong> He recibido tu solicitud de orientación urgente.</p>
                    <p>Me pondré en contacto contigo en menos de 24 horas para brindarte la orientación que necesitas y, si es necesario, derivarte a especialistas accesibles o centros de atención de salud mental apropiados.</p>
                    <p><em>Recuerda que este servicio está disponible una vez por usuario y está diseñado para situaciones que requieren orientación inmediata.</em></p>
                    <div class="emergency-info">
                        <div class="info-item">
                            <i data-feather="phone"></i>
                            <span>Si es una emergencia vital, contacta inmediatamente al 131 (SAMU) o 133 (Bomberos)</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-button" onclick="closeEmergencyConfirmation()">Entendido</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHtml);
    feather.replace();
}

function closeEmergencyConfirmation() {
    const modal = document.getElementById('emergencyConfirmationModal');
    if (modal) {
        modal.remove();
    }
}

// Hacer funciones globales
window.openEmergencyForm = openEmergencyForm;
window.closeEmergencyModal = closeEmergencyModal;
window.closeEmergencyConfirmation = closeEmergencyConfirmation;

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Funciones de utilidad
const utils = {
    // Debounce para optimizar eventos que se disparan frecuentemente
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para limitar la frecuencia de ejecución
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Animación de números (para futuros contadores)
    animateNumber: function(element, start, end, duration) {
        const range = end - start;
        const stepTime = Math.abs(Math.floor(duration / range));
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        
        function run() {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            element.textContent = value;
            
            if (value === end) {
                clearInterval(timer);
            }
        }
        
        const timer = setInterval(run, stepTime);
        run();
    }
};

// Optimizar scroll con throttle
const optimizedScrollHandler = utils.throttle(function() {
    // Cualquier lógica adicional de scroll optimizada
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Manejar cambios de tamaño de ventana
const optimizedResizeHandler = utils.debounce(function() {
    // Cerrar menú móvil si está abierto al cambiar a desktop
    if (window.innerWidth > 768) {
        const navMobile = document.getElementById('navMobile');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navMobile.classList.contains('show')) {
            navMobile.classList.remove('show');
            const icon = menuToggle.querySelector('i');
            icon.setAttribute('data-feather', 'menu');
            feather.replace();
        }
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Precargar iconos críticos
function preloadCriticalIcons() {
    const criticalIcons = ['menu', 'x', 'user', 'mail', 'phone', 'check-circle'];
    // Los iconos de Feather se cargan automáticamente, pero podríamos precargar otros recursos aquí
}

// Lazy loading para elementos no críticos
const lazyLoadElements = function() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Cargar contenido lazy aquí
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
};

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadElements);

// Accesibilidad mejorada
function enhanceAccessibility() {
    // Agregar navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        // Navegación con Tab más intuitiva
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Anunciar cambios importantes para lectores de pantalla
    const announceToScreenReader = function(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };
    
    // Hacer la función disponible globalmente
    window.announceToScreenReader = announceToScreenReader;
}

// Inicializar mejoras de accesibilidad
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// CSS para navegación por teclado (se puede agregar dinámicamente)
const keyboardNavigationStyles = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
`;

// Agregar estilos de accesibilidad
const styleSheet = document.createElement('style');
styleSheet.textContent = keyboardNavigationStyles;
document.head.appendChild(styleSheet);

// Analytics básicos (placeholder para futura implementación)
const analytics = {
    trackEvent: function(category, action, label) {
        // Implementar tracking aquí (Google Analytics, etc.)
        console.log('Analytics Event:', { category, action, label });
    },
    
    trackPageView: function(page) {
        // Implementar tracking de página aquí
        console.log('Analytics Page View:', page);
    },
    
    trackFormSubmission: function(formName) {
        this.trackEvent('Form', 'Submit', formName);
    },
    
    trackButtonClick: function(buttonName) {
        this.trackEvent('Button', 'Click', buttonName);
    }
};

// Tracking de eventos importantes
document.addEventListener('DOMContentLoaded', function() {
    // Track formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            analytics.trackFormSubmission('Contact Form');
        });
    }
    
    // Track botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .primary-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            analytics.trackButtonClick(this.textContent.trim());
        });
    });
});

// Performance monitoring básico
const performance = {
    markStart: function(name) {
        if ('performance' in window && 'mark' in window.performance) {
            window.performance.mark(`${name}-start`);
        }
    },
    
    markEnd: function(name) {
        if ('performance' in window && 'mark' in window.performance) {
            window.performance.mark(`${name}-end`);
            window.performance.measure(name, `${name}-start`, `${name}-end`);
        }
    },
    
    getMetrics: function() {
        if ('performance' in window && 'getEntriesByType' in window.performance) {
            const measures = window.performance.getEntriesByType('measure');
            const navigation = window.performance.getEntriesByType('navigation')[0];
            
            return {
                measures: measures,
                loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : null,
                domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : null
            };
        }
        return null;
    }
};

// Monitorear métricas de carga
window.addEventListener('load', function() {
    setTimeout(() => {
        const metrics = performance.getMetrics();
        if (metrics) {
            console.log('Performance Metrics:', metrics);
            // Aquí se pueden enviar métricas a un servicio de monitoreo
        }
    }, 1000);
});

// Service Worker para PWA (opcional, para implementación futura)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Descomentar cuando se implemente el service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

console.log('🧠 Manuel Mella - Psicólogo | Script cargado correctamente');
