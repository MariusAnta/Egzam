import React from "react";
import { useForm } from "react-hook-form";
import modal_close_icon from "../assets/modalCloseIcon.webp";
import { registerUser } from "../services/registrationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const [serverError, setServerError] = React.useState("");

  const onSubmit = async (data) => {
    setServerError("");

    try {
      await registerUser(data);
      toast.success("Registracija sėkminga!");
      reset();
      onClose();
    } catch (e) {
      setServerError(e.message || "Serverio klaida.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className=" bg-orange-100 p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute top-2 right-2 cursor-pointer hover:opacity-50"
        >
          <img src={modal_close_icon} className="w-6" alt="close icon" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Registracija</h2>

        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username">Vartotojo vardas</label>
            <input
              id="username"
              type="text"
              className="w-full border rounded p-2 mt-1"
              {...register("username", {
                required: "Vartotojo vardas yra privalomas",
                minLength: {
                  value: 5,
                  message: "Min. 5 simboliai",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          </div>

          <div>
            <label htmlFor="password">Slaptažodis</label>
            <input
              id="password"
              type="password"
              className="w-full border rounded p-2 mt-1"
              {...register("password", {
                required: "Slaptažodis yra privalomas",
                minLength: {
                  value: 5,
                  message: "Min. 5 simboliai",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div>
            <label htmlFor="password">Pakartoti slaptažodį</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border rounded p-2 mt-1"
              {...register("confirmPassword", {
                required: "Pakartokite slaptažodį",
                validate: (value) =>
                  value === watch("password") || "Slaptažodžiai nesutampa",
              })}
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Registruotis
          </button>
        </form>

        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="mt-4 text-blue-500 text-sm underline block mx-auto cursor-pointer hover:opacity-50"
        >
          Atšaukti
        </button>
      </div>
    </div>
  );
}

export default RegistrationModal;
