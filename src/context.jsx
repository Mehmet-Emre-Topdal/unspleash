import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {

  //browser'ın dark mod tercihi
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;

  //local storagedaki dark mod tercihi
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';

  //önce kullanıcının sonra da browserın modu kontrol edilir
  return storedDarkMode || prefersDarkMode;
};


export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;

    //yeni dark mode tercihi tetiklenir
    setIsDarkTheme(newDarkTheme);
    /**document.body.classList.toggle('dark-theme', newDarkTheme); 
     * de kullanılabilir
    */

    //yeni drk mode tercihi browsera kaydedilir
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  /**dark tema değiştikten SONRA yeni tercih ekrana aktarılır */
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
