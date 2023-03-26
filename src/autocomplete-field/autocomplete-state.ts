import { AutocompleteFetcher, AutocompleteOption } from '@/lib/autocomplete-fetcher';

export interface AutocompleteState {
  fieldValue: string;
  loading: boolean;
  fetcher: AutocompleteFetcher;
  options: AutocompleteOption[];
}
