import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/community">COMMUNITY</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
