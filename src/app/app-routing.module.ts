import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './clientes/cliente-create/cliente-create.component';
import { CuentasListComponent } from './cuentas/cuentas-list/cuentas-list.component';
import { CuentasGenericComponent } from './cuentas/cuentas-generic/cuentas-generic.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, 
  { path: 'clientes', component: ClienteListComponent },
  { path: 'cliente-Nuevo', component: ClienteCreateComponent },
  { path: 'cliente-Editar/:id', component: ClienteCreateComponent },

  { path: 'cuentas/:id', component: CuentasListComponent },
  { path: 'cuenta-Nuevo/:id', component: CuentasGenericComponent },
  { path: 'cuenta-Editar/cuenta/:id', component: CuentasGenericComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
