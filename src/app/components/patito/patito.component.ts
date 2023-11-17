import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patito } from 'src/app/interfaces/patito';
import { PatitoService } from 'src/app/services/patito.service';

@Component({
  selector: 'app-patito',
  templateUrl: './patito.component.html',
  styleUrls: ['./patito.component.css']
})
export class PatitoComponent implements OnInit {

  constructor(
    private patitoService: PatitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  new_patito: Patito = {};
  existing_patito: Patito = {};
  
  action: String = "";
  id: Number = -1;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.action = params.action;
      console.warn(this.action);
      if(this.action === 'edit'){
        this.id = params.id;
        this.getData(this.id);
      }
    });
  }

  getData(id:Number){
    this.patitoService.getPatitoById(id).subscribe((response) => {
      if(response.status === 200){
        this.existing_patito = response.body as Patito;
        console.log(this.existing_patito);
      }
    });
  }

  onSubmit(data: any){
    if(this.action === 'create'){
      console.log("creating...");
      console.log(data);
      this.new_patito.color = data.color;
      this.new_patito.size = data.size;
      this.new_patito.quantity = data.quantity;
      this.new_patito.price = data.price;

      this.patitoService.createPatito(this.new_patito).subscribe(res => {
        if(res.status == 201){
          console.log("Created successfully");
          this.router.navigateByUrl('');
        }
      });
    }
    else if(this.action === 'edit'){
      this.existing_patito.price = data.price;
      this.existing_patito.quantity = data.quantity;

      this.patitoService.updatePatito(this.id, this.existing_patito).subscribe(res => {
        if(res.status == 200){
          console.log("Updated successfully");
          this.router.navigateByUrl('');
        }
      });
    }
  }
}
