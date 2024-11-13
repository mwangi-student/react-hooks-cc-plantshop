import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Manage the search query state

  // Fetch plants data from the server
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]); // Add new plant to the list
  };

  // Toggle the sold-out status for a plant
  const toggleSoldOut = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search setSearchQuery={setSearchQuery} />
      <PlantList
        plants={filteredPlants}
        toggleSoldOut={toggleSoldOut} // Pass toggleSoldOut function to PlantList
      />
    </main>
  );
}

export default PlantPage;
