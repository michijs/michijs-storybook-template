import type { Meta, Args } from '@storybook/web-components';
import { GetElementProps } from '@michijs/michijs';

export type MichiMeta<T = Args> = Meta<GetElementProps<T>>;
