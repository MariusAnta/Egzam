import { loginUser } from "./authService"; // arba iš kur pas tave login funkcija
import { useAuth } from "../context/AuthContext";

export const useLoginService = () => {
  const { login } = useAuth();

  const handleLogin = async (username, password, setLoading, setLoginError) => {
    setLoading(true);
    setLoginError("");
    try {
      const token = await loginUser(username, password);
      login(token);
      return true;
    } catch (error) {
      setLoginError(error.message || "Nepavyko prisijungti");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};
