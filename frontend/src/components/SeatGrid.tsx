
interface Props {
  total: number;
  selectedSeats: number[];
  bookedSeats: number[]; // ✅ ADD THIS
  setSelectedSeats: (seats: number[]) => void;
}

const SeatGrid = ({
  total,
  selectedSeats,
  bookedSeats,
  setSelectedSeats,
}: Props) => {
  const seats = Array.from({ length: total }, (_, i) => i + 1);

  const toggleSeat = (seat: number) => {
    if (bookedSeats.includes(seat)) return; 

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2 mt-4">
      {seats.map((seat) => {
        const isBooked = bookedSeats.includes(seat);
        const isSelected = selectedSeats.includes(seat);

        return (
          <div
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={`p-2 text-center rounded-md border transition
  ${isBooked ? "bg-red-200 border-red-400 text-red-800 opacity-80 cursor-not-allowed" : ""}
  ${isSelected ? "bg-green-500 border-green-700 text-white" : ""}
  ${
    !isBooked && !isSelected
      ? "bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer"
      : ""
  }
`}
          >
            {seat}
          </div>
        );
      })}
    </div>
  );
};

export default SeatGrid;