import { Category } from './../category.model';
import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class NotesCreate  {
  public emptyNotes: string;
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public noteTitle: string;
  public noteNote: string;

  public categoryList: Array<Category>;
  public userList: Array<User>;

  public selectedUserDD: string;
  public selectedCategoryDD: string;


  constructor(private httpClient: HttpClient) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
    this.categoryList =  new Array<Category>();
    this.userList = new Array<User>();
    this.selectedUserDD = null;
    this.selectedCategoryDD = null;
  }

  async activate(){
    this.categoryList.push(new Category());
    let cat = new Category();
    cat.id = 500;
    cat.name = 'Brock';
    this.categoryList.push(cat);

    this.httpClient
    .get('http://notesapplication.brocktubre.com/api/v1/users/')
    // .get('http://localhost:50364/api/v1/notes')
    .then((value: any) => {
      this.userList = JSON.parse(value.response);
    });
  }

  addNewNote(){
    console.log('Submit new note to API.');
    this.submitted = true;
    this.submitError = null;
    if (!this.isFormValid()) {
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
        this.submitError = 'An error occurred. Please try again.';
        this.submitted = false;
        console.log(error);
      });
    }
  }
  
  public clearFields(){
      this.noteTitle = null;
      this.noteNote = null;
      this.submitSuccess = null;
      this.selectedCategoryDD = null;
      this.selectedUserDD = null;
  }

  private isFormValid(){
    if (!this.noteNote
        || !this.noteTitle
        || this.selectedUserDD === null
        || this.selectedCategoryDD === null ) {
          return false;
    }
    return true;
  }

  private userDropdownChanged(value: any){
    this.selectedUserDD = value;
  }

  private categoryDropdownChanged(value: any){
    this.selectedCategoryDD = value;
  }

}
