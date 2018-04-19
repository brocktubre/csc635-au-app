import { Constants } from './../shared/constants';
import { Category } from '../category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class NotesList {

  public loadingNotes: boolean;
  public notes: Array<Notes>;

  constructor(private httpClient: HttpClient, private router: Router){
    this.getAllStudents();
    this.loadingNotes = true;
  }

  public getAllStudents(){
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      this.notes = JSON.parse(value.response);
      console.log(this.notes);
    });
  }

  public navigateToCreateNote(){
    this.router.navigateToRoute('create-note');
  }

  public editNote(noteId: number){
    console.log('Trying to edit noteId: ' + noteId);
    this.router.navigateToRoute('edit-note', { id: noteId });
  }

}

