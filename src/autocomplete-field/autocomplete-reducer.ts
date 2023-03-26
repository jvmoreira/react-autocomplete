import { ReducerActionObject } from '../lib/shared/reducers';
import { AutocompleteState } from './autocomplete-state';

export function autocompleteReducer(
  state: AutocompleteState,
  action: ReducerActionObject<string, unknown>,
): AutocompleteState {
  return state;
}
