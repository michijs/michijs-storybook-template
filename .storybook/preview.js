import { html } from 'lit-html';
import { themes } from '@storybook/theming';

const storageValue = localStorage.getItem('theme');
const storageTheme = storageValue ? JSON.parse(storageValue): 'light';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: themes[storageTheme],
  },
}

export const decorators = [(Story, context) => {
  const theme = context.globals.theme;
  localStorage.setItem('theme', JSON.stringify(theme));
  console.log(Story)
  return html`${Story()}`;
}];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: storageTheme,
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};