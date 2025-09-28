import { Routes } from '@angular/router';
import { PagosListComponent as lista } from './features/pagos/pages/pagos-list/pagos-list.component';
import { PagoFormComponent as forms } from './features/pagos/components/pago-form/pago-form.component';
import { pagoGuard } from './guards/pago.guard';
export const routes: Routes = [
    { path: '', component: lista },
    { path: 'features/pago-list', component: lista },
    { path: 'features/pago-forms', component: forms, canActivate: [pagoGuard] }
];
