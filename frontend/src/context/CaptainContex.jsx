import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const CaptainDataContext = createContext();

// Provider Component
export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({});
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    const fetchCaptainData = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("CaptainContext: No authentication token found.");
        setError({ message: "Authentication required. Please log in." });
        setCaptain(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("CaptainContext: API response:", response.data);

        const fullname = response.data?.captain?.fullname;

        if (
          fullname &&
          typeof fullname === "object" &&
          typeof fullname.firstname === "string" &&
          typeof fullname.lastname === "string"
        ) {
          console.log("CaptainContext: Parsed fullname object:", fullname);
          setCaptain({ firstname: fullname.firstname, lastname: fullname.lastname });
        } else if (typeof fullname === "string") {
          const [firstname, ...rest] = fullname.split(" ");
          const lastname = rest.join(" ") || "";
          setCaptain({ firstname, lastname });
          console.log("CaptainContext: Converted fullname string:", { firstname, lastname });
        } else {
          console.warn("CaptainContext: 'fullname' not in expected format:", response.data);
          setCaptain({ firstname: "Name", lastname: "Unavailable" });
        }

      } catch (err) {
        console.error("CaptainContext: Error fetching data:", err);

        if (err.response?.status === 401) {
          setError({ message: err.response.data.message || "Session expired. Please log in again." });
          localStorage.removeItem("token");
        } else if (err.response) {
          setError({ message: `Server Error: ${err.response.status} - ${err.response.data.message || "Unknown error"}` });
        } else if (err.request) {
          setError({ message: "Network Error: Could not connect to the server." });
        } else {
          setError({ message: "An unexpected error occurred." });
        }

        setCaptain(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainData();
  }, []);

  const values = {
    captain,
    setCaptain,
    isOnline,
    setIsOnline,
    isLoading,
    error,
    currentLocation,
    setCurrentLocation,
    activeRide,
    setActiveRide,
  };

  return (
    <CaptainDataContext.Provider value={values}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
