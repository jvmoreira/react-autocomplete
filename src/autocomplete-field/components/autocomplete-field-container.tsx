import React, { ReactElement, ReactNode } from 'react';
import styles from './autocomplete-field.module.scss';

interface AutocompleteFieldContainerProps {
  children?: ReactNode;
}

export function AutocompleteFieldContainer({ children }: AutocompleteFieldContainerProps): ReactElement {
  return (
    <div className={styles.autocompleteField__container}>
      {children}
    </div>
  );
}
