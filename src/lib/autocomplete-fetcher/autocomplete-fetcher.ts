import { StringHighlight } from '@/lib/string-highlight';

export interface AutocompleteFetcher {
  (value: string): Promise<AutocompleteOption[]>;
}

export interface AutocompleteOption {
  key: string;
  value: string;
  highlightedValue: StringHighlight;
  description: string | undefined;
  highlightedDescription: StringHighlight | undefined;
}
