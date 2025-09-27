import { Injectable } from '@angular/core';
import { Observable,of  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PagosService {
private apiUrl = 'assets/pagos.json'; 
private storageKey = 'pagos';

  constructor(private http:HttpClient) { }

  getPagos(): Observable<any[]> {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return of(JSON.parse(stored));
    } else {
      return new Observable(observer => {
        this.http.get<any[]>(this.apiUrl).subscribe({
          next: (data) => {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            observer.next(data);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
      });
    }
  }

  savePagos(pagos: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(pagos));
  }

  updatePago(updatedPago: any): void {
  const stored = localStorage.getItem(this.storageKey);
  if (stored) {
    let pagos: any[] = JSON.parse(stored);

    pagos = pagos.map(p => p.id === updatedPago.id ? updatedPago : p);

    this.savePagos(pagos);
  }
}
deletePago(id: number): void {
  const stored = localStorage.getItem(this.storageKey);
  if (!stored) return;

  let pagos: any[] = JSON.parse(stored);
  pagos = pagos.filter(p => p.id !== id); 
  this.savePagos(pagos);
}
}
