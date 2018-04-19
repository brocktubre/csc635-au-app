import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
  public router: Router;
  public year: number;

  constructor(){
    this.year = new Date().getFullYear();
  }

  configureRouter(config: RouterConfiguration, router: Router){
    this.router = router;
    config.title = 'CSC - Final App';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home') },
      { route: ['notes'], name: 'notes', moduleId: PLATFORM.moduleName('./notes/list') },
      { route: ['create-note'], name: 'notes', moduleId: PLATFORM.moduleName('./notes/create') },
      // { route: ['edit-note'], name: 'notes', moduleId: PLATFORM.moduleName('./notes/edit') }
    ]);
    config.mapUnknownRoutes('./home');
  }
}
