/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from 'components/common/Header';
import { useDarkMode } from 'lib/theme/useDarkMode';
import { lightTheme, darkTheme } from '../lib/theme/theme';
import { GlobalStyles } from '../lib/theme/global';

const Page = ({ children }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <>loading...</>;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme} />
      {children}
    </ThemeProvider>
  );
};

export default Page;
