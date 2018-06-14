import React from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import PersonEntry from './PersonEntry';
import HashtagEntry from './HashtagEntry';

import 'draft-js-mention-plugin/lib/plugin.css';
import './IdeaflowEditor.css';


class IdeaflowEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hashtagPlugin = createMentionPlugin({
      mentionTrigger: '#',
      mentionPrefix: '#',
      entityMutability: 'IMMUTABLE',
      // mentionRegExp: ''
    });

    this.personPlugin = createMentionPlugin({
      mentionTrigger: '@',
      mentionPrefix: '@',
      entityMutability: 'IMMUTABLE',
      // mentionRegExp: ''
    });

    this.state = {
      editorState: EditorState.createEmpty(),
      hashtagSuggestions: props.suggestions.hashtags,
      personSuggestions: props.suggestions.people,
    };

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };

    this.onPersonSearchChange = ({ value }) => {
      this.setState({
        personSuggestions: defaultSuggestionsFilter(value, this.props.suggestions.people),
      });
    };
    this.onHashtagSearchChange = ({ value }) => {
      this.setState({
        hashtagSuggestions: defaultSuggestionsFilter(value, this.props.suggestions.hashtags),
      });
    };
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    const HashtagSuggestions = this.hashtagPlugin.MentionSuggestions;
    const PersonSuggestions = this.personPlugin.MentionSuggestions;
    const plugins = [this.hashtagPlugin, this.personPlugin];

    return (
      <div className='ideaflow-editor' >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <br/>
        <HashtagSuggestions
          onSearchChange={this.onHashtagSearchChange}
          suggestions={this.state.hashtagSuggestions}
          entryComponent={HashtagEntry}
        />
        <PersonSuggestions
          onSearchChange={this.onPersonSearchChange}
          suggestions={this.state.personSuggestions}
          entryComponent={PersonEntry}
        />
        <input
          onClick={this.logState}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

export default IdeaflowEditor;
