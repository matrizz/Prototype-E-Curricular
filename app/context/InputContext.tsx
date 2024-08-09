import { createContext, FC, ReactNode, useContext, useState } from "react"

interface InputStyleContextType {
    styles: string;
  }

const InputStyleContext = createContext<InputStyleContextType | undefined>(undefined);

interface InputStyleProviderProps {
  styles: string;
  children: ReactNode;
}

export const InputStyleProvider: FC<InputStyleProviderProps> = ({ children, styles }) => {

    return (
        <InputStyleContext.Provider value={{ styles }}>
        {children}
      </InputStyleContext.Provider>
    )
}

export const useInputStyles = (): string => {
    const context = useContext(InputStyleContext);
    if (!context) {
      throw new Error('useInputStyles deve ser usado dentro de um InputStyleProvider');
    }
    return context.styles;
  };