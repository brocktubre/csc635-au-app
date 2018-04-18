import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';

@inject (HttpClient)
export class App {

  public year: number;
  public loadingNotes: boolean;

  constructor(private httpClient: HttpClient){
    this.getAllStudents();
    this.year = new Date().getFullYear();
    this.loadingNotes = true;
  }

  getAllStudents(){
    this.httpClient
    .get('http://notesapplication.brocktubre.com/api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      console.log(value);
    });
  }
}
