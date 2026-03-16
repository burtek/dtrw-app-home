/** @see https://velite.js.org/guide/using-mdx#rendering-mdx-content */

import type { FC } from 'react';
import { useMemo } from 'react';
import * as jsxDevRuntime from 'react/jsx-dev-runtime';
import * as jsxRuntime from 'react/jsx-runtime';


const sharedComponents: Record<string, React.ComponentType> = {};

/* eslint-disable @typescript-eslint/naming-convention */
export const useMDX = ({ code, components }: { code: string | undefined; components?: Record<string, React.ComponentType> }) => {
    type Comp = FC<{ components?: Record<string, React.ComponentType> }>;
    const RawComponent = useMemo<Comp>(() => {
        if (!code) {
            return () => null;
        }

        // @ts-expect-error -- assignment
        // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
        const fn: (runtime: typeof jsxRuntime | typeof jsxDevRuntime) => { default: Comp } = new Function(code);
        return fn({ ...process.env.NODE_ENV === 'development' ? jsxDevRuntime : jsxRuntime }).default;
    }, [code]);

    const allComponents = useMemo(() => ({ ...sharedComponents, ...components }), [components]);

    return { content: <RawComponent components={allComponents} /> };
};
/* eslint-enable @typescript-eslint/naming-convention */
