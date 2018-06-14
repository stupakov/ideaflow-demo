import React, { Component } from 'react';
import './App.css';
import IdeaflowEditor from './components/IdeaflowEditor';

const suggestions = {
  hashtags: [
    { name: 'reminder'},
    { name: 'idea'}
  ]
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello.</h1>
        </header>
        <IdeaflowEditor suggestions={suggestions}/>
      </div>
    );
  }
}

export default App;
