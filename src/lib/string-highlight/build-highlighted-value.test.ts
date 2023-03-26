import { StringHighlight } from './string-highlight';
import { buildStringHighlight } from './build-string-highlight';

const value = 'Frontend Web Development';

test.each([
  ['frontend',                 { prefix: '', highlight: 'Frontend', suffix: ' Web Development' }],
  ['Frontend',                 { prefix: '', highlight: 'Frontend', suffix: ' Web Development' }],
  ['web',                      { prefix: 'Frontend ', highlight: 'Web', suffix: ' Development' }],
  ['Web',                      { prefix: 'Frontend ', highlight: 'Web', suffix: ' Development' }],
  ['development',              { prefix: 'Frontend Web ', highlight: 'Development', suffix: '' }],
  ['Development',              { prefix: 'Frontend Web ', highlight: 'Development', suffix: '' }],
  ['Frontend Web Development', { prefix: '', highlight: 'Frontend Web Development', suffix: '' }],
])('highlights %p in "Frontend Web Development"', (highlight: string, expectedResult: StringHighlight) => {
  const highlightedValue = buildStringHighlight(highlight, value);
  expect(highlightedValue).toEqual(expectedResult);
});

test('throws error when the string does not include the highlight target', () => {
  const highlight = 'Backend';
  const value = 'Frontend Web Development';

  expect(() => buildStringHighlight(highlight, value)).toThrow(
    `buildStringHighlight - Value "${value}" does not contain targeted highlight "${highlight}"`,
  );
});
