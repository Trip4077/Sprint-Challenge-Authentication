import React, { Component } from 'react';

import UserForm from './components/UserForm';
import Jokes from './components/Jokes';

import { Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/welcome' component={UserForm} />
        <Route path='/jokes' component={Jokes} />
      </div>
    );
  }
}

export default App;
