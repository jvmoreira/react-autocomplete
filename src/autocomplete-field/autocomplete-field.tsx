import React, { ReactElement, ReducerState, useReducer } from 'react';
import { AutocompleteFetcher } from '@/lib/autocomplete-fetcher';
import { AutocompleteContextProvider } from './autocomplete-context';
import { autocompleteReducer } from './autocomplete-reducer';

interface AutocompleteInputFieldProps {
  fetcher: AutocompleteFetcher;
}

export function AutocompleteField({ fetcher }: AutocompleteInputFieldProps): ReactElement {
  const [autocompleteState, dispatch] = useReducer(autocompleteReducer, fetcher, getInitialAutocompleteState);

  return (
    <AutocompleteContextProvider value={{ autocompleteState, dispatch }}>
      <input />
    </AutocompleteContextProvider>
  );
}

function getInitialAutocompleteState(fetcher: AutocompleteFetcher): ReducerState<typeof autocompleteReducer> {
  return {
    fieldValue: '',
    loading: false,
    fetcher,
    options: [],
  };
}
