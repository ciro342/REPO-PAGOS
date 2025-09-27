import { Component, OnInit, ViewChild } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { HttpClient } from '@angular/common/http';
import { TableModule, Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import Swal from 'sweetalert2';
import { AccessService } from '../../services/access.service';
@Component({
  selector: 'app-pagos-list',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, InputTextModule, CalendarModule, ButtonModule, RouterModule,DropdownModule,MultiSelectModule  ],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css'
})
export class PagosListComponent implements OnInit {
  ModalEditar: boolean = false;
  ModalDetalle: boolean = false;
  @ViewChild('dt') dt!: Table;
  pagos: any[] = [];
  pagosFiltrados: any[] = [];
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;
  terminoBusqueda: string = '';
pagoSeleccionado: any = null;
loader: boolean = false;
estadosSeleccionados: any[] = []; // Para dropdown múltiple de estados
empresaSeleccionada: string = ''; // Para dropdown de empresa
empresasDisponibles: any[] = [];
  estados = [
  { label: 'Pendiente', value: 'PENDIENTE' },
  { label: 'Autorizado', value: 'AUTORIZADO' },
  { label: 'Pagado', value: 'PAGADO' }
];
formasPago = [
  { label: 'Efectivo', value: 'EFECTIVO' },
  { label: 'Transferencia', value: 'TRANSFERENCIA' },
  { label: 'Cheque', value: 'CHEQUE' }
];
  constructor(private pagosService: PagosService,private accesService:AccessService) {}

  ngOnInit(): void {
    this.loader = true;
    this.pagosService.getPagos().subscribe({
      next: (data) => {
        console.log('data', data);
        this.pagos = data;
        this.pagosFiltrados = [...data];
        this.empresasDisponibles = this.getEmpresasUnicas(data);
        this.loader = false;

      },
      error: (error) => {
        console.error('Error fetching pagos:', error);
        this.loader = false;
      }
    });
  }

  private getEmpresasUnicas(pagos: any[]): any[] {
  const empresasSet = new Set(pagos.map(p => p.empresa).filter(Boolean));
  return Array.from(empresasSet).map(empresa => ({
    label: empresa,
    value: empresa
  }));
  }

