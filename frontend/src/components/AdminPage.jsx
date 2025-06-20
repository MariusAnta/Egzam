import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import EditTourModal from "./EditTourModal";

function AdminTours() {
  const [soloTours, setSoloTours] = useState([]);
  const [groupTours, setGroupTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditTour, setCurrentEditTour] = useState(null);
  const [editType, setEditType] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "group",
      title: "",
      price: "",
      durationMinutes: "",
      maxGroupSize: "",
      guideName: "",
      contactEmail: "",
      image: null,
      imageName: "",
    },
  });

  const watchType = watch("type");

  useEffect(() => {
    fetchGroupTours();
    fetchSoloTours();
  }, []);

  const fetchGroupTours = async () => {
    try {
      const res = await fetch("/api/tours/group");
      const data = await res.json();
      setGroupTours(data);
    } catch (err) {
      console.error("Klaida gaunant grupines ekskursijas:", err);
    }
  };

  const fetchSoloTours = async () => {
    try {
      const res = await fetch("/api/tours/solo");
      const data = await res.json();
      const fixedData = data.map((tour) => ({
        ...tour,
        availableDates: tour.availableDates || [],
      }));
      setSoloTours(fixedData);
    } catch (err) {
      console.error("Klaida gaunant solo ekskursijas:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setValue("imageName", file.name);
    }
  };

  const onSubmit = async (data) => {
    if (availableDates.length === 0) {
      alert("Pasirinkite bent vieną datą!");
      return;
    }

    if (!data.image) {
      alert("Pasirinkite nuotrauką!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(",")[1];
      const dates = availableDates.map((d) => d.toISOString().split("T")[0]);

      const payload = {
        title: data.title,
        price: parseFloat(data.price),
        durationMinutes: parseInt(data.durationMinutes),
        imageBase64: base64Data,
        availableDates: dates,
        guideName: data.type === "group" ? data.guideName : undefined,
        maxGroupSize:
          data.type === "group" ? parseInt(data.maxGroupSize || 0) : undefined,
        contactEmail: data.type === "solo" ? data.contactEmail : undefined,
      };

      try {
        const response = await fetch(
          data.type === "group" ? "/api/tours/group" : "/api/tours/solo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          alert("Ekskursija sėkmingai įkelta!");
          reset();
          setAvailableDates([]);
          fileInputRef.current.value = "";
          data.type === "group" ? fetchGroupTours() : fetchSoloTours();
        } else {
          alert("Nepavyko įkelti ekskursijos.");
        }
      } catch (error) {
        alert("Serverio klaida.");
        console.error(error);
      }
    };

    reader.readAsDataURL(data.image);
  };

  const handleDateChange = (date) => {
    const exists = availableDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    const updated = exists
      ? availableDates.filter((d) => d.toDateString() !== date.toDateString())
      : [...availableDates, date];
    setAvailableDates(updated);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Ar tikrai norite ištrinti?")) return;
    try {
      const res = await fetch(`/api/tours/${type}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        type === "group" ? fetchGroupTours() : fetchSoloTours();
      } else {
        alert("Nepavyko ištrinti.");
      }
    } catch (error) {
      console.error("Klaida trinant:", error);
    }
  };

  const handleEditTour = (tour, type) => {
    setCurrentEditTour(tour);
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleSaveTour = async (updatedData) => {
    try {
      const res = await fetch(`/api/tours/${editType}/${currentEditTour.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert(`Ekskursija atnaujinta!`);
        setIsModalOpen(false);
        editType === "group" ? fetchGroupTours() : fetchSoloTours();
      } else {
        alert("Nepavyko atnaujinti ekskursijos.");
      }
    } catch (error) {
      alert("Serverio klaida.");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">
        Ekskursijų valdymas
      </h2>

      {/* Modalas redagavimui */}
      <EditTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editType={editType}
        initialData={currentEditTour || {}}
        onSave={handleSaveTour}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto mb-10 bg-white rounded-xl p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Nauja ekskursija</h3>

        <select {...register("type")} className="block w-full border p-2 mb-3">
          <option value="group">Grupinė</option>
          <option value="solo">Solo</option>
        </select>

        <input
          {...register("title", { required: "Privalomas laukas" })}
          placeholder="Pavadinimas"
          className="block w-full border p-2 mb-3"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
        )}

        <input
          {...register("price", { required: "Privalomas laukas" })}
          placeholder="Kaina"
          type="number"
          className="block w-full border p-2 mb-3"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mb-2">{errors.price.message}</p>
        )}

        <input
          {...register("durationMinutes", { required: "Privalomas laukas" })}
          placeholder="Trukmė minutėmis"
          type="number"
          className="block w-full border p-2 mb-3"
        />
        {errors.durationMinutes && (
          <p className="text-red-500 text-sm mb-2">
            {errors.durationMinutes.message}
          </p>
        )}

        {watchType === "group" && (
          <>
            <input
              {...register("maxGroupSize")}
              placeholder="Maks. žmonių skaičius"
              type="number"
              className="block w-full border p-2 mb-3"
            />

            <input
              {...register("guideName")}
              placeholder="Gido vardas"
              className="block w-full border p-2 mb-3"
            />
          </>
        )}

        {watchType === "solo" && (
          <input
            {...register("contactEmail")}
            placeholder="Kontaktinis el. paštas"
            type="email"
            className="block w-full border p-2 mb-3"
          />
        )}

        <label className="font-medium block mb-1">Galimos datos:</label>
        <DatePicker
          selected={null}
          onChange={handleDateChange}
          inline
          highlightDates={availableDates}
        />
        <div className="text-sm text-gray-600 mt-2 mb-3">
          Pasirinktos datos:{" "}
          {availableDates.map((d) => d.toISOString().split("T")[0]).join(", ")}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="mb-3"
        />
        {watch("imageName") && (
          <p className="text-sm text-gray-600 mb-3">
            Failas: {watch("imageName")}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Įkelti ekskursiją
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Grupinės ekskursijos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {groupTours.map((tour) => (
          <div
            key={tour.id}
            className="border p-4 rounded shadow bg-white flex flex-col"
          >
            <img
              src={`data:image/png;base64,${tour.imageBase64}`}
              alt={tour.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-bold mb-1">{tour.title}</h4>
            <p>Kaina: {tour.price} EUR</p>
            <p>Trukmė: {tour.durationMinutes} min.</p>
            <p>Gidas: {tour.guideName}</p>
            <p>Maks. žmonių: {tour.maxGroupSize}</p>
            <p>Patinka: {tour.likes}</p>
            <h3 className="font-medium">Galimos datos:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {tour.availableDates.map((date) => (
                <li key={date}>{date}</li>
              ))}
            </ul>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleEditTour(tour, "group")}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Redaguoti
              </button>
              <button
                onClick={() => handleDelete(tour.id, "group")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Ištrinti
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold mb-4">Solo ekskursijos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {soloTours.map((tour) => (
          <div
            key={tour.id}
            className="border p-4 rounded shadow bg-white flex flex-col"
          >
            <img
              src={`data:image/png;base64,${tour.imageBase64}`}
              alt={tour.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-bold mb-1">{tour.title}</h4>
            <p>Kaina: {tour.price} EUR</p>
            <p>Trukmė: {tour.durationMinutes} min.</p>
            <p>Patinka: {tour.likes}</p>
            <p>Kontaktinis el. paštas: {tour.contactEmail}</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {tour.availableDates.map((date) => (
                <li key={date}>{date}</li>
              ))}
            </ul>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => handleEditTour(tour, "solo")}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Redaguoti
              </button>
              <button
                onClick={() => handleDelete(tour.id, "solo")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Ištrinti
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTours;
