import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // <-- importas
import RegistrationModal from "./RegistrationModal";
import { useLoginService } from "../services/loginService";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const { handleLogin } = useLoginService();
  const navigate = useNavigate(); // <-- gauname navigate

  const onSubmit = async ({ username, password }) => {
    const success = await handleLogin(
      username,
      password,
      setLoading,
      setLoginError
    );
    if (success) {
      navigate("/tours/solo"); // <-- nukreipimas po sėkmės
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-orange-300 via-orange-200 to-orange-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-orange-100 p-8 rounded-lg shadow-sm space-y-6 w-full max-w-sm"
        noValidate
      >
        <h2 className="text-xl font-medium text-gray-800 text-center">
          Prisijungti
        </h2>

        {loginError && (
          <p className="text-red-500 text-sm text-center bg-red-100 border p-2 rounded">
            {loginError}
          </p>
        )}

        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-800"
          >
            Vartotojo vardas
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-orange-100 bg-orange-50 rounded-md p-3 mt-1"
            {...register("username", { required: "Būtina įvesti vardą" })}
          />
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Slaptažodis</label>
          <input
            type="password"
            id="password"
            className="w-full border border-orange-100  bg-orange-50 rounded-md p-3 mt-1"
            {...register("password", { required: "Būtina įvesti slaptažodį" })}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {loading ? "Jungiamasi..." : "Prisijungti"}
        </button>
      </form>
      <div className="flex gap-2 mt-6 text-sm">
        <p className="text-gray-600">Dar neturi paskyros?</p>
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="text-gray-800 hover:text-gray-600 font-medium transition-colors"
        >
          Registracija
        </button>
      </div>
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

export default LoginPage;
