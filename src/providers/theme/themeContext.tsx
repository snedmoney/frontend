// ThemeContext.js
import { createContext } from "react";

export const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

export type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeProps.light,
  isDark: false,
  isLight: true,
  setLightTheme: () => {},
  setDarkTheme: () => {},
  toggleTheme: () => {},
});

export default ThemeContext;
