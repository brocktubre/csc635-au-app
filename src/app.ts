import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';

@autoinject
export class App {
  public router: Router;

  constructor(){
  }

  configureRouter(config: RouterConfiguration, router: Router){
    this.router = router;
    config.title = 'CSC - Final App';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home') },
      { route: ['notes'], name: 'notes', moduleId: PLATFORM.moduleName('./notes/list') }
    ]);
    config.mapUnknownRoutes('./home');
  }
}
