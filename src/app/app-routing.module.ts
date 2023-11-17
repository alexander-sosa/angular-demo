import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatitoComponent } from './components/patito/patito.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "patito", component: PatitoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
