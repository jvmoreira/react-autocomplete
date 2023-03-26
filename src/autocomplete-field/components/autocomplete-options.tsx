import React, { ReactElement, ReactNode } from 'react';
import { AutocompleteOption } from '@/lib/autocomplete-fetcher';
import { StringHighlight } from '@/lib/string-highlight';
import { useAutocompleteContext } from '../autocomplete-context';
import { setFieldValue, setOptions } from '../autocomplete-actions';
import styles from './autocomplete-field.module.scss';

export function AutocompleteOptions(): ReactElement {
  return (
    <ul className={styles.autocompleteField__autocompleteOptions}>
      <AutocompleteOptionsContent />
    </ul>
  );
}

export function AutocompleteOptionsContent(): ReactElement | null {
  const { autocompleteState: { options, loading } } = useAutocompleteContext();

  if (loading) {
    return <AutocompleteLoadingContent />;
  }

  if (options.length === 0) {
    return null;
  }

  return (
    <>
      {options.map(option => (
        <AutocompleteOptionComponent key={option.key} option={option} />
      ))}
    </>
  );
}

function AutocompleteLoadingContent(): ReactElement | null {
  return (
    <li className={styles.autocompleteField__autocompleteOptions__loadingContent}>
      Searching...
    </li>
  );
}

interface AutocompleteOptionProps {
  option: AutocompleteOption;
}

function AutocompleteOptionComponent({ option }: AutocompleteOptionProps): ReactElement {
  const { dispatch } = useAutocompleteContext();

  function handleClick(): void {
    dispatch(setFieldValue(option.value));
    dispatch(setOptions({ options: [], searchedValue: option.value}));
  }

  return (
    <li className={styles.autocompleteField__autocompleteOptions__option} onClick={handleClick}>
      <span className={styles.autocompleteField__autocompleteOptions__option__value}>
        {renderStringHighlight(option.highlightedValue)}
      </span>
      <span className={styles.autocompleteField__autocompleteOptions__option__description}>
        {option.highlightedDescription ? renderStringHighlight(option.highlightedDescription) : option.description}
      </span>
    </li>
  );
}

function renderStringHighlight(stringHighlight: StringHighlight): ReactNode {
  return (
    <>
      {stringHighlight.prefix}
      <span data-highlight="true" className={styles.autocompleteField__autocompleteOptions__option__highlight}>
        {stringHighlight.highlight}
      </span>
      {stringHighlight.suffix}
    </>
  );
}
