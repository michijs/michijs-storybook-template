import { MyCounter } from './';
import { bind, MichiComponentAnnotation } from '../../utils/storybook';

export default {
  title: 'Components/Counter',
} as MichiComponentAnnotation<typeof MyCounter>;

export const Default = bind(<MyCounter count={0} oncountchanged={(e) => console.log(`Count changed: ${e.detail}`)}/>);