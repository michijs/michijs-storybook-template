import { renderFunctionalComponent, h, AdoptedStyle, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css } from '@lsegurado/ls-element';
import { themes } from '@storybook/theming';

export function bind(Story: JSX.Element) {
  const typedJSXElement = Story as ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement
  const auxFunction = (attrs, { globals }) => {
    const { theme, backgrounds } = globals as {theme: 'dark' | 'light', backgrounds?: {
      value: '#F8F8F8' | '#333333'
    }};
    const storyTheme = backgrounds?.value ? (backgrounds.value === '#333333' ? 'dark' : 'light'): undefined;
    const finalTheme = storyTheme ?? theme;

    typedJSXElement.attrs = { ...typedJSXElement.attrs, theme, ...attrs }
    const style = css`
      body {
        padding: 0 !important;
      }
      html,
      body,
      #root-storybook,
      #root {
        height: 100%;
        margin: 0;
        color: ${themes[finalTheme].textColor};
        background-color: ${themes[finalTheme].appBg};
        box-sizing: border-box;
      }
      #root-storybook {
        padding: 16px;
      }
    `
    return renderFunctionalComponent(
      <div id="root-storybook">
        <AdoptedStyle ref={document} id="root-storybook-style">{style}</AdoptedStyle>
        {Story}
      </div>
    );
  };
  const templateBind = auxFunction.bind({});
  templateBind.args = { ...typedJSXElement.attrs };
  return templateBind;
}