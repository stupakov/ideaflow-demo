const containsCharsInOrder = (suggestion, searchValue) => {
  let suggestionIndex = 0;
  let searchIndex = 0;

  while (suggestionIndex < suggestion.length) {
    let searchChar = searchValue.charAt(searchIndex);
    let suggestionChar = suggestion.charAt(suggestionIndex);

    if (searchChar === suggestionChar) {
      searchIndex++;
    }
    suggestionIndex++;
  }
  const found = searchIndex === searchValue.length;
  return found;
};

// based on https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-mention-plugin/src/utils/defaultSuggestionsFilter.js
const suggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) => {
    const suggestionName = suggestion.name.toLowerCase();
    return !value || (suggestionName.indexOf(value) > -1) || containsCharsInOrder(suggestionName, value)
  });
  const length = filteredSuggestions.length < 5 ? filteredSuggestions.length : 5;
  return filteredSuggestions.slice(0, length);
};

export default suggestionsFilter;
