import React, { ChangeEvent, ReactElement } from 'react';
import { useAutocompleteContext } from '../autocomplete-context';
import { setFieldValue } from '../autocomplete-actions';
import styles from './autocomplete-field.module.scss';

interface InputFieldProps {
  placeholder?: string;
}

export function InputField({ placeholder }: InputFieldProps): ReactElement {
  const { autocompleteState: { fieldValue }, dispatch } = useAutocompleteContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(setFieldValue(event.currentTarget.value));
  }

  return (
    <input
      type="text"
      value={fieldValue}
      placeholder={placeholder}
      id="autocomplete-input-field"
      name="autocomplete-input-field"
      onChange={handleChange}
      className={styles.autocompleteField__inputField}
    />
  );
}
