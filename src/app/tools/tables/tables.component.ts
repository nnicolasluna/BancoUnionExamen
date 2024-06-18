import { Component, Input } from '@angular/core';
import { ServiceGenericService } from 'src/app/tools/services/service-generic.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  @Input() dataSource: any = [];
  @Input() displayedColumns: string[] = [];
  @Input() editar: any;
  @Input() listarCuentas: any;
  @Input() borrar: any;


  constructor(
    private apiService: ServiceGenericService<any>,
    private router: Router,
  ) { }
  borrarRegistro(borrar: string, uuid: string) {
    this.apiService.delete(borrar,uuid).subscribe(
      {
        next: () => {
          this.router.navigateByUrl('/');
        },
      }
    )
  }
}
