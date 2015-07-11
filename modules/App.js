import React from 'react';
import Actions from  './actions.js';
import Store from './store.js';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: [],
      tests: [],
      done: false,
      tested: 0
    };
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange.bind(this));
  }

  componentWillMount(){
    console.log(Store.getStore());
    this.setState({
      tests: Store.getStore().tests
    });
  }

  checkIfDone(){
    if (this.state.tested === Store.getStore().tests.length) {
      return "Finished!";
    }
  }

  render() {
    return (
      <div>
        <h2>
          {this.state.totalTests} Tests
        </h2>
        <ul>
          {
            this.state.tests.map( test => {
              return (
                <li>
                  {test.description}
                  {test.run}
                </li>
              )
            })
          }
        </ul>
        <ul>
          {
            this.state.results.map( (result, i)=>{
              return (
                <li>
                  {result ? 'passed' : 'failed'}
                </li>
              )
            })
          }
        </ul>
        <button onClick={this._runTests.bind(this)}>
          Run!
        </button>
        <div>
          {this.checkIfDone()}
        </div>
      </div>
    );
  }

  _onChange() {
    console.log('Store------->', Store.getStore());
    this.setState( Store.getStore() );
  }

  //actions
  _runTests(){
    Actions.runTests(this.state.tests);
  }
}
