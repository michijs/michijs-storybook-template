import { AdoptedStyle, createCustomElement, EventDispatcher, h } from '@lsegurado/ls-element';
import { style } from './index.css';

export const MyCounter = createCustomElement('simple-counter', {
  reflectedAttributes: {
    count: 0
  },
  methods: {
    decrementCount() { this.count--; },
    incrementCount() { this.count++; },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    count() {
      this.countChanged(this.count);
    }
  },
  render() {
    return (
      <>
        <AdoptedStyle id="style">{style}</AdoptedStyle>
        <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
        <span id='count'>{this.count}</span>
        <button id="increment-count" onpointerup={this.incrementCount}>+</button>
      </>
    );
  }
});