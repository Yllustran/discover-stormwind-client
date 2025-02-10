import React from "react";
import MapView from "../modules/mapview/MapView";
import UserInfo from "../modules/userinfo/UserInfo";

const HomePage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4 bg-light">
      <UserInfo />
      <h1 className="display-4 fw-bold royal-blue ">Discover - Stormwind</h1>
      <MapView />
    </div>
  );
};
export default HomePage;


