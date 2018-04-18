import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';

@inject (HttpClient)
export class App {

  public year: number;
  public loadingNotes: boolean;
  public notes: Array<Notes>;
  public emptyNotes: string;
  public submitted: boolean;
  public submitError: string;

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
  }

  getAllStudents(){
    this.httpClient
    .get('http://notesapplication.brocktubre.com/api/v1/notes')
    .then((value: any) => {
      debugger;
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
      note.note = this.noteNote;
      note.title = this.noteTitle;
      console.log('Sending note to API to save.' + note);
      // this.httpClient
      // .get('http://notesapplication.brocktubre.com/api/v1/notes')
      // .then((value: any) => {
      //   debugger;
      //   this.loadingNotes = false;
      //   this.notes = JSON.parse(value.response);
      //   console.log(this.notes);
      // });
    }



  }
}
