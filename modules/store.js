var AppDispatcher = require('./dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var tests = [
  { description: "commas are rotated properly",          run: generateDummyTest() },
  { description: "exclamation points stand up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",   run: generateDummyTest() },
  { description: "question marks curl down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof", run: generateDummyTest() },
  { description: "capital letters can do yoga",          run: generateDummyTest() }
];

var _store = {
  tests: tests,
  tested: 0,
  results: []
};

function countFinished(){
  _store.tested += 1;
}

function verifyTest(result){
  countFinished();
  Store.emitChange();
  console.log(result);
  _store.results.push(result);
  return result;
}

function runTests(action) {
  console.log('action---', action);

  var runs = action.tests.map( (test, i) => {
    test.run(verifyTest.bind(this));
  }, this);

}

function generateDummyTest() {
  var delay = 500 + Math.random() * 500;
  var testPassed = Math.random() > 0.5;

  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

var Store = assign({}, EventEmitter.prototype, {

  getStore: function() {
    return _store;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'RUN':
      runTests(action);
      break;
    default:
      // no op
  }
});

module.exports = Store;
