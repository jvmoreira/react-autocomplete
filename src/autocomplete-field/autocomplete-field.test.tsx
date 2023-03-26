import React from 'react';
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { staticCarMakerAutocompleteFetcher } from '@/lib/autocomplete-fetcher/static-car-maker-autocomplete-fetcher';
import { AutocompleteField } from './autocomplete-field';

const autocompleteFieldPlaceholder = 'Search car makers';

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
