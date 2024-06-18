import { Component } from '@angular/core';
import { cuentaDTO } from '../cuentas-model/cuenta';
import { ServiceGenericService } from 'src/app/tools/services/service-generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.scss']
})
export class CuentasListComponent {
  uuid =this.route.snapshot.paramMap.get('id')
  private endPoint_listar = 'cuenta'
  registros_cuenta: cuentaDTO[] = []
  registros_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private apiService: ServiceGenericService<cuentaDTO>,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getAll()
  }
  getClienteUUID(){
    return this.route.snapshot.paramMap.get('id');
  }
  getAll() {
    let uuid = this.route.snapshot.paramMap.get('id');
    if (uuid != null) {
      this.apiService.getAllbyOne(this.endPoint_listar+'/cliente', uuid).subscribe(
        {
          next: data => {
            this.registros_cuenta = data
            this.registros_dataSource = new MatTableDataSource<cuentaDTO>(this.registros_cuenta);
          }
        }
      )
    }
  }
}
