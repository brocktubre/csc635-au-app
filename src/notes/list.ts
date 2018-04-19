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
  public showDeletedNotes: boolean;
  public anyDeletedNotes: boolean;
  public numberOfDeletedNotes: number;

  constructor(private httpClient: HttpClient, private router: Router){
    this.getAllNotes();
    this.loadingNotes = true;
    this.emptyNotes = null;
    this.showDeletedNotes = false;
    this.anyDeletedNotes = false;
    this.numberOfDeletedNotes = 0;
  }

  public getAllNotes(){
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/notes')
    .then((value: any) => {
      this.loadingNotes = false;
      this.anyDeletedNotes = false;
      this.notes = JSON.parse(value.response);
      if(this.notes.length === 0 ){
        this.emptyNotes = 'There are no notes to view.';
      }
      else{
        this.notes.forEach((n) => {
          if(n.isDeleted){
            this.numberOfDeletedNotes++;
            this.anyDeletedNotes = true;
          }
        });
  
        if(this.numberOfDeletedNotes === this.notes.length){
          this.emptyNotes = 'There are no notes to view.';
        }
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

  public removeNote(note: Notes){
    console.log('Trying to remove noteId: ' + note.id);
    note.isDeleted = true;
    this.httpClient
    .put(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + note.id, note)
    .then((value: any) => {
      this.getAllNotes();
    });
  }

  public permanentlyRemoveNote(noteId: number){
    console.log('Trying to remove noteId: ' + noteId);
    this.httpClient
    .delete(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + noteId)
    .then((value: any) => {
      this.getAllNotes();
    });
  }

  public toggleDeletedNotes(){
    this.showDeletedNotes = !this.showDeletedNotes;
  }

}

