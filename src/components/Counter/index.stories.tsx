import { MyCounter } from './';
import { bind, MichiMeta } from '../../utils/storybook';

const meta = {
  title: 'Components/Counter',
} satisfies MichiMeta<typeof MyCounter>;
export default meta;

export const Default = bind(
  <MyCounter
    count={0}
    oncountchanged={(e) => console.log(`Count changed: ${e.detail}`)}
  />,
);
