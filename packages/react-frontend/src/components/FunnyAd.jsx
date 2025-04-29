import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const FunnyAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const companyAds = [
    "🍔 McDonald's: Because no matter what's for dinner, you know you want fries with that!",
    "🥤 Coca-Cola: The perfect drink to wash down your indecision",
    "🍕 Domino's: When you can't choose, pizza is always the answer",
    "🌮 Taco Bell: Live Más while you browse for más options",
    "🍗 KFC: Finger lickin' good decisions start here",
    "🍦 Dairy Queen: Because you'll need dessert after all this browsing",
    "🍪 Subway: Eat fresh while you're still deciding",
    "☕ Starbucks: Fuel your restaurant hunting with a Frappuccino",
    "🍔 Wendy's: Where's the beef? Right here while you're still looking",
    "🌭 Five Guys: Burgers and fries while you analyze",
  ];

  useEffect(() => {
    let adInterval;

    const startAdInterval = () => {
      // Show new ad every 30 seconds
      adInterval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % companyAds.length);
        setShowAd(true);
      }, 30000);
    };

    // Show first ad after 5 seconds
    const initialTimeout = setTimeout(() => {
      setShowAd(true);
      startAdInterval();
    }, 5000);

    return () => {
      clearInterval(adInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAd(false);

    // Set timer to show next ad in 30 seconds
    setTimeout(() => {
      setCurrentAdIndex((prev) => (prev + 1) % companyAds.length);
      setShowAd(true);
    }, 30000);
  };

  return (
    <Snackbar
      open={showAd}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ClickAwayListenerProps={{ onClickAway: () => null }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        variant="filled"
        sx={{
          width: "100%",
          backgroundColor: "#333333",
          color: "white",
          "& .MuiAlert-icon": {
            color: "white",
          },
          border: "1px solid white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {companyAds[currentAdIndex]}
      </Alert>
    </Snackbar>
  );
};

export default FunnyAd;
