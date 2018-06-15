import React from 'react';
import {EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import PersonEntry from './PersonEntry';
import HashtagEntry from './HashtagEntry';
import RelationEntry from './RelationEntry';
import suggestionsFilter from '../utils/suggestionsFilter';

import 'draft-js-mention-plugin/lib/plugin.css';
import './IdeaflowEditor.css';



class IdeaflowEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hashtagPlugin = createMentionPlugin({
      mentionTrigger: '#',
      mentionPrefix: '#',
      entityMutability: 'IMMUTABLE',
    });

    this.personPlugin = createMentionPlugin({
      mentionTrigger: '@',
      mentionPrefix: '@',
      entityMutability: 'IMMUTABLE',
    });

    this.relationPlugin = createMentionPlugin({
      mentionTrigger: '<>',
      mentionPrefix: '<>',
      entityMutability: 'IMMUTABLE',
    });

    this.state = {
      editorState: EditorState.createEmpty(),
      hashtagSuggestions: props.suggestions.hashtags,
      personSuggestions: props.suggestions.people,
      relationSuggestions: props.suggestions.relations,
    };

    this.onPersonSearchChange = ({ value }) => {
      this.setState({
        personSuggestions: suggestionsFilter(value, this.props.suggestions.people),
      });
    };
    this.onHashtagSearchChange = ({ value }) => {
      this.setState({
        hashtagSuggestions: suggestionsFilter(value, this.props.suggestions.hashtags),
      });
    };
    this.onRelationSearchChange = ({ value }) => {
      this.setState({
        relationSuggestions: suggestionsFilter(value, this.props.suggestions.relations),
      });
    };
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    const HashtagSuggestions = this.hashtagPlugin.MentionSuggestions;
    const PersonSuggestions = this.personPlugin.MentionSuggestions;
    const RelationSuggestions = this.relationPlugin.MentionSuggestions;
    const plugins = [this.hashtagPlugin, this.personPlugin, this.relationPlugin];

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
        <RelationSuggestions
          onSearchChange={this.onRelationSearchChange}
          suggestions={this.state.relationSuggestions}
          entryComponent={RelationEntry}
        />
      </div>
    );
  }
}

export default IdeaflowEditor;
