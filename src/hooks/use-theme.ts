import { useContext } from "react";

import ThemeContext from "@/providers/theme/themeContext";

const useTheme = () => {
  const { isDark, isLight, setDarkTheme, setLightTheme, theme, toggleTheme } =
    useContext(ThemeContext);

  return { isDark, isLight, setDarkTheme, setLightTheme, theme, toggleTheme };
};

export default useTheme;
