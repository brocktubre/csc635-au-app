import { Constants } from './../shared/constants';
import { Category } from '../category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class UsersList {
  public errorMessage: string;
  public loadingUsers: boolean;
  public users: Array<User>;

  constructor(private httpClient: HttpClient, private router: Router){
    this.getAllUsers();
    this.loadingUsers = true;
    this.errorMessage = null;
  }

  public getAllUsers(){
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/users')
    .then((value: any) => {
      this.loadingUsers = false;
      this.users = JSON.parse(value.response);
      console.log(this.users);
      this.errorMessage = null;
    });
  }

  public navigateToCreateUser(){
    this.router.navigateToRoute('create-user');
  }

  public removeUser(userId: number){
    console.log('Trying to remove userId: ' + userId);
    if(this.users.length === 1){
      this.errorMessage = 'Operation not allowed. Must have at least one user.';
    }
    else{

    this.httpClient
    .delete(Constants.REMOTE_HTTP_URL + 'api/v1/users/' + userId)
    .then((value: any) => {
      this.getAllUsers();
    });
    }
  }

}

