import { MyCounter } from './';
import { bind, Meta } from '@michijs/storybook-utils';

const meta = {
  title: 'Components/Counter',
} satisfies Meta<typeof MyCounter>;
export default meta;

export const Default = bind(
  <MyCounter
    count={0}
    oncountchanged={(e) => console.log(`Count changed: ${e.detail}`)}
  />,
);
