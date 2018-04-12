import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';

@inject (HttpClient)
export class App {

  constructor(private httpClient: HttpClient){
    this.getAllStudents();
  }

  getAllStudents(){
    this.httpClient
    .get('http://orbit.brocktubre.com/orbit-api/all-students')
    .then((value: any) => {
      console.log(value);
    });
  }
}