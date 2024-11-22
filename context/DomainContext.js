import React, {createContext, useState} from 'react';

const DomainContext = createContext();

export const DomainProvider = ({ children }) => {
    const [clientDomain, setClientDomain] = useState(null);

    return (
        <DomainContext.Provider value={{clientDomain, setClientDomain}}>
            {children}
        </DomainContext.Provider>
    )
}

export const useDomainContext = () => React.useContext(DomainContext);