import React from "react";
import CustomMarker from "../marker/CustomMarker";
import UsePlaces from "../../../hooks/places/UsePlaces";


// Mapping entre category_id et les icônes
const categoryIconMapping = {
  9: "tourist",   // Exemple : ID 9 = icône tourist
  1: "merchant",  // Exemple : ID 10 = icône merchant
};

const MarkersList = () => {
  const { places, loading, error } = UsePlaces();

  if (loading) return <p>Chargement des marqueurs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      {places.map((place, index) => {
        const categoryType = categoryIconMapping[place.category_id] || "default"; // Vérifie par category_id
        return (
          <CustomMarker
            key={index}
            position={[place.latitude, place.longitude]}
            type={categoryType}
            name={place.name}
            description={place.description}
            image={place.image ? `http://localhost:8000/storage/${place.image}` : null}
          />
        );
      })}
    </>
  );
};

export default MarkersList;