import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patito } from '../interfaces/patito';

@Injectable({
  providedIn: 'root'
})
export class PatitoService {

  constructor(private http: HttpClient) { }

  private url: string = "http://localhost:8080";

  getPatitos(){
    return this.http.get(this.url + "/patito", {observe: 'response'});
  }

  getPatitoById(id: Number){
    return this.http.get(this.url + "/patito/id/" + id, {observe: 'response'});
  }

  createPatito(patito: Patito){
    return this.http.post(this.url + "/patito", patito, {observe: 'response'});
  }

  updatePatito(id: Number, patito: Patito){
    return this.http.put(this.url + "/patito/" + id, patito, {observe: 'response'});
  }

  deletePatito(id: Number){
    return this.http.delete(this.url + "/patito/" + id, {observe: 'response'});
  }
}
