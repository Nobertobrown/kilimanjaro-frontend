import { useState } from "react";

const Seat = (props) => {
  const { label, ...restProps } = props;
  const [isSelected, setIsSelected] = useState(false);
  const [source, setSource] = useState("images/car-seat-b-available.png");

  const handleClick = () => {
    if (isSelected) {
      setIsSelected(false);
      setSource("images/car-seat-b-available.png");
    } else {
      setIsSelected(true);
      setSource("images/car-seat-b-booked.png");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleClick}
        className="hidden"
        {...restProps}
      />
      <img src={source} className="h-11" onClick={handleClick} />
      <div className="text-xs">{label}</div>
    </div>
  );
};

export default Seat;
