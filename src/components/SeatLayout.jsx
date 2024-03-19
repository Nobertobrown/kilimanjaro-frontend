import { useState } from "react";
// import { seats } from "../data/data.json";
import Button from "./ui/Button";
import Seat from "./ui/Seat";
import { useNavigate } from "react-router-dom";

const SeatLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectSeats = (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formData.forEach((value) => {
      if (value !== "") {
        if (!formValues["seats"]) {
          formValues["seats"] = [];
        }
        formValues["seats"].push(value);
      }
    });

    const bookingData = { ...props, ...formValues };
    console.log(bookingData)
    navigate("/payment", { state: bookingData });
    setLoading(false);
  };

  const resetSeatSelection = () => {
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
        <div className="flex gap-10">
          <aside className="flex flex-col gap-2">
            <div className="flex gap-1">
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                  {[...Array(Math.floor(props.noOfSeats / 4))].map((_, i) => (
                    <Seat
                      key={`${String.fromCharCode(65 + i)}3`}
                      id={`${String.fromCharCode(65 + i)}3`}
                      value={`${String.fromCharCode(65 + i)}3`}
                      label={`${String.fromCharCode(65 + i)}3`}
                      name={`${String.fromCharCode(65 + i)}3`}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {[...Array(Math.floor(props.noOfSeats / 4))].map((_, i) => (
                    <Seat
                      key={`${String.fromCharCode(65 + i)}4`}
                      id={`${String.fromCharCode(65 + i)}4`}
                      value={`${String.fromCharCode(65 + i)}4`}
                      label={`${String.fromCharCode(65 + i)}4`}
                      name={`${String.fromCharCode(65 + i)}4`}
                    />
                  ))}
                </div>
              </div>
              <div className="self-end">
                <Seat
                  key={`${String.fromCharCode(
                    65 + Math.floor(props.noOfSeats / 4 - 1)
                  )}5`}
                  id={`${String.fromCharCode(
                    65 + Math.floor(props.noOfSeats / 4 - 1)
                  )}5`}
                  value={`${String.fromCharCode(
                    65 + Math.floor(props.noOfSeats / 4 - 1)
                  )}5`}
                  label={`${String.fromCharCode(
                    65 + Math.floor(props.noOfSeats / 4 - 1)
                  )}5`}
                  name={`${String.fromCharCode(
                    65 + Math.floor(props.noOfSeats / 4 - 1)
                  )}5`}
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                  {[...Array(Math.floor(props.noOfSeats / 4))].map((_, i) => (
                    <Seat
                      key={`${String.fromCharCode(65 + i)}2`}
                      id={`${String.fromCharCode(65 + i)}2`}
                      value={`${String.fromCharCode(65 + i)}2`}
                      label={`${String.fromCharCode(65 + i)}2`}
                      name={`${String.fromCharCode(65 + i)}2`}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {[...Array(Math.floor(props.noOfSeats / 4))].map((_, i) => (
                    <Seat
                      key={`${String.fromCharCode(65 + i)}1`}
                      id={`${String.fromCharCode(65 + i)}1`}
                      value={`${String.fromCharCode(65 + i)}1`}
                      label={`${String.fromCharCode(65 + i)}1`}
                      name={`${String.fromCharCode(65 + i)}1`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <aside className="flex flex-col gap-2">
            <div className="font-bold">
              Selected seats:
            </div>
            <div className="font-bold">
              Total Fare: 
            </div>
          </aside>
        </div>
        <Button text="Proceed To Book" type="submit" loading={loading} />
      </form>
    </section>
  );
};

export default SeatLayout;
