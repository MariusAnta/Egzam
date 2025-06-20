export const registerUser = async (formData) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.username || "Klaida registruojant.");
  }

  return await res.json();
};

export const registerAdmin = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/register-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.username || "Klaida registruojant.");
  }

  return await res.json();
};
