import React, {useReducer, createContext, ReactNode } from 'react'
import { AppReducer, initialState } from '../DataReducers/AppReducer';
import { AppContextInitialState } from '../../Types';

export const AppContext = createContext<[AppContextInitialState,React.Dispatch<any>]>([initialState,() => {}]);

const AppProvider:React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(AppReducer,initialState)}>
    {children}
    </AppContext.Provider>
  )
}

export default AppProvider
