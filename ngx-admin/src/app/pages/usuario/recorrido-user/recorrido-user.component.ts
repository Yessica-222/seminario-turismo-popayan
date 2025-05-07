//import { Component } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Recorrido } from '../../../modelos/recorrido.model';
import { RecorridosService } from '../../../servicios/recorridos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-recorrido-user',
  templateUrl: './recorrido-user.component.html',
  styleUrls: ['./recorrido-user.component.scss']
})
export class RecorridoUserComponent implements OnInit{
  recorridos : Recorrido[];
 imagenes:string[] = [
  '../../../../assets/images/camera1.jpg',
  '../../../../assets/images/camera2.jpg',
  '../../../../assets/images/camera3.jpg',
  '../../../../assets/images/camera4.jpg',
]

  nombresColumnas: string[] = ['Recorridos de Popayán'];
  constructor(private miServicioRecorridos: RecorridosService, private router: Router){}

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioRecorridos.listar().
      subscribe(data => {
        this.recorridos=data;
    });
  }

  //metodo para redirigir de este componente recorrido-user.component.ts a otro componente (info-recorrido-user)
  redirigirAComponente(idRecorrido: number): void {
    // Puedes pasar el ID del recorrido como parámetro si es necesario
    // En este caso, no parece necesario, pero si lo necesitas, puedes usar algo como:
    // this.router.navigate(['/ngx-info-recorrido-user', idRecorrido]);

    this.router.navigate(['/pages/usuario/infoRecorrido']);
  }

}
