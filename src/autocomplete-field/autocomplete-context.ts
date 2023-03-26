import { createContext, Dispatch, useContext } from 'react';
import { ReducerActionObject } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';

interface AutocompleteContext {
  autocompleteState: AutocompleteState;
  dispatch: Dispatch<ReducerActionObject<string, unknown>>;
}

const AutocompleteContext = createContext<AutocompleteContext | null>(null);
export const AutocompleteContextProvider = AutocompleteContext.Provider;

export function useAutocompleteContext(): AutocompleteContext {
  const context = useContext(AutocompleteContext);
  if (context === null) {
    throw new Error('useAutocompleteContext - No value provided for AutocompleteContext');
  }

  return context;
}
