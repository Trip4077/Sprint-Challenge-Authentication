import React, { Component } from 'react';

import UserForm from './components/UserForm';

import { Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/welcome' component={UserForm} />
      </div>
    );
  }
}

export default App;
