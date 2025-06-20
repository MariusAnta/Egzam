import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const isAdmin =
    user?.roles?.some((role) => role?.name === "ROLE_ADMIN") || false;

  const getNavLinkClass = (isActive) =>
    isActive ? "underline font-semibold" : "hover:underline";

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-orange-100 shadow-md">
      <nav className="flex gap-6">
        <NavLink
          to="/tours/solo"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          Solo turai
        </NavLink>
        <NavLink
          to="/tours/group"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          Grupiniai turai
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Admin
          </NavLink>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-700">Sveiki, {user.username}</span>
            <button
              onClick={handleLogoutClick}
              className="text-red-500 hover:text-red-400 transition"
            >
              Atsijungti
            </button>
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="text-orange-600 hover:text-orange-400 transition"
          >
            Prisijungti
          </button>
        )}
      </div>
    </header>
  );
}

export default NavBar;
