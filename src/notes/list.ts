import { Constants } from './../shared/constants';
import { Category } from '../category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class NotesList {
  public emptyNotes: string;
  public loadingNotes: boolean;
  public notes: Array<Notes>;

  constructor(private httpClient: HttpClient, private router: Router){
    this.getAllNotes();
    this.loadingNotes = true;
    this.emptyNotes = null;
  }

  public getAllNotes(){
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      this.notes = JSON.parse(value.response);
      if(this.notes.length === 0){
        this.emptyNotes = 'There are no notes to view.';
      }
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

  public removeNote(noteId: number){
    console.log('Trying to remove noteId: ' + noteId);
    this.httpClient
    .delete(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + noteId)
    .then((value: any) => {
      this.getAllNotes();
    });
  }

}

