import React, { useState, useEffect } from "react";
import CustomWheel from "../components/wheel";
import RestaurantModal from "../components/RestaurantModal";
import '../CSS/home.css';

const Home = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const city = "slo"; // Later, get city from user input

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/restaurants/${city.toLowerCase()}`,
        );
        const data = await res.json();

        // Ensure data is an array before setting state
        if (Array.isArray(data) && data.length > 0) {
          setRestaurants(data);
        } else {
          console.error("Invalid data format:", data);
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSpinClick = () => {
    if (restaurants.length === 0) {
      console.warn("No restaurants available to spin.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setSelectedItem(restaurants[prizeNumber]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home-container">
      <h1>What's For Dinner?</h1>
      {restaurants.length > 0 ? (
        <>
          <CustomWheel
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            onStopSpinning={handleStopSpinning}
            data={restaurants.map((r, index) => ({
              option: "",
              style: {
                backgroundColor: [
                  "red",
                  "blue",
                  "green",
                  "yellow",
                  "purple",
                  "orange",
                  "pink",
                  "brown",
                ][index % 8],
              },
            }))}
          />
          <button className="spin-button" onClick={handleSpinClick}>Spin the Wheel!</button>
        </>
      ) : (
        <p>Loading restaurants or no restaurants found...</p>
      )}
      {selectedItem && <p>Selected Restaurant: {selectedItem.name}</p>}

      <RestaurantModal
        open={open}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Home;
