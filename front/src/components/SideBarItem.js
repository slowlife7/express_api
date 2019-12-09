import React from "react";
import { Link } from "react-router-dom";
const SideBarItem = ({ path, title }) => {
  return (
    <li>
      <Link to={path}>{title}</Link>
    </li>
  );
};

export default SideBarItem;
