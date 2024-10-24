import { MyCounter } from "./";
import { bind, type Meta } from "@michijs/storybook-utils";

export default {
  title: "Components/Counter",
  argTypes: {
    count: {
      control: "number",
    },
  },
} satisfies Meta<typeof MyCounter>;

export const Default = bind(
  <MyCounter
    count={0}
    oncountchanged={(e) => console.log(`Count changed: ${e.detail}`)}
  />,
);
