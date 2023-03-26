import { performGetRequest } from './npm-registry-api';

const path = '/search';
const searchSize = 8;
const qualityWeight = 0.7;
const popularityWeight = 0.3;

export async function search(packageName: string): Promise<NpmRegistryApiSearchResponse> {
  const queryParams = `?text=${packageName}&size=${searchSize}&quality=${qualityWeight}&popularity=${popularityWeight}`;
  return performGetRequest(`${path}${queryParams}`);
}

interface NpmRegistryApiSearchResponse {
  objects: Array<{ package: NpmRegistryApiPackage }>;
}

interface NpmRegistryApiPackage {
  name: string;
  version: string;
  description?: string;
}
