/** @see https://velite.js.org/guide/using-mdx#rendering-mdx-content */

import type { FC } from 'react';
import * as jsxDevRuntime from 'react/jsx-dev-runtime';
import * as jsxRuntime from 'react/jsx-runtime';


const sharedComponents: Record<string, React.ComponentType> = {};

/* eslint-disable @typescript-eslint/naming-convention */
export const useMDX = (code: string | undefined) => {
    if (!code) {
        return { Content: (() => null) as Comp };
    }
    type Comp = FC<{ components?: Record<string, React.ComponentType> }>;
    // @ts-expect-error -- assignment
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    const fn: (runtime: typeof jsxRuntime | typeof jsxDevRuntime) => { default: Comp } = new Function(code);
    const { default: RawComponent } = fn({ ...process.env.NODE_ENV === 'development' ? jsxDevRuntime : jsxRuntime });

    const Content: Comp = props => <RawComponent components={{ ...sharedComponents, ...props.components }} />;

    return { Content };
};
/* eslint-enable @typescript-eslint/naming-convention */
