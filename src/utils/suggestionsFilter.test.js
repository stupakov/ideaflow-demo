import suggestionsFilter from './suggestionsFilter';

const suggestions = [
  {
    name: 'TV'
  },
  {
    name: 'Television'
  },
  {
    name: 'hello'
  },
  {
    name: 'HEllo'
  },
  {
    name: 'five'
  },
  {
    name: 'six'
  },
];

describe('suggestionsFilter', () => {
  describe('when the search value is empty', () => {
    it('matches the top 5 results', () => {
      const filtered = suggestionsFilter('', suggestions);
      const expected = [
        {
          name: 'TV'
        },
        {
          name: 'Television'
        },
        {
          name: 'hello'
        },
        {
          name: 'HEllo'
        },
        {
          name: 'five'
        },
      ];
      expect(filtered).toEqual(expected);
    });
  });

  describe('when the search value is found exactly', () => {
    it('returns the one matching value', () => {
      const filtered = suggestionsFilter('Television', suggestions);
      const expected = [{name: 'Television'}];
      expect(filtered).toEqual(expected);
    });
  });

  describe('case insensitive search', () => {
    it('returns all matched strings, ignoring case', () => {
      const filtered = suggestionsFilter('HellO', suggestions);
      const expected = [
        {
          name: 'hello'
        },
        {
          name: 'HEllo'
        },
      ];
      expect(filtered).toEqual(expected);
    });
  });


  // This is how I interpret the second (easier) definition of the match string:
  describe('match in the middle', () => {
    it('matches strings that contain the match string, not necessarily at the beginning', () => {
      const filtered = suggestionsFilter('l', suggestions);
      const expected = [
        {
          name: 'Television'
        },
        {
          name: 'hello'
        },
        {
          name: 'HEllo'
        },
      ];
      expect(filtered).toEqual(expected);
    });
  });

  // I'm not sure I correctly understand the first (more challenging) definition of the match string, but I think it means this:
  describe('skipping letters', () => {
    it('matches a string if the search letters appear in the string in order', () => {
      const filtered = suggestionsFilter('TV', suggestions);
      const expected = [
        {
          name: 'TV'
        },
        {
          name: 'Television'
        },
      ];
      expect(filtered).toEqual(expected);
    });

    it('matches a string if the search letters appear in the string in order (case insensitive)', () => {
      const filtered = suggestionsFilter('tV', suggestions);
      const expected = [
        {
          name: 'TV'
        },
        {
          name: 'Television'
        },
      ];
      expect(filtered).toEqual(expected);
    });
  });
});
