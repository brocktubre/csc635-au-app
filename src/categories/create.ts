import { Category } from './../category.model';
import { HttpClient } from 'aurelia-http-client';
import { Notes } from "notes.model";
import { User } from '../user.model';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Constants } from 'shared/constants';

@inject (HttpClient, Router)
export class CategoriesCreate  {
  public submitted: boolean;
  public submitError: string;
  public submitSuccess: string;

  public categoryName: string;


  constructor(private httpClient: HttpClient, private router: Router) {
    this.submitted = false;
    this.submitError = null;
    this.submitSuccess = null;
    this.categoryName = null;
  }

  async activate(){

  }

  addNewCategory(){
    console.log('Submit new category to API.');
    this.submitted = true;
    this.submitError = null;
    this.submitSuccess = null;
    if (!this.isFormValid()) {
      this.submitError = 'Please enter in category name.';
      this.submitted = false;
    }
    else{

      let category = new Category();
      category.name = this.categoryName;

      console.log('Sending category to API to save. ', category);
      this.httpClient
      .post(Constants.REMOTE_HTTP_URL + 'api/v1/categories', category)
      .then((response) => {
        this.submitSuccess = 'Successfully created new category. ' + category.name;
        this.submitted = false;
        this.categoryName = null;
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
