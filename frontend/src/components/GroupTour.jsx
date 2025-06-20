import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // atnaujink kelią jei reikia

function GroupTour() {
  const [groupTours, setGroupTours] = useState([]);
  const [likedTours, setLikedTours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, isAuthenticated } = useAuth(); // ← Paimam token

  const fetchGroupTours = async () => {
    try {
      const response = await fetch("/api/tours/group");

      if (response.ok) {
        const data = await response.json();
        const tours = Array.isArray(data) ? data : [data];
        setGroupTours(tours);

        // Inicializuojam visų turų "liked" statusą į false
        const initialLikes = {};
        tours.forEach((tour) => {
          initialLikes[tour.id] = false;
        });
        setLikedTours(initialLikes);
      } else {
        setError("Nepavyko gauti duomenų.");
      }
    } catch (error) {
      console.error("Klaida:", error);
      setError("Serverio klaida.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (tourId) => {
    const isLiked = likedTours[tourId];

    // Lokaliai atnaujinam turą
    setGroupTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === tourId
          ? {
              ...tour,
              likes: isLiked ? tour.likes - 1 : tour.likes + 1,
            }
          : tour
      )
    );

    setLikedTours((prev) => ({
      ...prev,
      [tourId]: !prev[tourId],
    }));

    // Siunčiam į backend
    try {
      const response = await fetch(`/api/tours/${tourId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ← ČIA SVARBIAUSIA
        },
        body: JSON.stringify({ like: !isLiked }),
      });

      if (!response.ok) {
        console.error("Nepavyko atnaujinti like būsenos serveryje.");
      }
    } catch (error) {
      console.error("Klaida siunčiant PUT užklausą:", error);
    }
  };
  useEffect(() => {
    fetchGroupTours();
  }, []);

  if (loading) return <p className="text-center p-4">Kraunama...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Grupinės Ekskursijos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupTours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={`data:image/png;base64,${tour.imageBase64}`}
              alt={tour.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-1">{tour.title}</h2>
            <p className="text-gray-600">Kaina: ${tour.price.toFixed(2)}</p>
            <p className="text-gray-600">Trukmė: {tour.durationMinutes} min</p>
            <p className="text-gray-600 flex items-center gap-2">
              Patinka: {tour.likes}
              {isAuthenticated && (
                <button
                  onClick={() => toggleLike(tour.id)}
                  className={`px-2 py-1 rounded text-sm font-medium transition ${
                    likedTours[tour.id]
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {likedTours[tour.id] ? "Atšaukti" : "Patinka"}
                </button>
              )}
            </p>
            <p className="text-gray-600">Gidas: {tour.guideName}</p>
            <p className="text-gray-600 mb-2">
              Dalyvių skaičius iki: {tour.maxGroupSize}
            </p>
            <div>
              <h3 className="font-medium">Galimos datos:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {tour.availableDates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupTour;
