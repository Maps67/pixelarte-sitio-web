// public/js/toast.js

// ID Único del Toast
const TOAST_ID = 'toast_matematica_burnout'; 

/**
 * Oculta el toast y guarda el estado en localStorage.
 */
function closeToast(toastElement) {
  toastElement.classList.remove('opacity-100', 'translate-y-0');
  toastElement.classList.add('opacity-0', 'translate-y-2');
  localStorage.setItem(TOAST_ID, 'true');
  
  setTimeout(() => {
    toastElement.style.display = 'none';
  }, 500); 
}

/**
 * Lógica principal: Revisa localStorage y muestra si es necesario.
 * Esta es la función que exportamos.
 */
export function initToast() {
  const toastElement = document.getElementById('toast-notification');
  const closeButton = document.getElementById('toast-close-btn');

  // Si algo falla, salimos.
  if (!toastElement || !closeButton) {
    console.error('Error: Elementos del Toast no encontrados en el DOM.');
    return;
  }

  const isDismissed = localStorage.getItem(TOAST_ID);

  // Si NO ha sido descartado, mostrarlo.
  if (!isDismissed) {
    // Damos la espera de 1.5s
    setTimeout(() => {
      toastElement.classList.remove('opacity-0', 'translate-y-2');
      toastElement.classList.add('opacity-100', 'translate-y-0');
    }, 1500);
  }

  // Siempre añadir el listener del botón de cierre.
  closeButton.addEventListener('click', () => closeToast(toastElement));
}

// Este log SÍ debería aparecer ahora en la consola de producción
console.log('Script del Toast (módulo) cargado.');