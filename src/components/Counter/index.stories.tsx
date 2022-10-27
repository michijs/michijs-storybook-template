import { MyCounter } from './';
import { bind } from '../../utils/storybook';
import { h } from "@michijs/michijs";

export default {
  title: 'Components/Counter',
};

export const Default = bind(<MyCounter count={0} oncountchanged={(e) => console.log(`Count changed: ${e.detail}`)}/>);