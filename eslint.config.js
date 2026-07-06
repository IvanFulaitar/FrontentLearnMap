import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist", "node_modules", "coverage", "tsconfig.tsbuildinfo"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        console: "readonly",
        document: "readonly",
        localStorage: "readonly",
        navigator: "readonly",
        URL: "readonly",
        Blob: "readonly",
        setTimeout: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
