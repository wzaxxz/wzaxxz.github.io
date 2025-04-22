import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/events">Події</Link>
          </li>
          <li>
            <Link to="/bookings">Мої бронювання</Link>
          </li>
          <li>
            <Link to="/about">Про нас</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
