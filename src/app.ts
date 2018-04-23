import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
  public year: number;
  public router: Router;
  public data: string;
  constructor(){
    this.data = 'Hello World!';
    this.year = new Date().getFullYear();
  }

  // public configureRouter(config: RouterConfiguration, router: Router){
  //   this.router = router;
  //   config.title = 'CSC 635 - Final App';
  //   config.map([
  //     { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home') },

  //     { route: ['notes'], name: 'notes', moduleId: PLATFORM.moduleName('./notes/list') },
  //     { route: ['create-note'], name: 'create-note', moduleId: PLATFORM.moduleName('./notes/create') },
  //     { route: ['edit-note/:id'], name: 'edit-note', moduleId: PLATFORM.moduleName('./notes/edit') },

  //     { route: ['users'], name: 'users', moduleId: PLATFORM.moduleName('./users/list') },
  //     { route: ['create-user'], name: 'create-user', moduleId: PLATFORM.moduleName('./users/create') },
  //     { route: ['edit-user/:id'], name: 'edit-user', moduleId: PLATFORM.moduleName('./users/edit') },

  //     { route: ['categories'], name: 'categories', moduleId: PLATFORM.moduleName('./categories/list') },
  //     { route: ['create-category'], name: 'create-category', moduleId: PLATFORM.moduleName('./categories/create') },
  //     { route: ['edit-category/:id'], name: 'edit-category', moduleId: PLATFORM.moduleName('./categories/edit') },

  //   ]);
  //   config.mapUnknownRoutes('./home');
  // }

  // public navigateHome(){
  //   this.router.navigateToRoute('home');
  // }
}
