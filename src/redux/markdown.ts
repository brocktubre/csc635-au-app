// https://www.sitepoint.com/managing-state-aurelia-with-redux/

import marked from 'marked';
import { bindable } from 'aurelia-framework';
import { createStore } from 'redux';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';

// For simplcity we are keeping the 
// reducer and action creator in the same file.
export class Markdown {
  @bindable raw;
  html = '';

  // This initilizes our store
  store = createStore(undoable(textUpdater));

  pastCount = 0;
  futureCount = 0;

  constructor() {
    // This subscription will register an update callback
    // that the Redux store will call any time an
    // action has been dispatched.
    this.store.subscribe(this.update.bind(this));
    let currState = this.store.getState();
    // debugger;
  }

  update() {
    // The update method itself just requests the latest state
    // from the store using Redux’s getState method and
    // assigns the resulting values to our html and raw properties.
    const state = this.store.getState()['present'];
    this.html = state.html;
    this.raw = state.raw;
    this.pastCount = this.store.getState()['past'].length;
    this.futureCount = this.store.getState()['future'].length;
  }

  keyupHandler(newValue) {
    this.store.dispatch(updateText(newValue));
  }

  undo() {
    this.store.dispatch(ActionCreators.undo());
  }

  redo() {
    this.store.dispatch(ActionCreators.redo());
  }

  attached() {
    this.keyupHandler(this.raw);
  }
}

const TEXT_UPDATE = 'UPDATE';

// action creator
const updateText = (text) => {
  return {
    type: TEXT_UPDATE,
    text
  };
};

// reducer function. Reducers are pure function that takes the state of the app
// and the action being dispatched and return the next state of the app.
function textUpdater(state = { raw: '', html: '' }, action) {
  switch (action.type) {
  case TEXT_UPDATE:
    return {
      raw: action.text,
      html: marked(action.text)
    };
  default:
    return state;
  }
}
