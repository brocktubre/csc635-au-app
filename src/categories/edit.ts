import { Category } from './../category.model';
import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Constants } from 'shared/constants';

@inject (HttpClient, Router)
export class CategoriesEdit  {
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public categoryName: string;
  public categoryId: number;
  public currentCategory: Category;


  constructor(private httpClient: HttpClient, private router: Router) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
    this.categoryName = null;
  }

  async activate(params, routeData){

    this.categoryId = params.id;
    this.httpClient
    .get(Constants.REMOTE_HTTP_URL + 'api/v1/categories/' + this.categoryId)
    .then((value: any) => {
      this.currentCategory = JSON.parse(value.response);
      this.categoryName = this.currentCategory.name;
    });

  }

  updateCategory(){
    console.log('Updating category.');
    this.submitted = true;
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.isFormValid()) {
      this.submitError = 'Please enter in category name.';
      this.submitted = false;
    }
    else{
      let cat = this.currentCategory;
      cat.name = this.categoryName;

      console.log('Sending category to API to update. ', cat);
      this.httpClient
      .put(Constants.REMOTE_HTTP_URL + 'api/v1/categories/' + cat.id, cat)
      .then((response) => {
        this.submitSuccess = 'Successfully updated category. ' + cat.name;
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
      this.categoryName = null;
  }

  private isFormValid(){
    if (!this.categoryName) {
          return false;
    }
    return true;
  }

  public navigateToCategories(){
    this.router.navigateToRoute('categories');
  }

}
