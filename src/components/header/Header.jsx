import { NavLink, useLocation } from "react-router-dom";
import "../../styles/components/header/Header.scss";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <nav>
        {location.pathname !== "/" && <NavLink to="/">Home</NavLink>}
        {location.pathname !== "/todo" && (
          <NavLink to="todo">Todo List</NavLink>
        )}
        {location.pathname !== "/product-list" && (
          <NavLink to="product-list">Product List</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
