import { getNpmPackageNameAutocompleteOptions } from './npm-package-name-autocomplete-fetcher';

jest.mock('../apis/npm-registry-api');

test.each([
  ['@testing-library', 7],
  ['Testing-Library', 7],
  ['react', 3],
  ['React', 3],
  ['express', 0],
  ['Express', 0],
])('returns only packages that contains %p', async (packageName: string, expectedLength: number) => {
  const autocompleteOptions = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOptions).toHaveLength(expectedLength);
});

test('includes option value, description and key', async () => {
  const packageName = 'react';
  const autocompleteOptions = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOptions[0]).toHaveProperty('value', '@testing-library/react');
  expect(autocompleteOptions[0]).toHaveProperty('key');
  expect(autocompleteOptions[0].key).toBeString();
  expect(autocompleteOptions[0].key).not.toBe('');
  expect(autocompleteOptions[0]).toHaveProperty('description');
  expect(autocompleteOptions[0].description).toBeString();
  expect(autocompleteOptions[0].description).not.toBe('');
});

test('includes highlighted values when both the package name and description contain the search value', async () => {
  const packageName = 'react';
  const autocompleteOptions = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOptions[0]).toHaveProperty('highlightedValue.highlight', packageName);
  expect(autocompleteOptions[0]).toHaveProperty('highlightedDescription.highlight', 'React');
});

test('does not include highlighted name when package name does not contain the search value', async () => {
  const packageName = 'Simple';
  const autocompleteOptions = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOptions[0]).toHaveProperty('highlightedValue', undefined);
});

test('does not include highlighted description when package description does not contain the search value', async () => {
  const packageName = '@testing-library';
  const autocompleteOptions = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOptions[0]).toHaveProperty('highlightedDescription', undefined);
});
