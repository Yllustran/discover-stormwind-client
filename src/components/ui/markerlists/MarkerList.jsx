import React from "react";
import CustomMarker from "../marker/CustomMarker";
import Cathedrale from "../../../assets/images/Cathedrale.jpeg";
import LionHeart from "../../../assets/images/Lionheart_Armory.jpg";
import MageTower from "../../../assets/images/MageTower.png";

// Liste des marqueurs avec leurs icônes et positions
const markers = [
  { 
    position: [1240, 2130], 
    name: "Cathédrale de la lumière", 
    description: "Une magnifique cathédrale illuminée par des vitraux resplendissants.",
    type: "tourist",
    image: Cathedrale
  },
  { 
    position: [270, 1965], 
    name: "Wizard's Sanctum", 
    description: "Within the Wizard's Sanctum, the kingdom's mages study the arts of arcane magic, while their community have a task to ensure the safety of the capital and its lands", 
    type: "tourist",
    image: MageTower
  },
  { 
    position: [800, 2510], 
    name: "Lionheart Armory", 
    description: "Lionheart Armory is a cloth, leather, and mail armor shop located in the Trade District of Stormwind.", 
    type: "merchant",
    image: LionHeart
  },
];

const MarkersList = () => {
  return (
    <>
      {markers.map((marker, index) => (
        <CustomMarker
          key={index}
          position={marker.position}
          type={marker.type}
          defaultIcon={marker.icon}
          name={marker.name}
          description={marker.description} 
          image={marker.image}
        />
      ))}
    </>
  );
};

export default MarkersList;
