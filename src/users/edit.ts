import { Category } from './../category.model';
import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Constants } from 'shared/constants';

@inject (HttpClient, Router)
export class UsersEdit  {
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public userName: string;
  public userEmail: string;
  public userId: number;
  public currentUser: User;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
    this.userName = null;
    this.userEmail = null;
  }


  async activate(params, routeData){

    this.userId = params.id;
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/users/' + this.userId)
    .then((value: any) => {
      this.currentUser = JSON.parse(value.response);
      this.userEmail = this.currentUser.email;
      this.userName = this.currentUser.name;
    });

  }

  updateUser(){
    console.log('Updating user.');
    this.submitted = true;
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.isFormValid()) {
      this.submitted = false;
    }
    else{

      let user = this.currentUser;
      user.email = this.userEmail;
      user.name = this.userName;

      console.log('Sending user to API to update. ', user);
      this.httpClient
      .put(Constants.REMOTE_HTTP_URL + 'api/v1/users/' + user.id, user)
      .then((response) => {
        this.submitSuccess = 'Successfully updated user. ' + user.name + ' -- ' + user.email ;
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
