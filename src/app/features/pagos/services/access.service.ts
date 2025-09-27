import { Injectable } from '@angular/core';

export const ACCESS = {
  PAGOS: { 
    SOLICITAR: true, 
    AUTORIZAR: true, 
  }
};

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor() { }

  puedeCrearPago(): boolean {
    return ACCESS.PAGOS.SOLICITAR;
  }

  puedeEliminarAutorizar(): boolean {
    return ACCESS.PAGOS.AUTORIZAR;
  }

  getRolActivo(): string {
    const permisos = [];
    if (ACCESS.PAGOS.SOLICITAR) permisos.push('SOLICITAR');
    if (ACCESS.PAGOS.AUTORIZAR) permisos.push('AUTORIZAR'); 
    
    return permisos.length > 0 ? permisos.join(' | ') : 'SIN PERMISOS';
  }
}