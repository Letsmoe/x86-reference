/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	daisyui: {
		themes: [
			{
				light: {
					primary: "#7c3aed",
					"primary-focus": "#5b21b6",
					"primary-content": "#ffffff",

					secondary: "#4f46e5",
					"secondary-focus": "#3730a3",
					"secondary-content": "#ffffff",

					accent: "#37cdbe",
					"accent-focus": "#2ba69a",
					"accent-content": "#ffffff",

					neutral: "#3b424e",
					"neutral-focus": "#2a2e37",
					"neutral-content": "#ffffff",

					"base-100": "#ffffff",
					"base-200": "#f9fafb",
					"base-300": "#ced3d9",
					"base-content": "#1e2734",

					info: "#66c7ff",
					success: "#87cf3a",
					warning: "#e1d460",
					error: "#ff6b6b",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "0.4rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
				forest: {
					primary: "#7c3aed",
					"primary-focus": "#5b21b6",
					"primary-content": "#ffffff",

					secondary: "#4f46e5",
					"secondary-focus": "#3730a3",
					"secondary-content": "#ffffff",

					accent: "#a21caf",
					"accent-focus": "#b57721",
					"accent-content": "#ffffff",

					neutral: "#110e0e",
					"neutral-focus": "#060404",
					"neutral-content": "#ffffff",

					"base-100": "#171212",
					"base-200": "#110e0e",
					"base-300": "#060404",
					"base-content": "#ffffff",

					info: "#66c7ff",
					success: "#87cf3a",
					warning: "#e1d460",
					error: "#ff6b6b",

					"--rounded-box": "1rem",
					"--rounded-btn": "1rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: "forest", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root", // The element that receives theme color CSS variables
	},
};
