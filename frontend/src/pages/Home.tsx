import { useEffect, useState } from "react";
import API from "../services/api";
import type { Show } from "../types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const navigate = useNavigate();

  const fetchShows = async () => {
    try {
      const res = await API.get("/shows");
      setShows(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Shows</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shows.map((show) => (
          <div
            key={show.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/booking/${show.id}`)}
          >
            <h2 className="text-xl font-semibold">{show.name}</h2>
            <p>{new Date(show.start_time).toLocaleString()}</p>
            <p>Seats: {show.available_seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;