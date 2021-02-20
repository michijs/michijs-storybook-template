import Counter, { CounterAttributes } from './';
import { bind } from '@lsegurado/storybook-config-ls-element/dist/bind';
import { h } from '@lsegurado/ls-element';

export default {
  title: 'Components/Counter',
};

export const Default = bind<CounterAttributes>((props) => <Counter {...props} />, {
  count: 0
});