import { useState } from "react";
import API from "../services/api";

const Admin = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [seats, setSeats] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!name || !startTime || seats <= 0) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    try {
      await API.post("/shows", {
        name,
        start_time: startTime,
        total_seats: seats,
      });

      alert("Show created successfully!");

    
      setName("");
      setStartTime("");
      setSeats(0);
    } catch {
      alert("Error creating show");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🎬 Admin - Create Show
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Show Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Total Seats"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Show"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;