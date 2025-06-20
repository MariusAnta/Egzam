// services/adminService.js

const API_URL = "/api/tours";

export const fetchSoloTours = async () => {
  const res = await fetch(`${API_URL}/solo`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Nepavyko gauti Solo turų");
  return await res.json();
};

export const fetchGroupTours = async () => {
  const res = await fetch(`${API_URL}/group`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Nepavyko gauti Grupinių turų");
  return await res.json();
};

export const createSoloTour = async (tourData) => {
  const res = await fetch(`${API_URL}/solo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) throw new Error("Nepavyko sukurti Solo turo");
  return await res.json();
};

export const createGroupTour = async (tourData) => {
  const res = await fetch(`${API_URL}/group`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(tourData),
  });
  if (!res.ok) throw new Error("Nepavyko sukurti Grupinio turo");
  return await res.json();
};

export const deleteSoloTour = async (id) => {
  const res = await fetch(`${API_URL}/solo/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Nepavyko pašalinti Solo turo");
};

export const deleteGroupTour = async (id) => {
  const res = await fetch(`${API_URL}/group/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!res.ok) throw new Error("Nepavyko pašalinti Grupinio turo");
};
