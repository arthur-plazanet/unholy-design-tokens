import { filterThemeTokens } from './theme.filter.js';

export default [
  {
    destination: 'themes/private-theme.css',
    format: 'private-theme',
    filter: (token) => filterThemeTokens(token),
    options: {
      outputReferences: true,
    },
  },
  {
    destination: 'themes/public-theme.css',
    format: 'public-theme',
    filter: (token) => filterThemeTokens(token),
    options: {
      outputReferences: true,
    },
  },
];
