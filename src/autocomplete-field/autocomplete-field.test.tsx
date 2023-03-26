import React from 'react';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { AutocompleteFetcher } from '@/lib/autocomplete-fetcher';
import { buildStringHighlight } from '@/lib/string-highlight';
import { staticCarMakerAutocompleteFetcher } from '@/lib/autocomplete-fetcher/static-car-maker-autocomplete-fetcher';
import { AutocompleteField } from './autocomplete-field';

const autocompleteFieldPlaceholder = 'Search car makers';

test('updates input value and clears options when user selects an autocomplete option', async () => {
  const searchValue = 'Ferr';
  const expectedFinalValue = 'Ferrari';

  const { getByPlaceholderText, getByRole } = renderAutocompleteField();
  const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);
  fireEvent.change(inputField, { target: { value: searchValue } });

  await waitFor(() => {
    expect(getByRole('list')).not.toBeEmptyDOMElement();
  });

  const listItem = getByRole('listitem');
  fireEvent.click(listItem);
  expect(getByPlaceholderText(autocompleteFieldPlaceholder)).toHaveValue(expectedFinalValue);
  expect(getByRole('list')).toBeEmptyDOMElement();
});

test('flushes options when fetcher throws an error', async () => {
  const searchValue = 'value';
  const fetcherWithError = getFetcherWithErrorAfterFirstCall(searchValue);

  const result = render(<AutocompleteField placeholder={autocompleteFieldPlaceholder} fetcher={fetcherWithError} />);
  const { getByRole, getByPlaceholderText } = result;

  const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);
  fireEvent.change(inputField, { target: { value: searchValue } });

  await waitFor(() => {
    expect(getByRole('list')).not.toBeEmptyDOMElement();
  });

  expect(inputField).toHaveValue(searchValue);
  const newSearchValue = 'new-value';
  fireEvent.change(inputField, { target: { value: newSearchValue } });

  await waitFor(() => {
    expect(fetcherWithError).toHaveBeenCalledTimes(2);
  });

  expect(inputField).toHaveValue(newSearchValue);
  expect(getByRole('list')).toBeEmptyDOMElement();
});

describe('input field', () => {
  test('renders an input with the defined placeholder', () => {
    const { getByPlaceholderText } = renderAutocompleteField();
    const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);

    expect(inputField).toBeInTheDocument();
  });

  test('updates value on input change', () => {
    const { getByPlaceholderText } = renderAutocompleteField();
    const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);

    const newValue = 'Audi';
    fireEvent.change(inputField, { target: { value: newValue } });
    expect(getByPlaceholderText(autocompleteFieldPlaceholder)).toHaveValue(newValue);
  });
});

describe('autocomplete options', () => {
  test('does not render options when it is empty and loading is false', () => {
    const { getByRole } = renderAutocompleteField();
    const optionsList = getByRole('list');

    expect(optionsList).toBeInTheDocument();
    expect(optionsList).toBeEmptyDOMElement();
  });

  test('shows loading message after input value change', async () => {
    jest.useFakeTimers();
    const { getByPlaceholderText, getByRole } = renderAutocompleteField();
    const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);

    fireEvent.change(inputField, { target: { value: 'Audi' } });

    await waitFor(() => {
      expect(getByRole('list')).not.toBeEmptyDOMElement();
    });

    expect(getByRole('listitem')).toHaveTextContent('Searching...');
    jest.useRealTimers();
  });

  test('shows matching autocomplete options with highlight', async () => {
    const { getByPlaceholderText, getByRole, getAllByRole } = renderAutocompleteField();

    const inputField = getByPlaceholderText(autocompleteFieldPlaceholder);
    fireEvent.change(inputField, { target: { value: 'F' } });

    await waitFor(() => {
      expect(getByRole('list')).not.toBeEmptyDOMElement();
    });

    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(listItems[0].querySelector('[data-highlight]')).toBeInTheDocument();
  });
});

function renderAutocompleteField(): RenderResult {
  return render(
    <AutocompleteField
      placeholder={autocompleteFieldPlaceholder}
      fetcher={staticCarMakerAutocompleteFetcher}
    />,
  );
}

function getFetcherWithErrorAfterFirstCall(searchValue: string): AutocompleteFetcher {
  let firstCall = true;

  return jest.fn(() => {
    if (!firstCall) {
      return Promise.reject(new Error('Failed to fetch'));
    }

    firstCall = false;
    return Promise.resolve([{
      key: searchValue,
      value: searchValue,
      highlightedValue: buildStringHighlight(searchValue, searchValue),
      description: undefined,
      highlightedDescription: undefined,
    }]);
  });
}
