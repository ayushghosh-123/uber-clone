import { createContext, useContext, useState } from 'react';

// Create Context
export const CaptainDataContext = createContext();

// Provider Component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [activeRide, setActiveRide] = useState(null);

    const values = {
        captain,
        setCaptain,
        isOnline,
        setIsOnline,
        isLoading,
        setIsLoading,
        error,
        setError,
        currentLocation,
        setCurrentLocation,
        activeRide,
        setActiveRide
    };

    return (
        <CaptainDataContext.Provider value={values}>
            {children}
        </CaptainDataContext.Provider>
    );
};

// Optional: Custom hook for easier access
export default CaptainContext
