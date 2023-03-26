import { ReducerActionObject } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';
import { setFieldValue } from './autocomplete-actions';

export function autocompleteReducer(
  state: AutocompleteState,
  action: ReducerActionObject<string, unknown>,
): AutocompleteState {
  if (setFieldValue.shouldApply(action)) {
    return setFieldValue.reduce(state, action);
  }

  return state;
}
