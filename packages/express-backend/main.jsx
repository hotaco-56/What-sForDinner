import React from "react";
import ReacDOMClient from "react-dom/client";
import WhatsForDinner from ./WhatsForDinner;

//Create the container
const container = document.getElementById("root");

//Create a root
const root = ReactDOMClient.createRoot(container);

//Initial render:
root.render(<MyApp/>);
