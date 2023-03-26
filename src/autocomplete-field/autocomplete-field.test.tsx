import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
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

function renderAutocompleteField(): RenderResult {
  return render(
    <AutocompleteField
      placeholder={autocompleteFieldPlaceholder}
      fetcher={staticCarMakerAutocompleteFetcher}
    />,
  );
}
