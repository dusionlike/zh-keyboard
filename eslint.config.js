// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    ignores: [
      'src/types/electron.d.ts',
      '*.json',
      'src/auTem/aumap.json',
      'public/**',
      'dist/**',
    ],
  },
  {
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
      'node/prefer-global/buffer': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      // Disable rule for React
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',
      'react-dom/no-missing-button-type': 'off',
      'style/jsx-one-expression-per-line': 'off',
    },
  },
)
