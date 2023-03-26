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
  const [autocompleteOption] = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOption).toHaveProperty('value', '@testing-library/react');
  expect(autocompleteOption).toHaveProperty('key');
  expect(autocompleteOption.key).toBeString();
  expect(autocompleteOption.key).not.toBe('');
  expect(autocompleteOption).toHaveProperty('description');
  expect(autocompleteOption.description).toBeString();
  expect(autocompleteOption.description).not.toBe('');
});

test('includes highlighted values when both the package name and description contain the search value', async () => {
  const packageName = 'react';
  const [autocompleteOption] = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOption).toHaveProperty('highlightedValue.highlight', packageName);
  expect(autocompleteOption).toHaveProperty('highlightedDescription.highlight', 'React');
});

test('does not include description when package description is undefined', async () => {
  const packageName = 'cypress';
  const [autocompleteOption] = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOption).toHaveProperty('description', undefined);
  expect(autocompleteOption).toHaveProperty('highlightedDescription', undefined);
});

test('does not include highlighted description when package description does not contain the search value', async () => {
  const packageName = '@testing-library';
  const [autocompleteOption] = await getNpmPackageNameAutocompleteOptions(packageName);
  expect(autocompleteOption).toHaveProperty('highlightedDescription', undefined);
});
