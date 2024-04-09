import React from "react";
import Card2 from "../../components/ui/Card2";
import Button from "../../components/ui/Button";
import PassCard from "../../components/PassCard";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";

const Payment = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState({});
  const location = useLocation();

  const {
    id,
    fare,
    totalFare,
    busName,
    departureTime,
    arrivalTime,
    departureDate,
    arrivalDate,
    origin,
    seats,
    destination,
    amenities,
    categories,
  } = location.state;

  const proceedToPay = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const userPaymentData = {
      routeId:id,
      amount: totalFare,
      ...formValues,
      busName: busName,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      origin: origin,
      seats: seats,
      destination: destination,
      description: `Payment for bus reservation from ${origin} to ${destination} on ${departureDate} at ${departureTime}.`,
    };

    setPaymentData(userPaymentData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <article>
      <div>
        <Toaster />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-2 md:sticky md:top-[75px] h-fit">
          <Card2
            key={id}
            busName={busName}
            origin={origin}
            destination={destination}
            amenities={amenities}
            categories={categories}
            fare={fare}
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            isBtnShow={false}
          />

          <div className="border p-4 rounded-md shadow-sm bg-white space-y-4">
            <h2>Fare Details</h2>
            <ul className="divide-y">
              <li className="flex items-center justify-between py-2">
                <h4>Bus Fare</h4>
                <b>{totalFare}/=</b>
              </li>
              <li className="flex items-center justify-between py-2">
                <h4>Tax Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between py-2">
                <h4>Other Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between  py-2">
                <h4>Total Amount</h4>
                <b>{totalFare}/=</b>
              </li>
            </ul>
          </div>
        </section>
        <form
          className="border p-4 rounded-md shadow-sm bg-white space-y-8 divide-y-2"
          onSubmit={proceedToPay}
        >
          {seats.map((seat, idx) => (
            <PassCard key={idx} seat={seat} num={idx + 1} fare={fare} />
          ))}
          <Button type="submit" text="Proceed To Pay" />
        </form>
      </section>
      {isOpen && (
        <Modal
          showModal={isOpen}
          handleClose={closeModal}
          data={paymentData}
        />
      )}
    </article>
  );
};

export default Payment;
