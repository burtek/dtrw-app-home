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
                projectService: { allowDefaultProject: ['eslint.config.mjs'] },
                tsconfigRootDir: import.meta.dirname
            }
        },
        settings: { 'import/resolver': { typescript: true } }
    },
    { ignores: ['.velite', '.next', 'node_modules', 'out'] }
);
