import React from 'react';

// Hashtag implementation from example in Draft.js docs

/**
 * Super simple decorators for handles and hashtags, for demonstration
 * purposes only. Don't reuse these regexes.
 */
const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

function hashtagStrategy(contentBlock, callback, contentState) {
  const text = contentBlock.getText();
  findWithRegex(HASHTAG_REGEX, text, callback);
}

function findWithRegex(regex, text, callback) {
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const Hashtag = (props) => {
  return (
    <span className='hashtag' >
      {props.children}
    </span>
  );
};

export {Hashtag, hashtagStrategy};
