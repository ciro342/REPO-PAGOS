import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button'
import { PagosService } from '../../services/pagos.service';  
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './pago-form.component.html',
  styleUrl: './pago-form.component.css'
})

export class PagoFormComponent {
    pagoForm!: FormGroup;

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

  constructor(private fb: FormBuilder,
    private pagosService:PagosService,
    private router:Router,
) { }
  
  volver(): void {
  this.router.navigate(['features/pago-list']);
}
  ngOnInit():void{
this.pagoForm = this.fb.group({
      fecha: [null, Validators.required],
      empresa: [null, Validators.required],
      tercero: [null, [Validators.required, Validators.minLength(3)]],
      valorOperacion: [0, [Validators.required, Validators.min(1)]],
      estadoPago: [null, Validators.required],
      formaPago: [null],
      tienePresupuesto: [false],
      rubro: [''],
      factura: [null],
      soporte: [null]
});
} 

  guardar() {
    if (this.pagoForm.valid) {
      const nuevoPago = {
        id: 'P-' + Math.floor(Math.random() * 10000), //esta vaina es pal id mock
        ...this.pagoForm.value,
        trazabilidad: [
          { usuario: 'mockUser', fecha: new Date().toISOString(), nota: 'Creado' }
        ]
      };

      this.pagosService.getPagos().subscribe((pagos) => {
        const actualizados = [...pagos, nuevoPago];

        this.pagosService.savePagos(actualizados);

        Swal.fire({
          title: '¡Pago guardado!',
          text: 'El pago fue registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.pagoForm.reset();
      });
    }
  }





}