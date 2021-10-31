import { MyCounter } from './';
import { bind } from '../../storybook-utils/bind';
import { h } from '@lsegurado/ls-element';

export default {
  title: 'Components/Counter',
};

export const Default = bind(<MyCounter id="test" count={0}/>);