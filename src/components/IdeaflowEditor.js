import React from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import 'draft-js/dist/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import './IdeaflowEditor.css';

const Entry = (props) => {
   const {
    mention,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div>
        #{mention.name}
      </div>
    </div>
  );
}

class IdeaflowEditor extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      mentionTrigger: '#',
      mentionPrefix: '#',
      // mentionRegExp: ''
    });

    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: props.suggestions.hashtags,
    };

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };

    this.onSearchChange = ({ value }) => {
      this.setState({
        suggestions: defaultSuggestionsFilter(value, this.props.suggestions.hashtags),
      });
    };
  }

  onChange = (editorState) => this.setState({editorState});

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className='ideaflow-editor' >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
        />
        <br/>
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          entryComponent={Entry}
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
