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
  public categoryValue: Category;
  public userValue: User;

  public noteId: number;
  public currentNote: Notes;

  public categoryList: Array<Category>;
  public userList: Array<User>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
  }

  async activate(params, routeData) {
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/users/')
    .then((value: any) => {
      this.userList = JSON.parse(value.response);
    });

    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/categories/')
    .then((value: any) => {
      this.categoryList = JSON.parse(value.response);
    });

    this.noteId = params.id;
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + this.noteId)
    .then((value: any) => {
      this.currentNote = JSON.parse(value.response);
      this.noteNote = this.currentNote.note;
      this.noteTitle = this.currentNote.title;
      this.categoryValue = this.currentNote.category;
      this.userValue = this.currentNote.user;
      console.log(this.currentNote);
    });
  }

  updateNote(){
    console.log('Updating exsiting note.');
    this.submitted = true;
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.isFormValid()) {
      this.submitError = 'Please enter in all fields.';
      this.submitted = false;
    }
    else{
      let note = this.currentNote;
      
      note.note = this.noteNote;
      note.title = this.noteTitle;
      note.user = this.userValue;
      note.category = this.categoryValue;

      console.log('Sending note to API to update. ', note);
      this.httpClient
      .put(Constants.REMOTE_HTTP_URL + 'api/v1/notes/' + note.id, note)
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

  private userDropdownChanged(value: any){
    this.userValue = value;
  }

  private categoryDropdownChanged(value: any){
    this.categoryValue = value;
  }

  private navigateToNotes(){
    this.router.navigateToRoute('notes');
  }

  private isFormValid(){
    if (!this.noteNote
        || !this.noteTitle
        || this.userValue === null
        || this.categoryValue === null ) {
          return false;
    }
    return true;
  }


}
