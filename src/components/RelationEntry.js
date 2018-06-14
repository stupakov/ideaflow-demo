import React from 'react';

const RelationEntry = (props) => {
   const {
    mention,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div>
        {mention.name}
      </div>
    </div>
  );
}

export default RelationEntry;
