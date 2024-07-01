import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import js from "@eslint/js";


export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["*/*.ts", "*/*.tsx"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: 'tsconfig.json',
        // tsconfigRootDir: __dirname,
        sourceType: 'module',
      }
    },
    plugins: {
      eslintPlugin: eslintPlugin,
    },
    rules: {

      'eslintPlugin/explicit-function-return-type': 'off',
      'eslintPlugin/explicit-module-boundary-types': 'off',
      'eslintPlugin/no-explicit-any': 'error',
      'eslintPlugin/no-unused-vars': 'off',
      'no-console': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'warn',
      'no-reserved-keyword': 'warn'  // This rule might need to be corrected or removed if not recognized
    },
  }
]