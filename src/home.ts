import { Category } from './category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';

@inject (HttpClient)
export class App {

  public year: number;
  public loadingNotes: boolean;
  public notes: Array<Notes>;
  public emptyNotes: string;
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public noteTitle: string;
  public noteNote: string;

  constructor(private httpClient: HttpClient){
    this.getAllStudents();
    this.year = new Date().getFullYear();
    this.loadingNotes = true;
    this.emptyNotes = 'There are no notes in your list.';
    this.notes = new Array<Notes>();
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
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

  addNewNote(){
    console.log('Submit new note to API.');
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

      console.log('Sending note to API to save. ', note);
      this.httpClient
      .post('http://notesapplication.brocktubre.com/api/v1/notes', note)
      // .post('http://localhost:50364/api/v1/notes', note)
      .then((response) => {
        this.submitSuccess = 'Successfully submitted note. ' + note.title;
        console.log(response);
      })
      .catch((error) => {
        debugger;
        this.clearFields
        this.submitError = 'An error occurred. ';
        console.log(error);
      }).then(r => {
        this.submitted = false;
        this.clearFields();
      });
    }
  }

  public clearFields(){
      this.noteTitle = null;
      this.noteNote = null;
      this.submitError = null;
      this.submitSuccess = null;
  }
}
