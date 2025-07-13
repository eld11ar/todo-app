import { createContext, useContext, type SetStateAction, type Dispatch } from 'react';

type CategoriesContextProps = {
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
};

export const CategoriesContext = createContext<CategoriesContextProps>({
  currentCategory: 'Home',
  setCurrentCategory: () => {},
});

export const useCategoriesContext = () => useContext(CategoriesContext);
