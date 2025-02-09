// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const restaurants = {
  restaurants_list: [
    {
      name: "Luigi's Italian Bistro",
      description: "Authentic Italian cuisine with fresh ingredients.",
      category: "Italian",
      price: "$$$",
      avg_rating: 4.7,
    },
    {
      name: "Sakura Sushi",
      description: "Traditional Japanese sushi and sashimi.",
      category: "Japanese",
      price: "$$",
      avg_rating: 4.5,
    },
    {
      name: "BBQ Haven",
      description: "Slow-smoked BBQ ribs and brisket.",
      category: "BBQ",
      price: "$$",
      avg_rating: 4.8,
    },
    {
      name: "Vegan Delight",
      description: "Plant-based meals with organic ingredients.",
      category: "Vegan",
      price: "$$",
      avg_rating: 4.6,
    },
    {
      name: "Golden Dragon",
      description: "Traditional Chinese cuisine with a modern twist.",
      category: "Chinese",
      price: "$",
      avg_rating: 4.3,
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
