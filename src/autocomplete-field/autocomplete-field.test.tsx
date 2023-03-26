import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { staticCarMakerAutocompleteFetcher } from '@/lib/autocomplete-fetcher/static-car-maker-autocomplete-fetcher';
import { AutocompleteField } from './autocomplete-field';

test('renders an input', () => {
  const { container } = renderAutocompleteField();

  expect(container.firstChild).toBeInstanceOf(HTMLInputElement);
  expect(container.firstChild).toBeInTheDocument();
});

function renderAutocompleteField(): RenderResult {
  return render(<AutocompleteField fetcher={staticCarMakerAutocompleteFetcher} />);
}
