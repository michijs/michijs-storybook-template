import { MyCounter } from './';
import { bind } from '@lsegurado/storybook-config-ls-element/dist/bind';
import { h } from '@lsegurado/ls-element';

export default {
  title: 'Components/Counter',
};

export const Default = bind(<MyCounter id="test" count={0}/>);