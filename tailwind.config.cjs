/** @type {import('tailwindcss').Config} */

function parentSiblingHoverPlugin({ addVariant, e }) {
  addVariant('parent-sibling-hover', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.parent-sibling:hover ~ .parent .${e(
        `parent-sibling-hover${separator}${className}`
      )}`;
    });
  });
}

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	fontFamily: {
  		sans: [
  			'Söhne',
  			'Roboto',
  			'ui-sans-serif',
  			'system-ui',
  			'-apple-system',
  			'Ubuntu',
  			'Cantarell',
  			'Noto Sans',
  			'sans-serif',
  			'Helvetica Neue',
  			'Arial',
  			'Apple Color Emoji',
  			'Segoe UI Emoji',
  			'Segoe UI Symbol',
  			'Noto Color Emoji'
  		],
  		mono: [
  			'Söhne Mono',
  			'Monaco',
  			'Andale Mono',
  			'Ubuntu Mono',
  			'Consolas',
  			'monospace'
  		]
  	},
  	extend: {
  		typography: {
  			DEFAULT: {
  				css: {
  					pre: {
  						padding: 0,
  						margin: 0
  					},
  					ul: {
  						'list-style-type': 'none'
  					}
  				}
  			}
  		},
  		colors: {
  			gray: {
  				'100': 'rgb(245, 245, 245)',
  				'200': 'rgb(229, 229, 229)',
  				'300': 'rgb(214, 214, 214)',
  				'400': 'rgb(168, 168, 168)',
  				'500': 'rgb(121, 121, 121)',
  				'600': 'rgb(110, 110, 110)',
  				'700': 'rgb(80, 80, 80)',
  				'800': 'rgb(55, 55, 55)',
  				'850': 'rgb(45, 45, 45)',
  				'900': 'rgb(30, 30, 30)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), parentSiblingHoverPlugin, require("tailwindcss-animate")],
  darkMode: ['class', 'class'],
};
