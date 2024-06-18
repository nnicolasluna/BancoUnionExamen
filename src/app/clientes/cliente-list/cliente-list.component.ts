import { Component } from '@angular/core';
import { ServiceGenericService } from 'src/app/tools/services/service-generic.service';
import { clienteDTO } from '../cliente-model/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent {
  private endPoint_listar = 'cliente'
  registros_cliente: clienteDTO[] = []
  registros_dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private apiService: ServiceGenericService<clienteDTO>
  ) { }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.apiService.getAll(this.endPoint_listar).subscribe(
      {
        next: data => {
          this.registros_cliente = data
          this.registros_dataSource = new MatTableDataSource<clienteDTO>(this.registros_cliente);
        }
      }
    )
  }
}
