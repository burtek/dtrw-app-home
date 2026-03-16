// @ts-check
import { prepareConfig, config } from '@dtrw/eslint-config';
import tseslint from 'typescript-eslint';


export default config(
    ...prepareConfig({
        jest: { mode: 'vitest' },
        json: { additionalFiles: { jsonc: ['tsconfig.*.json'] } },
        react: { nextjs: true }
    }),
    {
        files: ['eslint.config.mjs', '**/*.{js,jsx,mjs,ts,tsx,mts}'],
        languageOptions: {
            globals: { JSX: 'readonly' },
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        settings: { 'import/resolver': { typescript: true } }
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'import-x/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        ['index', 'sibling']
                    ],
                    pathGroups: [
                        {
                            pattern: '\\#*',
                            group: 'parent',
                            position: 'before'
                        }
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        orderImportKind: 'asc'
                    }
                }
            ]
        }
    },
    { ignores: ['.velite', '.next', 'node_modules', 'out', 'next-env.d.ts'] }
);
