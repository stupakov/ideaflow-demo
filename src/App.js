import React, { Component } from 'react';
import './App.css';
import IdeaflowEditor from './components/IdeaflowEditor';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello.</h1>
        </header>
        <IdeaflowEditor />
      </div>
    );
  }
}

export default App;
