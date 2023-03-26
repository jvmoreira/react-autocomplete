export const npmRegistryApi = {
  search: jest.fn(() => Promise.resolve({
    objects: [
      {
        package: {
          name: '@testing-library/dom',
          version: '9.2.0',
          description: 'Simple and complete DOM testing utilities that encourage good testing practices.',
        },
      },
      {
        package: {
          name: '@testing-library/jest-dom',
          version: '5.16.5',
          description: 'Custom jest matchers to test the state of the DOM',
        },
      },
      {
        package: {
          name: '@testing-library/react',
          version: '14.0.0',
          description: 'Simple and complete React DOM testing utilities that encourage good testing practices.',
        },
      },
      {
        package: {
          name: '@testing-library/react-hooks',
          version: '8.0.1',
          description: 'Simple and complete React hooks testing utilities that encourage good testing practices.',
        },
      },
      {
        package: {
          name: '@testing-library/preact-hooks',
          version: '1.1.0',
          description: 'Simple and complete React hooks testing utilities that encourage good testing practices.',
        },
      },
      {
        package: {
          name: '@testing-library/user-event',
          version: '14.4.3',
          description: 'Fire events the same way the user does',
        },
      },
      {
        package: {
          name: '@testing-library/cypress',
          version: '9.0.0',
          description: 'Simple and complete custom Cypress commands and utilities that encourage good testing practices.',
        },
      },
    ],
  })),
};
