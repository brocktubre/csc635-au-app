import { Constants } from './../shared/constants';
import { Category } from '../category.model';
import {inject} from 'aurelia-framework';
import { HttpClient, HttpResponseMessage } from 'aurelia-http-client';
import { Notes } from 'notes.model';
import { User } from 'user.model';
import { Router } from 'aurelia-router';

@inject (HttpClient, Router)
export class CategoriesList {

  public loadingCategories: boolean;
  public categories: Array<Category>;

  constructor(private httpClient: HttpClient, private router: Router){
    this.getAllCategories();
    this.loadingCategories = true;
  }

  public getAllCategories(){
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/categories')
    .then((value: any) => {
      this.loadingCategories = false;
      this.categories = JSON.parse(value.response);
      console.log(this.categories);
    });
  }

  public navigateToCreateCategory(){
    this.router.navigateToRoute('create-category');
  }

}

