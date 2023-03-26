import { npmRegistryApi } from './npm-registry-api';

let globalFetch: jest.Mock;

beforeAll(() => {
  globalFetch = jest.fn();
  global.fetch = globalFetch;
});

beforeEach(() => {
  globalFetch.mockClear();
});

describe('npmRegistryApi', () => {
  describe('search', () => {
    test('returns response data', async () => {
      mockFetchResponseJsonCallback(() => Promise.resolve({ objects: [] }));

      await expect(npmRegistryApi.search('react')).resolves.toHaveProperty('objects', []);
    });

    test('calls npm registry api correctly', async () => {
      mockFetchResponseJsonCallback(() => Promise.resolve());

      const searchValue = 'react';
      await npmRegistryApi.search(searchValue);

      expect(globalFetch).toHaveBeenCalledOnceWith(
        `https://registry.npmjs.com/-/v1/search?text=${searchValue}&size=8&quality=0.7&popularity=0.3`,
      );
    });
  });
});

function mockFetchResponseJsonCallback(jsonFunction: Response['json']): void {
  globalFetch.mockImplementationOnce(() => {
    return { json: jsonFunction };
  });
}
