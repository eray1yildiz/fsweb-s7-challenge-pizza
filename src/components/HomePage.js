import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="home-page">
      <h1>
        KOD ACIKTIRIR <br></br>PIZZA, DOYURUR
      </h1>
      <br></br>
      <Link to="/pizza">
        <Button data-cy="firsButton" id="order-pizza" className="rounded-pill">
          ACIKTIM
        </Button>
      </Link>
    </div>
  );
};
export default HomePage;
