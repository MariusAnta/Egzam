import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditTourModal = ({ isOpen, onClose, editType, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [availableDates, setAvailableDates] = useState(
    initialData.availableDates || []
  );

  const handleDateChange = (date) => {
    if (!date) return;
    const exists = availableDates.some(
      (d) => new Date(d).toDateString() === date.toDateString()
    );
    const updatedDates = exists
      ? availableDates.filter(
          (d) => new Date(d).toDateString() !== date.toDateString()
        )
      : [...availableDates, date.toISOString().split("T")[0]];
    setAvailableDates(updatedDates);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      setFormData((prev) => ({
        ...prev,
        imageBase64: base64Data,
        imageName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      availableDates,
      price: parseFloat(formData.price),
      durationMinutes: parseInt(formData.durationMinutes),
      likes: parseInt(formData.likes || 0),
      ...(editType === "group" && {
        maxGroupSize: parseInt(formData.maxGroupSize || 0),
      }),
    };
    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          Redaguoti {editType === "group" ? "Grupinę" : "Solo"} Ekskursiją
        </h3>

        <input
          name="title"
          placeholder="Pavadinimas"
          value={formData.title}
          onChange={handleInputChange}
          className="block w-full border p-2 mb-3"
        />

        <input
          name="price"
          placeholder="Kaina"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          className="block w-full border p-2 mb-3"
        />

        <input
          name="durationMinutes"
          placeholder="Trukmė minutėmis"
          type="number"
          value={formData.durationMinutes}
          onChange={handleInputChange}
          className="block w-full border p-2 mb-3"
        />

        <input
          name="likes"
          placeholder="Patinka (likes)"
          type="number"
          value={formData.likes}
          onChange={handleInputChange}
          className="block w-full border p-2 mb-3"
        />

        {editType === "group" ? (
          <>
            <input
              name="maxGroupSize"
              placeholder="Maks. žmonių skaičius"
              type="number"
              value={formData.maxGroupSize}
              onChange={handleInputChange}
              className="block w-full border p-2 mb-3"
            />
            <input
              name="guideName"
              placeholder="Gido vardas"
              value={formData.guideName}
              onChange={handleInputChange}
              className="block w-full border p-2 mb-3"
            />
          </>
        ) : (
          <input
            name="contactEmail"
            placeholder="Kontaktinis el. paštas"
            type="email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="block w-full border p-2 mb-3"
          />
        )}

        <label className="font-medium block mb-1">Galimos datos:</label>
        <DatePicker
          selected={null}
          onChange={handleDateChange}
          inline
          highlightDates={availableDates.map((d) => new Date(d))}
        />
        <div className="text-sm text-gray-600 mt-2 mb-3">
          Pasirinktos datos: {availableDates.join(", ")}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3"
        />
        {formData.imageName && (
          <p className="text-sm text-gray-600 mb-3">
            Failas: {formData.imageName}
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
          >
            Išsaugoti pakeitimus
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
          >
            Atšaukti
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTourModal;
