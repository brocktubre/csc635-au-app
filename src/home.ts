import { Category } from './category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class Home {
    constructor(private httpClient: HttpClient, private router: Router){

    }
    public navigateToUsers(){
      this.router.navigateToRoute('users');
    }
    public navigateToNotes(){
      this.router.navigateToRoute('notes');
    }
    public navigateToCategories(){
      this.router.navigateToRoute('categories');
    }
}
