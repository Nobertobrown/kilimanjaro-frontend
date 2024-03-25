import { useState, useEffect } from "react";

const Seat = (props) => {
  const { label, seat, onClick, ...restProps } = props;
  const [source, setSource] = useState("images/car-seat-b-available.png");

  useEffect(() => {
    if (seat.isSelected) {
      setSource("images/car-seat-b-selected.png");
    } else {
      setSource("images/car-seat-b-available.png");
    }
  }, [seat.isSelected]);

  const handleClick = () => {
    onClick();
    if (seat.isSelected) {
      setSource("images/car-seat-b-available.png");
    } else {
      setSource("images/car-seat-b-selected.png");
    }
  };

  return (
    <div className="flex flex-col items-center shrink-0">
      <input
        type="checkbox"
        checked={seat.isSelected}
        onChange={() => {}} // No need for onChange here
        className="hidden"
        {...restProps}
      />
      <img src={source} className="h-12" onClick={handleClick} />
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
};

export default Seat;
