import { createActionDefinition } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';

export const setFieldValue = createActionDefinition<
  'setFieldValue', AutocompleteState, string
>('setFieldValue', (state, action) => {
  return {
    ...state,
    fieldValue: action.payload,
  };
});
