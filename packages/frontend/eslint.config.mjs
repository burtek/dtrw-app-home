// @ts-check
import { prepareConfig, config } from '@dtrw/eslint-config';


export default config(
    ...prepareConfig({
        jest: { mode: 'vitest' },
        json: { additionalFiles: { jsonc: ['tsconfig.*.json'] } },
        react: { nextjs: true }
    }),
    {
        files: ['**/*.{js,jsx,ts,tsx,mts}'],
        languageOptions: {
            globals: { JSX: 'readonly' },
            parserOptions: { projectService: true }
        },
        settings: { 'import/resolver': { typescript: true } }
    },
    { rules: { 'react/display-name': 'off' } },
    { ignores: ['.velite', 'node_modules'] }
);
