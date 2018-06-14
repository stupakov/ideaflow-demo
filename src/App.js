import React, { Component } from 'react';
import './App.css';
import IdeaflowEditor from './components/IdeaflowEditor';

const suggestions = {
  hashtags: [
    { name: 'reminder'},
    { name: 'idea'}
  ],
  people: [
    {
      name: 'Fred Rogers',
      avatar: 'http://www.gstatic.com/tv/thumb/persons/80634/80634_v9_ba.jpg',
    },
    {
      name: 'Daniel Tiger',
      avatar: 'https://i.pinimg.com/originals/04/4b/30/044b3090e6cbd8421aea7322ea4e0a65.jpg',
    },
  ],
  relations: [
    {
      name: 'TV is bad',
    },
    {
      name: 'Television is good',
    },
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
