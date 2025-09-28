import { Injectable } from '@angular/core';

export const ACCESS = {
  PAGOS: { 
    SOLICITAR: false, 
    AUTORIZAR: false, 
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

   // NUEVO: Cambiar permisos
  cambiarPermisos(solicitar: boolean, autorizar: boolean): void {
    ACCESS.PAGOS.SOLICITAR = solicitar;
    ACCESS.PAGOS.AUTORIZAR = autorizar;
  }

  // NUEVO: Roles rápidos
  setRolAdmin(): void {
    this.cambiarPermisos(true, true);
  }

  setRolSolicitante(): void {
    this.cambiarPermisos(true, false);
  }

  setRolAutorizador(): void {
    this.cambiarPermisos(false, true);
  }

  setRolSinPermisos(): void {
    this.cambiarPermisos(false, false);
  }

}