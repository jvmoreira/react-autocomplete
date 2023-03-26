import { ReducerActionObject } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';
import { setFieldValue, setLoading, setOptions } from './autocomplete-actions';

export function autocompleteReducer(
  state: AutocompleteState,
  action: ReducerActionObject<string, unknown>,
): AutocompleteState {
  if (setFieldValue.shouldApply(action)) {
    return setFieldValue.reduce(state, action);
  }

  if (setLoading.shouldApply(action)) {
    return setLoading.reduce(state, action);
  }

  if (setOptions.shouldApply(action)) {
    return setOptions.reduce(state, action);
  }

  return state;
}
