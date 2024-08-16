import React, {createContext, useContext, useState} from 'react';

const GlobalContext = createContext({
  state: {
    USER: {
      access: null,
      id: null,
    },
    MEMBER: {
      id: null,
      name: null,
      email: null,
      phone: null,
      role: null,
    },
    TOKEN: '',
    LOGGEDAT: '',
  },
  setState: () => {},
  activeTab: 0,
  setActiveTab: () => '',
  stateArray: [],
  setStateArray: () => [],
  stateObject: {},
  setStateObject: () => {},
  slideState: [],
  setSlideState: () => [],
});

export const GlobalContextProvider = ({children}) => {
  const [state, setState] = useState({
    USER: {
      access: null,
      id: null,
    },
    MEMBER: {
      id: null,
      name: null,
      email: null,
      phone: null,
      role: null,
    },
    TOKEN: '',
    LOGGEDAT: '',
  });
  const [activeTab, setActiveTab] = useState(0);
  const [stateArray, setStateArray] = useState([]);
  const [stateObject, setStateObject] = useState({});
  const [slideState, setSlideState] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        activeTab,
        setActiveTab,
        stateArray,
        setStateArray,
        stateObject,
        setStateObject,
        slideState,
        setSlideState,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
