import { renderSync, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css, updateStyleSheet, declareCssVariables, createStyleSheet } from "@michijs/michijs";
import { themes } from '@storybook/theming';


const cssVariables = declareCssVariables<{
  textColor: string,
  background: string
}>()


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
    color: ${cssVariables.textColor.var()};
    background-color: ${cssVariables.background.var()}; 
  }
  .container {
    display: contents
  }
`

const themeStyle = createStyleSheet({
  '#root': {
    [cssVariables.textColor]: themes['light'].textColor,
    [cssVariables.background]: themes['light'].appBg
  }
})

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
    updateStyleSheet(themeStyle, {
      '#root': {
        [cssVariables.textColor]: themes[finalTheme].textColor,
        [cssVariables.background]: themes[finalTheme].appBg
      }
    })

    typedJSXElement.attrs = { ...typedJSXElement.attrs, ...attrs }

    const fragment = document.createElement('div');
    fragment.className = 'container'
    renderSync(
      <>
        {Story}
      </>
      , fragment);
    return fragment;
  };
  const templateBind = auxFunction.bind({});
  (templateBind as typeof templateBind & { args: typeof typedJSXElement.attrs }).args = typedJSXElement.attrs ?? {};
  return templateBind;
}