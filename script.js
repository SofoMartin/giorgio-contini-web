document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DEL MENÚ HAMBURGUESA PARA CELULARES
    const menuToggle = document.getElementById('mobile-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navContainer) {
        // Al hacer clic en el botón, abre/cierra el menú móvil
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navContainer.classList.toggle('active');
        });

        // Si se hace clic en cualquier enlace, cierra automáticamente el menú para mostrar la sección
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
            });
        });
    }


    // LÓGICA DE FILTRADO INTERACTIVO DEL PORTFOLIO
    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    const itemsGaleria = document.querySelectorAll('.galeria-item');

    // Función encargada de aplicar el filtro visual
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

    // CORRECCIÓN: Inicializa mostrando 'arte' por defecto en lugar de 'arquitectura'
    aplicarFiltro('arte');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            const filtroSeleccionado = boton.getAttribute('data-filtro');
            aplicarFiltro(filtroSeleccionado);
        });
    });


    // LÓGICA DEL CARRUSEL (ANTES / DESPUÉS)
    const btnPrev = document.getElementById('carrusel-prev');
    const btnNext = document.getElementById('carrusel-next');
    const estadoAntes = document.getElementById('estado-antes');
    const estadoDespues = document.getElementById('estado-despues');
    const etiqueta = document.getElementById('carrusel-etiqueta');

    if (btnPrev && btnNext && estadoAntes && estadoDespues && etiqueta) {
        let mostrandoAntes = true;

        function cambiarEstado(mostrarAntes, dirDesde) {
            if (mostrandoAntes === mostrarAntes) return;

            const saliente = mostrandoAntes ? estadoAntes : estadoDespues;
            const entrante = mostrarAntes ? estadoAntes : estadoDespues;
            const claseSalida = dirDesde === 'izq' ? 'saliendo-izq' : 'saliendo-der';

            saliente.classList.add(claseSalida);
            saliente.classList.remove('activo-estado');

            setTimeout(() => {
                saliente.classList.remove(claseSalida);
                entrante.style.transform = dirDesde === 'izq' ? 'translateX(-40px)' : 'translateX(40px)';
                entrante.classList.add('activo-estado');
                entrante.style.transform = '';
            }, 300);

            // ACTUALIZACIÓN DE TEXTO SOLICITADO
            etiqueta.style.opacity = '0';
            setTimeout(() => {
                etiqueta.textContent = mostrarAntes ? 'Restauración de inmuebles - Antes' : 'Restauración de inmuebles - Después';
                etiqueta.style.opacity = '1';
            }, 220);

            mostrandoAntes = mostrarAntes;
        }

        btnPrev.addEventListener('click', () => {
            if (!mostrandoAntes) cambiarEstado(true, 'der');
        });

        btnNext.addEventListener('click', () => {
            if (mostrandoAntes) cambiarEstado(false, 'izq');
        });
    }


    // CONTROL DEL FORMULARIO DE CONTACTO
    const formulario = document.getElementById('formContacto');
    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('¡Muchas gracias por su mensaje! Giorgio Contini se pondrá en contacto con usted a la brevedad.');
            formulario.reset();
        });
    }
});
