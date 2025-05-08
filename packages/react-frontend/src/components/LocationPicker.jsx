import { useState, useEffect } from "react";

const LocationPicker = ({ token }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  // Location mapping: User-friendly names to actual values
  const locationMap = {
    "San Luis Obispo": "slo",
    "San Francisco": "sf",
    "Los Angeles": "la",
    "New York City": "nyc",
    Chicago: "chi",
    Miami: "mia",
    Austin: "atx",
    Honolulu: "hnl",
    "New Orleans": "nola",
  };

  // Reverse map for user-friendly names based on actual values
  const reverseLocationMap = Object.fromEntries(
    Object.entries(locationMap).map(([key, value]) => [value, key]),
  );

  // Fetch the current location when the component mounts
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/location", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        setSelectedLocation(data.location || ""); // Set the last saved location as default
      } catch (error) {
        console.error("Error fetching current location:", error.message);
      }
    };

    fetchCurrentLocation();
  }, [token]);

  const handleChange = async (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);

    try {
      const response = await fetch("http://localhost:8000/users/location", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location: newLocation }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Location updated:", data);
    } catch (error) {
      console.error("Error updating location:", error.message);
    }
  };

  return (
    <div>
      <label htmlFor="location">Location: </label>
      <select id="location" value={selectedLocation} onChange={handleChange}>
        {Object.entries(locationMap).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationPicker;
