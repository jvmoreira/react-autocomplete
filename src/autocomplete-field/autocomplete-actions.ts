import { createActionDefinition } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';

export const setFieldValue = createActionDefinition<
  'setFieldValue', AutocompleteState, AutocompleteState['fieldValue']
>('setFieldValue', (state, action) => {
  return {
    ...state,
    fieldValue: action.payload,
  };
});

export const setLoading = createActionDefinition<
  'setLoading', AutocompleteState, AutocompleteState['loading']
>('setLoading', (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
});

export const setOptions = createActionDefinition<
  'setOptions', AutocompleteState, { options: AutocompleteState['options'], searchedValue: string }
>('setOptions', (state, action) => {
  if (action.payload.searchedValue !== state.fieldValue) {
    return state;
  }

  return {
    ...state,
    options: action.payload.options,
  };
});
