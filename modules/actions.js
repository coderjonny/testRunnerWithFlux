import AppDispatcher from './dispatcher.js';

var Actions = {

  runTests: (tests) => {
    console.log('action trigger');
    AppDispatcher.dispatch({
      actionType: 'RUN',
      tests: tests
    });
  }

};

module.exports = Actions;
