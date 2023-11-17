import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patito } from 'src/app/interfaces/patito';
import { PatitoService } from 'src/app/services/patito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private patitoService: PatitoService,
    private router: Router
  ) { }

  patitos: Patito[] = [];

  ngOnInit(): void {
    this.getPatitosList();
  }

  getPatitosList(){
    this.patitoService.getPatitos().subscribe(res => {
      this.patitos = res.body as Patito[];
    });
  }

  callUpdatePage(id: any){
    this.router.navigate(
      ['/patito'],
      { queryParams: {action: 'edit', id: id} }
    );
  }

  deletePatito(id: any){
    var res = confirm("Esta seguro de eliminar el registro con id " + id + "?");
    if(res == true){
      this.patitoService.deletePatito(id).subscribe(res => {
        if(res.status === 200){
          console.log(res.body);
          window.location.reload();
        }
      });
    }
  }

}
