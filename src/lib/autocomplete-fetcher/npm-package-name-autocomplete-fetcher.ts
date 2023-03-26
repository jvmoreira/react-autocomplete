import { npmRegistryApi } from '../apis/npm-registry-api';
import { buildStringHighlight, StringHighlight } from '../string-highlight';
import { AutocompleteOption } from './autocomplete-fetcher';

export async function getNpmPackageNameAutocompleteOptions(packageName: string): Promise<AutocompleteOption[]> {
  const searchResult = await npmRegistryApi.search(packageName);

  const filteredPackages = searchResult.objects.filter(({ package: npmPackage }) => {
    return includesCaseInsensitive(npmPackage.name, packageName)
      || includesCaseInsensitive(npmPackage.description, packageName);
  });

  return filteredPackages.map(({ package: npmPackage }) => ({
    key: `${npmPackage.name}-${npmPackage.version}`,
    value: npmPackage.name,
    highlightedValue: getHighlightedPackageNameWhenPresent(packageName, npmPackage.name),
    description: npmPackage.description,
    highlightedDescription: getHighlightedPackageNameWhenPresent(packageName, npmPackage.description),
  }));
}

function getHighlightedPackageNameWhenPresent(packageName: string, value: string): StringHighlight | undefined {
  return includesCaseInsensitive(value, packageName) ? buildStringHighlight(packageName, value) : undefined;
}

function includesCaseInsensitive(content: string, searchValue: string): boolean {
  return content.toLowerCase().includes(searchValue.toLowerCase());
}
