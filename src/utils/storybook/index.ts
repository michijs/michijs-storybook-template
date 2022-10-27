import { renderSync, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css } from "@michijs/michijs";
import { themes } from '@storybook/theming';

const documentStyle = css`
      body {
        padding: 0 !important;
      }
      html,
      body,
      #root-inner,
      #root {
        height: 100%;
        margin: 0;
        color: var(--text-color);
        background-color: var(--background); 
        box-sizing: border-box;
      }
      #root {
        padding: 8px;
      }
    `
const themeStyle = css`
  #root{
    --text-color: ${themes['light'].textColor}
    --background: ${themes['light'].appBg}
  }
`
document.adoptedStyleSheets = [...document.adoptedStyleSheets, documentStyle]

export function bind(Story: JSX.Element) {
  const typedJSXElement = Story as ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement;
  const auxFunction = (attrs, { globals }) => {
    const { theme, backgrounds } = globals as {
      theme: 'dark' | 'light', backgrounds?: {
        value: '#F8F8F8' | '#333333' | 'transparent'
      }
    };
    const storyTheme = backgrounds?.value && backgrounds?.value !== 'transparent' ? (backgrounds.value === '#333333' ? 'dark' : 'light') : undefined;
    const finalTheme = storyTheme ?? theme;

    typedJSXElement.attrs = { ...typedJSXElement.attrs, ...attrs }

    themeStyle.replaceSync(`
    #root{
      --text-color: ${themes[finalTheme].textColor}
      --background: ${themes[finalTheme].appBg}
    }
    `)
    const fragment = document.createElement('div');
    renderSync(Story, fragment);
    return fragment;
  };
  const templateBind = auxFunction.bind({});
  templateBind.args = typedJSXElement.attrs ?? {};
  return templateBind;
}