  get totalValor(): number {
    return this.pagosFiltrados.reduce((acc, p) => acc + p.valorOperacion, 0);
  }
  buscarGeneral(event: any): void {
    this.terminoBusqueda = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }
  filtrarPorFecha(): void {
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
  this.fechaDesde = null;
  this.fechaHasta = null;
  this.terminoBusqueda = '';
  this.estadosSeleccionados = []; 
  this.empresaSeleccionada = ''; 
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
  if (inputElement) {
    inputElement.value = '';
  }
  
  this.pagosFiltrados = [...this.pagos];
}
  private aplicarFiltros(): void {
  let resultados = [...this.pagos];

  // Filtro para todos los campos (es para el input grande en busqueda general)
  if (this.terminoBusqueda) {
    resultados = resultados.filter(pago => 
      pago.fecha?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.empresa?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.areaOperacion?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.rubro?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.tercero?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.estadoPago?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.formaPago?.toLowerCase().includes(this.terminoBusqueda) ||
      pago.valorOperacion?.toString().includes(this.terminoBusqueda)
    );
  }

  if (this.estadosSeleccionados.length > 0) {
    resultados = resultados.filter(pago => 
      this.estadosSeleccionados.includes(pago.estadoPago)
    );
  }

  if (this.empresaSeleccionada) {
    resultados = resultados.filter(pago => 
      pago.empresa === this.empresaSeleccionada
    );
  }
  if (this.fechaDesde && this.fechaHasta) {
    resultados = resultados.filter(pago => {
      const fechaPago = new Date(pago.fecha);
      return fechaPago >= this.fechaDesde! && fechaPago <= this.fechaHasta!;
    });
  }

  this.pagosFiltrados = resultados;
}
aplicarFiltrosColumna(): void {
  this.aplicarFiltros();
}
  AbrirModalEditar(pago: any): void {
    this.pagoSeleccionado = { ...pago }; 
    console.log('Pago seleccionado para editar:', this.pagoSeleccionado);
    this.ModalEditar = true;
  } 
  CerrarModalEditar(): void {
    this.ModalEditar = false;
  } 

GuardarEdicion(): void {
  let campoFaltante = '';
  if (!this.pagoSeleccionado.fecha) campoFaltante = 'Fecha';
  else if (!this.pagoSeleccionado.empresa) campoFaltante = 'Empresa';
  else if (!this.pagoSeleccionado.tercero) campoFaltante = 'Tercero';
  else if (!this.pagoSeleccionado.valorOperacion) campoFaltante = 'Valor';
  else if (!this.pagoSeleccionado.estadoPago) campoFaltante = 'Estado del Pago';

  if (campoFaltante) {
    Swal.fire({
      icon: 'error',
      title: 'Campo requerido',
      text: `El campo "${campoFaltante}" es obligatorio.`,
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33'
    });
    return;
  }
  this.pagosService.updatePago(this.pagoSeleccionado);
  this.pagosService.getPagos().subscribe(data => {
    this.pagos = data;
    this.pagosFiltrados = [...data];
    console.log('Pago actualizado:', this.pagoSeleccionado);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El pago ha sido actualizado correctamente.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
  });

  this.CerrarModalEditar();
}


EliminarPago(pago: any): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar el pago de ${pago.tercero} por ${pago.valorOperacion}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.pagosService.deletePago(pago.id);
      this.pagosService.getPagos().subscribe(data => {
        this.pagos = data;
        this.pagosFiltrados = [...data];
        Swal.fire('¡Eliminado!', 'El pago ha sido eliminado.', 'success');
      });
    }
  });
}

viewDetalle(pago: any): void {
    this.pagoSeleccionado = pago;
    console.log('Pago seleccionado para detalle:', this.pagoSeleccionado);
    this.ModalDetalle = true;
  }
CerrarModalDetalle(): void {
    this.ModalDetalle = false;
  }

//----Parte creada con IA para Exportar a csv 
exportarCSV(): void {
  if (this.pagosFiltrados.length === 0) {
    Swal.fire({
      icon: 'info',  
      title: 'Sin registros',
      text: 'No hay datos visibles para exportar. Ajusta los filtros si es necesario.',
      confirmButtonText: 'OK'
    });
    return;
  }
  // Definir los encabezados del CSV
  const headers = [
    'Fecha',
    'Empresa', 
    'Área Operación',
    'Rubro',
    'Tercero',
    'Estado Pago',
    'Forma Pago',
    'Valor Operación'
  ];

  // Convertir los datos a formato CSV
  const csvContent = this.pagosFiltrados.map(pago => {
    return [
      pago.fecha || '',
      pago.empresa || '',
      pago.areaOperacion || '',
      pago.rubro || '',
      pago.tercero || '',
      pago.estadoPago || '',
      pago.formaPago || '',
      pago.valorOperacion || 0
    ].map(field => `"${field}"`).join(',');
  });

  // Agregar encabezados al inicio
  csvContent.unshift(headers.map(header => `"${header}"`).join(','));

  // Crear el contenido completo del CSV
  const csvString = csvContent.join('\n');
  // Crear el blob y descargar
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    // Generar nombre del archivo con fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `pagos_${fechaActual}.csv`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Exportado!',
      text: `Se han exportado ${this.pagosFiltrados.length} registros correctamente.`,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
  }
}

//control para el servicio de acces  , es para simular los rlles que pueda tener un backend 
get puedeCrearPago(): boolean {
  return this.accesService.puedeCrearPago();
}

get puedeEliminarAutorizar(): boolean {
  return this.accesService.puedeEliminarAutorizar();
}

  get rolActivo(): string {
    return this.accesService.getRolActivo();
  }
} 