import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function SoloTour() {
  const [soloTours, setSoloTours] = useState([]);
  const [likedTours, setLikedTours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, isAuthenticated } = useAuth();

  const fetchLikedTours = async (tours) => {
    try {
      const response = await fetch("/api/tours/liked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const likedTourIds = await response.json(); // ex. [1, 2, 5]
        const likesMap = {};
        tours.forEach((tour) => {
          likesMap[tour.id] = likedTourIds.includes(tour.id);
        });
        setLikedTours(likesMap);
      } else {
        console.warn("Nepavyko gauti liked turų.");
      }
    } catch (err) {
      console.error("Klaida gaunant liked turus:", err);
    }
  };

  const fetchSoloTours = async () => {
    try {
      const response = await fetch("/api/tours/solo");
      if (!response.ok) throw new Error("Nepavyko gauti turų.");

      const tours = await response.json();
      const normalizedTours = Array.isArray(tours) ? tours : [tours];
      setSoloTours(normalizedTours);

      if (isAuthenticated) {
        await fetchLikedTours(normalizedTours);
      }
    } catch (err) {
      console.error(err);
      setError("Įvyko klaida gaunant duomenis.");
    } finally {
      setLoading(false);
    }
  };

  const likeTour = async (tourId) => {
    if (likedTours[tourId]) return;

    try {
      const response = await fetch(`/api/tours/${tourId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSoloTours((prevTours) =>
          prevTours.map((tour) =>
            tour.id === tourId ? { ...tour, likes: tour.likes + 1 } : tour
          )
        );

        setLikedTours((prev) => ({
          ...prev,
          [tourId]: true,
        }));
      } else if (response.status === 409) {
        alert("Jūs jau pažymėjote šią ekskursiją kaip patinkančią.");
        setLikedTours((prev) => ({
          ...prev,
          [tourId]: true,
        }));
      } else {
        console.error("Nepavyko atlikti like");
      }
    } catch (err) {
      console.error("Klaida siunčiant like:", err);
    }
  };

  useEffect(() => {
    fetchSoloTours();
  }, []);

  if (loading) return <p className="text-center p-4">Kraunama...</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Solo Ekskursijos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {soloTours.map((tour) => (
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
            </p>

            {isAuthenticated && (
              <div className="mt-2">
                <button
                  onClick={() => likeTour(tour.id)}
                  disabled={likedTours[tour.id]}
                  className={`px-2 py-1 rounded text-sm font-medium transition ${
                    likedTours[tour.id]
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {likedTours[tour.id] ? "Jau patiko" : "Patinka"}
                </button>
              </div>
            )}

            <p className="text-gray-600 mb-2">
              Kontaktas:{" "}
              <a
                href={`mailto:${tour.contactEmail}`}
                className="text-blue-600 underline"
              >
                {tour.contactEmail}
              </a>
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

export default SoloTour;
