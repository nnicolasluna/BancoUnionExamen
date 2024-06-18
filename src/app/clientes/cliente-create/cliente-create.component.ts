import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceGenericService } from 'src/app/tools/services/service-generic.service';
import { clienteDTO } from '../cliente-model/cliente';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss']
})
export class ClienteCreateComponent {
  private endPoint_crear = 'cliente'
  uuid: string = ''
  constructor(
    private apiService: ServiceGenericService<clienteDTO>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getOne()
  }
  formGroup = new FormGroup({
    uuid: new FormControl(''),
    nombre: new FormControl('', [Validators.required,]),
    paterno: new FormControl('', [Validators.required,]),
    materno: new FormControl('', [Validators.required,]),
    tipoDocumento: new FormControl('', [Validators.required,]),
    documentoIdentidad: new FormControl('', [Validators.required,]),
    fechaNacimiento: new FormControl('', [Validators.required,]),
    genero: new FormControl('', [Validators.required,]),
  });
  guardarDatos() {

    if (this.route.snapshot.paramMap.get('id') == null) {

      this.apiService.create(this.endPoint_crear, this.formGroup.value as clienteDTO).subscribe(
        {
          next: () => {
            // this.router.navigateByUrl('/clientes');
            this.formGroup.reset();
          },
          complete: () => {
            this.router.navigateByUrl('/clientes');
          }
        }
      )
    }
    else {
      this.formGroup.value.uuid = this.route.snapshot.paramMap.get('id')
      this.apiService.update(this.endPoint_crear, this.formGroup.value as clienteDTO).subscribe(
        {
          next: () => {
            // this.router.navigateByUrl('/clientes');
            this.formGroup.reset();
          },
          complete: () => {
            this.router.navigateByUrl('/clientes');
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
