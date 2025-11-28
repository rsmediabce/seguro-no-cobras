// src/utils/alerts.ts
// Utilidades para mostrar alertas y notificaciones al usuario utilizando SweetAlert2

import Swal from 'sweetalert2';

export const showSuccessAlert = (title: string, text: string = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#007bff',
    confirmButtonText: 'Aceptar',
    timer: 3000
  });
};

export const showErrorAlert = (title: string, text: string = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#dc3545',
    confirmButtonText: 'Entendido'
  });
};

export const showConfirmAlert = (title: string, text: string = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#007bff',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  });
};

export const showLoadingAlert = (title: string) => {
  return Swal.fire({
    title,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

export const closeAlert = () => {
  Swal.close();
};

export const showQuoteResultAlert = (insuranceType: string, price: number) => {
  return Swal.fire({
    title: `Cotización ${insuranceType}`,
    html: `
      <div class="text-center">
        <h4 class="text-success">Precio estimado</h4>
        <h2 class="text-primary">$${price.toFixed(2)}/mes</h2>
        <p class="text-muted">Esta cotización es válida por 30 días</p>
      </div>
    `,
    icon: 'info',
    confirmButtonColor: '#007bff',
    confirmButtonText: 'Guardar Cotización',
    showCancelButton: true,
    cancelButtonText: 'Cerrar'
  });
};