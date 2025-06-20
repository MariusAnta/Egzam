import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import SoloTour from "./components/SoloTour";
import GroupTour from "./components/GroupTour";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/AdminPage";

function App() {
  const { token, user } = useAuth();

  const isAdmin = user?.roles?.some((role) => role.name === "ROLE_ADMIN");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/tours/solo" replace />} />
        <Route path="/tours/solo" element={<SoloTour />} />
        <Route path="/tours/group" element={<GroupTour />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Čia gali pridėti ir kitus maršrutus */}
        {/* <Route path="*" element={<NotFound />} /> */}

        {token && isAdmin && <Route path="/admin" element={<AdminPage />} />}
      </Routes>
    </>
  );
}

export default App;
