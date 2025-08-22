import React, { useContext, useState } from "react";
import { DataContext } from "../../store";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const history = useHistory();
  const { user, setUser } = useContext(DataContext);
  const [showLogout, setShowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("@Provi:userData");
    setUser(null);
    history.push("/Dashboard");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Finance</div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/Dashboard/pay" onClick={() => setMenuOpen(false)}>
          Minhas faturas
        </Link>
        <Link to="/Dashboard/order" onClick={() => setMenuOpen(false)}>
          Fazer pedido
        </Link>

        <div className="navbar-user" onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle size={22} className="user-icon" />
          <span className="username">{user?.name || "Usuário"}</span>

          {showLogout && (
            <div className="dropdown">
              <button onClick={handleLogout}>
                <FaSignOutAlt size={14} /> Sair
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>
    </nav>
  );
}

export default Header;
