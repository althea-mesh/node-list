// import Althea from 'Embark/contracts/Althea';
import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};

export const Contract = React.createContext(themes.dark);
