import React from 'react';
import { AuthProvider } from './AuthProvider';
import { DataProvider } from './DataProvider';
import { ThemeProvider } from 'styled-components';
import theme from './theme-context';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <DataProvider>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
};

export default AppProviders;