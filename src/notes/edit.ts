import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { Category } from '../category.model';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Constants } from 'shared/constants';

@inject (HttpClient, Router)
export class NotesEdit  {
  public emptyNotes: string;
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public noteTitle: string;
  public noteNote: string;

  public noteId: number;
  public currentNote: Notes;

  constructor(private httpClient: HttpClient) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
  }

  activate(params, routeData) {
    this.noteId = params.id;
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + this.noteId)
    .then((value: any) => {
      this.currentNote = JSON.parse(value.response);
      this.noteNote = this.currentNote.note;
      this.noteTitle = this.currentNote.title;
      console.log(this.currentNote);
    });
  } 

  editNote(){
    console.log('Updating an existing note.');
    this.submitted = true;
    if (!this.noteNote || !this.noteTitle) {
      this.submitError = 'Please enter in all fields.';
      this.submitted = false;
    }
    else{
      let note = new Notes();
      let user = new User();
      let category = new Category();
  
      
      note.createdOn = new Date();
      note.note = this.noteNote;
      note.title = this.noteTitle;
      note.user = user;
      note.category = category;
  
      console.log('Sending note to API to update. ', note);
      this.httpClient
      .post('http://notesapplication.brocktubre.com/api/v1/notes', note)
      // .post('http://localhost:50364/api/v1/notes', note)
      .then((response) => {
        this.submitSuccess = 'Successfully updated note. ' + note.title;
        console.log(response);
      })
      .catch((error) => {
        this.submitError = 'An error occurred. ';
        console.log(error);
      }).then(r => {
        this.submitted = false;
      });
    }
  }


}
