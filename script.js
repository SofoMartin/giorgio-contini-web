document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DEL MENÚ HAMBURGUESA PARA CELULARES
    const menuToggle = document.getElementById('mobile-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navContainer.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
            });
        });
    }


    // LÓGICA DE FILTRADO INTERACTIVO Y DESPLAZAMIENTO DEL PORTFOLIO
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const itemsGaleria = document.querySelectorAll('.galeria-item');
    const galeriaGrid = document.querySelector('.galeria-grid');

    function aplicarFiltro(filtro) {
        itemsGaleria.forEach(item => {
            const categoria = item.getAttribute('data-categoria');
            
            if (categoria === filtro) {
                item.style.display = 'block';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease';
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Filtro por defecto al cargar la página
    aplicarFiltro('autoria');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Actualizar clase activa en la tarjeta seleccionada
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            
            // Aplicar filtro de imágenes
            const filtroSeleccionado = boton.getAttribute('data-filtro');
            aplicarFiltro(filtroSeleccionado);

            // Desplazamiento suave hacia las imágenes
            if (galeriaGrid) {
                galeriaGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // CONTROL DEL FORMULARIO DE CONTACTO
    const formulario = document.getElementById('formContacto');
    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('¡Muchas gracias por su mensaje! Giorgio Contini se pondrá en contacto con usted a la brevedad.');
            formulario.reset();
        });
    }


    // LÓGICA DEL LIGHTBOX CON CAPTURA DEL BOTÓN ATRÁS (MOBILE)
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const botonCerrar = document.querySelector('.lightbox-cerrar');

    let lightboxAbierto = false;

    // Abrir el visor y registrar la navegación ficticia en el historial
    function abrirLightbox(imgSrc, imgAlt, captionHtml) {
        lightbox.style.display = 'block';
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxCaption.innerHTML = captionHtml;

        if (!lightboxAbierto) {
            lightboxAbierto = true;
            history.pushState({ lightboxOpen: true }, '');
        }
    }

    // Cerrar el visor de forma limpia
    function cerrarLightbox(desdeHistorial = false) {
        if (!lightboxAbierto) return;

        lightbox.style.display = 'none';
        lightboxAbierto = false;

        // Si se cerró con el botón X o la zona oscura, limpiamos la entrada creada en el historial
        if (!desdeHistorial && window.history.state && window.history.state.lightboxOpen) {
            history.back();
        }
    }

    // Clic en elementos de la galería
    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.querySelector('iframe')) return;

            const img = item.querySelector('img');
            const overlay = item.querySelector('.galeria-overlay');

            if (img && lightbox) {
                const caption = overlay ? overlay.innerHTML : '';
                abrirLightbox(img.src, img.alt, caption);
            }
        });
    });

    // Cerrar con el botón "X"
    if (botonCerrar) {
        botonCerrar.addEventListener('click', () => cerrarLightbox(false));
    }

    // Cerrar al tocar el fondo oscuro
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                cerrarLightbox(false);
            }
        });
    }

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxAbierto) {
            cerrarLightbox(false);
        }
    });

    // Detectar el botón "Atrás" del celular/navegador
    window.addEventListener('popstate', () => {
        if (lightboxAbierto) {
            cerrarLightbox(true);
        }
    });
});
