import React from 'react';
import {Editor, EditorState, convertToRaw, CompositeDecorator} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './IdeaflowEditor.css';
import {Hashtag, hashtagStrategy} from './Hashtag';


class IdeaflowEditor extends React.Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: hashtagStrategy,
        component: Hashtag
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      // const content = this.state.editorState.toJS();
      console.log(convertToRaw(content));
    };

    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <div className='ideaflow-editor' >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <br/>
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
