import React, { ReactElement } from 'react';
import { getNpmPackageNameAutocompleteOptions } from './lib/autocomplete-fetcher/npm-package-name-autocomplete-fetcher';
import { AutocompleteField } from './autocomplete-field';
import './style.scss';

export function App(): ReactElement {

  return (
    <main className="page-content">
      <h1 className="page-title">Autocomplete Component</h1>

      <AutocompleteField placeholder="Search NPM packages" fetcher={getNpmPackageNameAutocompleteOptions} />
    </main>
  );
}
