import React from "react";
import Card2 from "../../components/ui/Card2";
import Input from "../../components/ui/Input";
import DropDown from "../../components/ui/DropDown";
import Button from "../../components/ui/Button";
import Message from "../../components/ui/Message";
import reserveAPI from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const Payment = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const location = useLocation();

  const {
    id,
    fare,
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

  const navigate = useNavigate();

  const proceedToPay = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      const userPaymentData = {
        amount: fare,
        ...formValues,
        busName: busName,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        origin: origin,
        seats: seats,
        destination: destination,
        description: `Payment for bus reservation from ${origin} to ${destination} on ${departureDate} at ${departureTime} for passenger ${formValues.name}.`,
      };

      const res = await reserveAPI({
        method: "POST",
        route: "/booking",
        data: userPaymentData,
      });

      if (res && res.success) {
        toast.success("Payment confirmed");
        navigate("/bookings");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      <div>
        <Toaster />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-2">
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
            <ul className="">
              <li className="flex items-center justify-between border-b  py-2">
                <h4>Bus Fare</h4>
                <b>&#8377; {fare}</b>
              </li>
              <li className="flex items-center justify-between border-b py-2">
                <h4>Tax Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between border-b  py-2">
                <h4>Other Charges</h4>
                <b>0.00</b>
              </li>
              <li className="flex items-center justify-between  py-2">
                <h4>Total Amount</h4>
                <b>&#8377; {fare}</b>
              </li>
            </ul>
          </div>
        </section>
        <form className="space-y-4" onSubmit={proceedToPay}>
          <Input required name="name" label="Name" placeholder="John Doe" />
          <Input
            required
            type="email"
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
          />
          <Input
            required
            type="tel"
            name="phone"
            label="Mobile Number"
            placeholder="+919876543210"
          />
          <Input
            required
            type="number"
            name="age"
            label="Age"
            placeholder="Your age in years"
          />
          <DropDown
            options={genderOptions}
            label="Gender"
            name="gender"
            placeholder="Select your gender"
            required
          />
          <Message message={error} />
          <Button type="submit" text="Proceed to pay" loading={loading} />
        </form>
      </section>
    </article>
  );
};

export default Payment;
