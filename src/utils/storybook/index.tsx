import { renderFunctionalComponent, h, AdoptedStyle, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css } from '@lsegurado/ls-element';
import { themes } from '@storybook/theming';

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
    const style = css`
      body {
        padding: 0 !important;
      }
      html,
      body,
      #root-inner,
      #root {
        height: 100%;
        margin: 0;
        color: ${themes[finalTheme].textColor};
        background-color: ${themes[finalTheme].appBg}; 
        box-sizing: border-box;
      }
      #root {
        padding: 8px;
      }
    `
    return renderFunctionalComponent(
      <>
        <AdoptedStyle id="root-storybook-style">{style}</AdoptedStyle>
        {Story}
      </>
    );
  };
  const templateBind = auxFunction.bind({});
  templateBind.args = typedJSXElement.attrs ?? {};
  return templateBind;
}