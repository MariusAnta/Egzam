import axios from "axios";

export const loginUser = async (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  try {
    const response = await axios.post(
      "/api/token",
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Neteisingas vartotojo vardas arba slaptažodis");
  }
};
