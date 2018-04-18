import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';

@inject (HttpClient)
export class App {

  public year: number;
  public loadingNotes: boolean;
  public notes: Array<Notes>;
  public emptyNotes: string;

  constructor(private httpClient: HttpClient){
    this.getAllStudents();
    this.year = new Date().getFullYear();
    this.loadingNotes = true;
    this.emptyNotes = 'There are no notes in you list';
  }

  getAllStudents(){
    this.httpClient
    .get('http://notesapplication.brocktubre.com/api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      this.notes = value.response;
      debugger;
      console.log(this.notes);
    });
  }
}
