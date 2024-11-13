import React, { useState } from "react"; // Corrected `useState` import

function NewPlantForm({ addPlant }) {
  const [plantName, setPlantName] = useState([]);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlant = {
      name: plantName, // Changed `name` to `plantName`
      image,
      price: parseFloat(price),
      inStock: true
    };

    // Send POST request to add the new plant
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then((res) => res.json())
      .then((data) => {
        addPlant(data); // Call the callback to update parent state
        setPlantName(""); // Changed `setName` to `setPlantName`
        setImage("");
        setPrice("");
      });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
          name="name"
          placeholder="Plant name"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
          placeholder="Image URL"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          step="0.01"
          placeholder="Price"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
