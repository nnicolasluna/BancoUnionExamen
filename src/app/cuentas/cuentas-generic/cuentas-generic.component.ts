import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceGenericService } from 'src/app/tools/services/service-generic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { cuentaDTO } from '../cuentas-model/cuenta';
@Component({
  selector: 'app-cuentas-generic',
  templateUrl: './cuentas-generic.component.html',
  styleUrls: ['./cuentas-generic.component.scss']
})
export class CuentasGenericComponent {
  private endPoint_crear = 'cuenta'
  uuid: string = ''
  uuidCliente=this.route.snapshot.paramMap.get('id')
  constructor(
    private apiService: ServiceGenericService<cuentaDTO>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getOne()
  }
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    tipoProducto: new FormControl('', [Validators.required,]),
    numeroCuenta: new FormControl('', [Validators.required,]),
    moneda: new FormControl('', [Validators.required,]),
    monto: new FormControl(0, [Validators.required,]),
    sucursal: new FormControl('', [Validators.required,]),
    createdAt: new FormControl(''),
    estado: new FormControl(true),
    cliente: new FormControl(''),
   
  });
  
  guardarDatos() {

    /* if (this.route.snapshot.paramMap.get('id') == null) { */
    if (this.route.snapshot.routeConfig?.path == 'cuenta-Nuevo/:id') {
      this.formGroup.value.cliente = this.route.snapshot.paramMap.get('id')
      this.apiService.create(this.endPoint_crear, this.formGroup.value as cuentaDTO).subscribe(
        {
          next: () => {
            // this.router.navigateByUrl('/clientes');
            this.formGroup.reset();
          },
          complete: () => {
            this.router.navigate(['/cuentas/', this.route.snapshot.paramMap.get('id')])
            //this.router.navigateByUrl('/clientes');
          }
        }
      )
    }
    else {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id')

      let clienteUUID = this.formGroup.value.cliente
      this.apiService.update(this.endPoint_crear, this.formGroup.value as cuentaDTO).subscribe(
        {
          next: () => {
            // this.router.navigateByUrl('/clientes');
            this.formGroup.reset();
          },
          complete: () => {
            
            //this.router.navigateByUrl('/clientes');
            this.router.navigate(['/cuentas/', clienteUUID])
          }
        }
      )
    }
  }
  getOne() {

    let uuid = this.route.snapshot.paramMap.get('id');
    if (uuid != null) {
      this.apiService.getOne(this.endPoint_crear, uuid).subscribe(
        {
          next: data => {
            this.formGroup.patchValue(data);
            
          }
        }
      )
    } else {
      this.formGroup.reset();
    }
  }
}
