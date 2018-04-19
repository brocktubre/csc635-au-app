import { Category } from './../category.model';
import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Constants } from 'shared/constants';

@inject (HttpClient, Router)
export class UsersCreate  {
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public userName: string;
  public userEmail: string;


  constructor(private httpClient: HttpClient, private router: Router) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
    this.userName = null;
    this.userEmail = null;
  }

  async activate(){

  }

  addNewUser(){
    console.log('Submit new user to API.');
    this.submitted = true;
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.isFormValid()) {
      this.submitted = false;
    }
    else{

      let user = new User();
      user.name = this.userName;
      user.email = this.userEmail;
      user.createdOn = new Date();

      console.log('Sending user to API to save. ', user);
      this.httpClient
      .post(Constants.REMOTE_HTTP_URL + 'api/v1/users', user)
      .then((response) => {
        this.submitSuccess = 'Successfully created new user. ' + user.name + ' -- ' + user.email ;
        this.submitted = false;
        this.clearFields();
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
      this.userName = null;
      this.userEmail = null;
  }

  private isFormValid(){
    if (!this.userName || !this.userEmail) {
          this.submitError = 'Please enter in all fields.';
          return false;
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid =  re.test(String(this.userEmail).toLowerCase());
    if (!valid){
      this.submitError = 'Invalid email format.';
      return false;
    }
    return true;
  }

  public navigateToUsers(){
    this.router.navigateToRoute('users');
  }

}
