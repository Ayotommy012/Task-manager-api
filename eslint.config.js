import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},

    "parser": "babel-eslint",
    "parser Options": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "ecmaFeatures": {
        "modules": true,
        "jsx": false
    	},
  }
]);
