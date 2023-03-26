import { search } from './search';

/**
 * Based on NPM Registry API documentation
 * @see https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md
 */
export const npmRegistryApi = {
  search,
};

const npmRegistryApiUrl = 'https://registry.npmjs.com/-/v1';

export async function performGetRequest<R>(path: string): Promise<R> {
  const response = await fetch(`${npmRegistryApiUrl}${path}`);
  return await response.json();
}
