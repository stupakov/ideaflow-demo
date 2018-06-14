import React from 'react';

import './mentionsStyles.css';

const PersonEntry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className="mentionSuggestionsEntryContainer">
        <div className="mentionSuggestionsEntryContainerLeft">
          <img
            src={mention.avatar}
            className="mentionSuggestionsEntryAvatar"
            alt={mention.name}
          />
        </div>

        <div className="mentionSuggestionsEntryContainerRight">
          <div className="mentionSuggestionsEntryText">
            {mention.name}
          </div>

          <div className="mentionSuggestionsEntryTitle">
            {mention.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonEntry;
