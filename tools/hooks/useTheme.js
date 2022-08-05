import React, { useEffect, useState } from 'react';
import { retrieveActiveThemeFromLocalStorage } from '../storage/localStorage';

const useTheme = (active) => {

  const localActiveTheme = retrieveActiveThemeFromLocalStorage();
  const [isDarkMode] = useState(localActiveTheme === 'dark');

  useEffect(() => {
    if (active) {
      if (localActiveTheme === 'dark') return document.body.classList.add('dark-mode');
      else return document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return { localActiveTheme, isDarkMode };
};

export default useTheme;
