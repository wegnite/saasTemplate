import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 柔和的紫色
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // 辅助色 - 淡蓝色
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // 背景色 - 更柔和的色调
        background: {
          light: '#faf5ff',
          DEFAULT: '#f5f3ff',
          dark: '#ede9fe',
        },
        // 强调色
        accent: {
          purple: '#7c3aed',
          blue: '#3b82f6',
          pink: '#ec4899',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

export default config 