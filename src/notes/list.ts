import { Category } from '../category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';

@inject (HttpClient)
export class NotesList {

  public loadingNotes: boolean;
  public notes: Array<Notes>;

  constructor(private httpClient: HttpClient){
    this.getAllStudents();
    this.loadingNotes = true;
  }

  getAllStudents(){
    this.httpClient
    .get('http://notesapplication.brocktubre.com/api/v1/notes')
    // .get('http://localhost:50364/api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      this.notes = JSON.parse(value.response);
      console.log(this.notes);
    });
  }

}

