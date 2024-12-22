import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global";
import { theme } from "../styles/them";

export const BoardThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
