import { renderFunctionalComponent, h, AdoptedStyle, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, ObjectJSXElement, css } from '@lsegurado/ls-element';
import { themes } from '@storybook/theming';

export function bind(Story: JSX.Element) {
  const typedJSXElement = Story as ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement
  const auxFunction = (attrs, { globals }) => {
    const { theme } = globals;
    typedJSXElement.attrs = { ...typedJSXElement.attrs, theme, ...attrs }
    const style = css`
      html,
      body,
      #root-storybook,
      #root {
        height: 100%;
        margin: 0;
        color: ${themes[globals.theme].textColor};
        background-color: ${themes[globals.theme].appBg};
        box-sizing: border-box;
      }
      #root-storybook {
        padding: 8px;
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