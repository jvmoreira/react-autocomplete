import { npmRegistryApi } from '../apis/npm-registry-api';
import { buildStringHighlight, StringHighlight } from '../string-highlight';
import { AutocompleteOption } from './autocomplete-fetcher';

export async function getNpmPackageNameAutocompleteOptions(packageName: string): Promise<AutocompleteOption[]> {
  const searchResult = await npmRegistryApi.search(packageName);

  const filteredPackages = searchResult.objects.filter(({ package: npmPackage }) => {
    return includesCaseInsensitive(npmPackage.name, packageName);
  });

  return filteredPackages.map(({ package: npmPackage }) => ({
    key: `${npmPackage.name}-${npmPackage.version}`,
    value: npmPackage.name,
    highlightedValue: buildStringHighlight(packageName, npmPackage.name),
    description: npmPackage.description,
    highlightedDescription: getHighlightedDescription(packageName, npmPackage.description),
  }));
}

function getHighlightedDescription(packageName: string, description: string | undefined): StringHighlight | undefined {
  if (!description || !includesCaseInsensitive(description, packageName)) {
    return undefined;
  }

  return buildStringHighlight(packageName, description);
}

function includesCaseInsensitive(content: string, searchValue: string): boolean {
  return content.toLowerCase().includes(searchValue.toLowerCase());
}
