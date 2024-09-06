import globals from 'globals'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginAva from 'eslint-plugin-ava'

export default tsEslint.config(
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginAva.configs['flat/recommended'],
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
)
