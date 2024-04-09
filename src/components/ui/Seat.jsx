import { useState, useEffect } from "react";

const Seat = (props) => {
  const { label, seat, onClick } = props;
  const [source, setSource] = useState("images/car-seat-b-available.png");

  useEffect(() => {
    if (seat.isSelected) {
      setSource("images/car-seat-b-selected.png");
    } else {
      setSource("images/car-seat-b-available.png");
    }

    if (seat.isBooked) {
      setSource("images/car-seat-b-booked.png");
    }
  }, [seat.isBooked, seat.isSelected]);

  const handleClick = () => {
    if (seat.isBooked == false) {
      onClick();
      if (seat.isSelected) {
        setSource("images/car-seat-b-available.png");
      } else {
        setSource("images/car-seat-b-selected.png");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img src={source} className="h-12" onClick={handleClick} />
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
};

export default Seat;
