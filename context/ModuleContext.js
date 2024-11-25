import React, {createContext, useState} from 'react';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
    const [course, setCourse] = useState('');

    return (
        <ModuleContext.Provider value={{course, setCourse}}>
            {children}
        </ModuleContext.Provider>
    )
}

export const useModuleContext = () => React.useContext(ModuleContext);