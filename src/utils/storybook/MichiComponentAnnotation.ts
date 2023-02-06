import { AnyFramework, Args, ComponentAnnotations } from "@storybook/types";
import { GetElementProps } from '@michijs/michijs';

export type MichiComponentAnnotation<T = Args, A = {}> = ComponentAnnotations<AnyFramework, GetElementProps<T> & A>