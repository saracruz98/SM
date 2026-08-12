/**
 * SST - Script principal del sitio
 * 
 * Contiene la lógica de la interfaz de usuario:
 * 1. Visor de imágenes ampliado (Lightbox)
 * 2. Filtros interactivos para la galería fotográfica
 */

document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initGalleryFilters();
});

/**
 * Inicializa la funcionalidad del visor de imágenes (Lightbox)
 */
const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const btnCerrar = lightbox.querySelector('.lightbox-cerrar');
    const imagenesClicables = document.querySelectorAll('[data-lightbox]');

    // Función para abrir la imagen
    const abrirLightbox = (img) => {
        lightboxImg.src = img.getAttribute('src');
        lightboxImg.alt = img.getAttribute('alt') || '';
        lightboxCaption.textContent = img.getAttribute('data-caption') || img.getAttribute('alt') || '';
        lightbox.classList.add('abierto');
    };

    // Función para cerrar la imagen
    const cerrarLightbox = () => {
        lightbox.classList.remove('abierto');
        // Limpiamos el src con un pequeño retraso para permitir que termine la animación css de cierre
        setTimeout(() => { 
            if(!lightbox.classList.contains('abierto')) {
                lightboxImg.src = ''; 
            }
        }, 300);
    };

    // --- Asignación de Eventos ---

    // Clic en cada imagen miniatura
    imagenesClicables.forEach(img => {
        img.addEventListener('click', () => abrirLightbox(img));
    });

    // Clic en el botón de cerrar
    btnCerrar.addEventListener('click', cerrarLightbox);

    // Clic fuera de la imagen (en el fondo oscuro)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    // Accesibilidad: cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('abierto')) {
            cerrarLightbox();
        }
    });
};

/**
 * Inicializa los filtros de la galería por categoría de riesgo
 */
const initGalleryFilters = () => {
    const filtros = document.querySelectorAll('.filtro-btn');
    const figuras = document.querySelectorAll('.imagenes figure');

    if (!filtros.length || !figuras.length) return;

    filtros.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const botonActual = e.currentTarget;
            const categoriaSeleccionada = botonActual.getAttribute('data-filtro');

            // 1. Actualizar estado visual de los botones
            filtros.forEach(b => b.classList.remove('activo'));
            botonActual.classList.add('activo');

            // 2. Filtrar las imágenes correspondientes
            figuras.forEach(fig => {
                const categoriaFigura = fig.getAttribute('data-categoria');
                const coincide = (categoriaSeleccionada === 'todos' || categoriaFigura === categoriaSeleccionada);
                
                // Mostramos u ocultamos manipulando la propiedad display
                fig.style.display = coincide ? '' : 'none';
            });
        });
    });
};
