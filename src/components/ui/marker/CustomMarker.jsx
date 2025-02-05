import React from "react";
import { Marker as LeafletMarker, Popup } from "react-leaflet";
import L from "leaflet";
import DefaultIcon from "../../../assets/images/icon/defaultIcon.png";
import TouristIcon from "../../../assets/images/icon/touristIcon.png";
import MerchantIcon from "../../../assets/images/icon/MerchantIcon.png";
import '../buttons/RegularButton.css'
import "./CutomMarker.css";


const iconMapping = {
  default: DefaultIcon,
  tourist: TouristIcon,
  merchant: MerchantIcon,
};

const CustomMarker = ({ position, name, description, image, type = "default"}) => {
  const selectedIcon = iconMapping[type] || DefaultIcon;

    const customIcon = L.icon({
      iconUrl: selectedIcon, // Image du marqueur
      iconSize: [25, 25], // Taille
      iconAnchor: [20, 40], // Ancrage
      popupAnchor: [0, -35], // Position du popup
    });
  

  return (
    <LeafletMarker position={position} icon={customIcon} className="icon-popup">
      <Popup>
        <div className="div-popup">
          <div>
            <h5 className="h5-popup">{name}</h5>
            <p className="p-popup">{description}</p>
          </div>
          {image && <img src={image} alt={name} className="image-popup"/>}
        </div>
        <button className="btn"> Lire l'article </button>
      </Popup>
    </LeafletMarker>
  );
};

export default CustomMarker;
