import React, { ReactElement, ReducerState, useReducer } from 'react';
import { AutocompleteFetcher } from '@/lib/autocomplete-fetcher';
import { AutocompleteContextProvider } from './autocomplete-context';
import { autocompleteReducer } from './autocomplete-reducer';
import { AutocompleteFieldContainer } from './components/autocomplete-field-container';
import { InputField } from './components/input-field';

interface AutocompleteInputFieldProps {
  placeholder?: string;
  fetcher: AutocompleteFetcher;
}

export function AutocompleteField({ placeholder, fetcher }: AutocompleteInputFieldProps): ReactElement {
  const [autocompleteState, dispatch] = useReducer(autocompleteReducer, fetcher, getInitialAutocompleteState);

  return (
    <AutocompleteContextProvider value={{ autocompleteState, dispatch }}>
      <AutocompleteFieldContainer>
        <InputField placeholder={placeholder} />
      </AutocompleteFieldContainer>
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
