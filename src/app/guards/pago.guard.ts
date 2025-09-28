import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccessService } from '../features/pagos/services/access.service';

export const pagoGuard: CanActivateFn = (route, state) => {
  const accessService = inject(AccessService);
  const router = inject(Router);

//  console.log('¿Puede crear pago?', accessService.puedeCrearPago());

  if (accessService.puedeCrearPago()) {
    return true;
  } else {
Swal.fire({
      title: 'Acceso Denegado',
      text: 'No tienes permisos para crear pagos',
      icon: 'error',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#ef4444',
      timer: 3000,
      timerProgressBar: true
    });    router.navigate(['features/pago-list']);
    return false;
  }
};