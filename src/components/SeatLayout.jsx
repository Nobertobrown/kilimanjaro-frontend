import { useState, useEffect } from "react";
// import { seats } from "../data/data.json";
import Button from "./ui/Button";
import Seat from "./ui/Seat";
import { useNavigate } from "react-router-dom";

const SeatLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const [seatStates, setSeatStates] = useState({ ...props.seatInfos });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalFare, setTotalFare] = useState(0);
  const navigate = useNavigate();

  // Calculate total fare whenever selected seats change
  useEffect(() => {
    let total = 0;
    selectedSeats.forEach((selectedSeat) => {
      const section = Object.keys(selectedSeat)[0];
      const seatNo = selectedSeat[section];
      const seat = seatStates[section].find((seat) => seat.seatNo === seatNo);
      total += parseInt(seat.price);
    });
    setTotalFare(total);
  }, [selectedSeats, seatStates]);

  const selectSeats = (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = { seats: selectedSeats }; //[...selectedSeatStrings]
    const bookingData = { ...props, ...formValues };
    console.log(formValues);
    navigate("/payment", { state: bookingData });
    setLoading(false);
  };

  const onSelect = (section, seatIndex) => {
    const seat = seatStates[section][seatIndex];
    const newSelectedSeats = [...selectedSeats];
    const seatNo = seat.seatNo;
    if (seat.isSelected) {
      // Remove seat if already selected
      const index = newSelectedSeats.findIndex(
        (selectedSeat) => selectedSeat[section] === seatNo
      );
      if (index !== -1) {
        newSelectedSeats.splice(index, 1);
      }
    } else {
      // Add seat if not selected
      newSelectedSeats.push({ [section]: seatNo });
    }
    setSelectedSeats(newSelectedSeats);
    const updatedSeatStates = { ...seatStates };
    updatedSeatStates[section] = seatStates[section].map((seat, index) => {
      if (index === seatIndex) {
        return {
          ...seat,
          isSelected: !seat.isSelected,
        };
      }
      return seat;
    });
    setSeatStates(updatedSeatStates);
  };

  // Formatting selected seats for display
  const selectedSeatStrings = selectedSeats.map((selectedSeat) => {
    const section = Object.keys(selectedSeat)[0];
    const seatNo = selectedSeat[section];
    return `${seatNo}`;
  });

  const resetSeatSelection = () => {
    const updatedSeatInfos = {};
    for (const [key, value] of Object.entries(seatStates)) {
      updatedSeatInfos[key] = value.map((seat) => ({
        ...seat,
        isSelected: false,
      }));
    }
    setSeatStates(updatedSeatInfos);
    setSelectedSeats([]);
    const form = document.getElementById("selectSeats");
    form.reset();
  };

  return (
    <section className="border p-4 rounded-md space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="w-full">Select seats</h2>
        <Button
          text="Clear Selection"
          onClick={resetSeatSelection}
          className="max-w-max text-xs bg-red-500"
        />
      </div>
      <hr />
      <div className="flex gap-2">
        <div className="flex gap-1">
          <div className="p-3 rounded bg-green-500" />
          Available
        </div>
        <div className="flex gap-1">
          <div className="p-3 rounded bg-red-500" />
          Selected
        </div>
        <div className="flex gap-1">
          <div className="p-3 rounded bg-blue-500" />
          Booked
        </div>
      </div>
      <form id="selectSeats" onSubmit={selectSeats} className="space-y-4">
        <div className="flex flex-col min-[498px]:flex-row gap-10">
          <div className="border w-[280px] p-3 rounded-t-xl">
            <img src="images/steering-wheel.png" className="h-11 ml-auto mb-3" />
            <aside className="flex w-64 gap-1 border px-2 py-2">
              {Object.entries(seatStates).map(([section, seats]) => (
                <div key={section} className="flex flex-col gap-1 self-end">
                  {seats.map((seat, index) => (
                    <Seat
                      key={seat.seatNo}
                      label={seat.seatNo}
                      seat={seat}
                      onClick={() => onSelect(section, index)}
                    />
                  ))}
                </div>
              ))}
            </aside>
          </div>
          <aside className="flex flex-col gap-2">
            <div className="font-bold">
              Selected seats: {selectedSeatStrings.join(", ")}
            </div>
            <div className="font-bold">Total Fare: {totalFare}</div>
          </aside>
        </div>
        <Button text="Proceed To Book" type="submit" loading={loading} />
      </form>
    </section>
  );
};

export default SeatLayout;
