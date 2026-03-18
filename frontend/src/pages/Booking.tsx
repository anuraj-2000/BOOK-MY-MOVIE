
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import SeatGrid from "../components/SeatGrid";
import type { Show } from "../types";

const Booking = () => {
  const { id } = useParams();
  const showId = Number(id);

  const [show, setShow] = useState<Show | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

 
  const fetchShow = async () => {
    try {
      const res = await API.get("/shows");
      const found = res.data.find((s: Show) => s.id === showId);
      setShow(found || null);
    } catch (error) {
      console.error(error);
    }
  };

 
  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/${showId}`);

      const booked: number[] = [];
      let seatCounter = 1;

      res.data.forEach((b: { seats: number }) => {
        for (let i = 0; i < b.seats; i++) {
          booked.push(seatCounter++);
        }
      });

      setBookedSeats(booked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShow();
    fetchBookings();
  }, []);


  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/bookings", {
        showId: showId,
        seats: selectedSeats.length,
      });

      setStatus(res.data.status);

     
      await fetchBookings();
      setSelectedSeats([]);
    } catch {
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{show.name}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(show.start_time).toLocaleString()}
      </p>

     
      <SeatGrid
        total={show.total_seats}
        selectedSeats={selectedSeats}
        bookedSeats={bookedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      
      <div className="flex gap-4 mt-4 text-sm">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-gray-200 rounded"></span> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-500 rounded"></span> Selected
        </span>
       <span className="flex items-center gap-1">
  <span className="w-4 h-4 bg-red-200 border border-red-400 rounded"></span> Booked
</span>
      </div>

    
      <button
        onClick={handleBooking}
        disabled={loading}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
      >
        {loading
          ? "Processing..."
          : `Book ${selectedSeats.length} Seat(s)`}
      </button>


      {status && (
        <p className="mt-4 font-semibold">
          Status:{" "}
          <span
            className={
              status === "CONFIRMED" ? "text-green-600" : "text-red-500"
            }
          >
            {status}
          </span>
        </p>
      )}
    </div>
  );
};

export default Booking;