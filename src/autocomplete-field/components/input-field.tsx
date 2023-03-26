import React, { ChangeEvent, ReactElement, useMemo } from 'react';
import { useAutocompleteContext } from '../autocomplete-context';
import { setFieldValue, setLoading, setOptions } from '../autocomplete-actions';
import styles from './autocomplete-field.module.scss';

interface InputFieldProps {
  placeholder?: string;
}

export function InputField({ placeholder }: InputFieldProps): ReactElement {
  const { autocompleteState: { fieldValue }, dispatch } = useAutocompleteContext();
  const dispatchSetOptions = useDispatchSetOptionsWithDebounce(500);

  async function handleChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const inputValue = event.currentTarget.value;
    dispatch(setFieldValue(inputValue));
    dispatchSetOptions(inputValue);
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

function useDispatchSetOptionsWithDebounce(debounceTime: number): (searchedValue: string) => void {
  const { autocompleteState: { fetcher }, dispatch } = useAutocompleteContext();

  return useMemo(() => {
    return debounce(async (searchedValue: string) => {
      dispatch(setLoading(true));
      const options = await fetcher(searchedValue);
      dispatch(setOptions({ options, searchedValue }));
      dispatch(setLoading(false));
    }, debounceTime);
  }, [debounceTime, dispatch, fetcher]);
}

function debounce<P>(callback: (args: P) => void, debounceTime: number): (args: P) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (args: P): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(args), debounceTime);
  };
}
