import React from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import DropDown from "../../components/ui/DropDown";
import reserveAPI from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { locations as locs } from "../../data/data.json";

const RegisterRoute = () => {
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [arrivalDate, setArrivalDate] = React.useState("");
  const { busId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchLocations = async () => {
      const locations = locs.map(({ name }) => ({
        value: name,
        label: name,
      }));
      setLocations(locations);
    };

    fetchLocations();
  }, []);

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const res = await reserveAPI({
        method: "POST",
        route: `/${busId}/create-route`,
        data: formValues,
      });

      if (res && res.route) {
        toast.success("Route created successfully!");
        navigate(`/${busId}/manage`);
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartureDate = (e) => {
    const minArrivalDate = new Date(e.target.value);
    setArrivalDate(minArrivalDate.toISOString().split("T")[0]);
  };

  return (
    <section>
      <div className="text-center mx-auto space-y-8 mb-20">
        <h1>Route Registration Portal</h1>
        <p>
          Welcome to the Route Registration Portal &#8211; your gateway to
          showcase and manage your routes seamlessly.
        </p>
      </div>

      <div>
        <form
          className="space-y-4 bg-white border p-4 rounded-md shadow-sm"
          onSubmit={register}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              name="name"
              label="Route Name"
              required
              placeholder="Route name"
            />

            <DropDown
              options={locations}
              label="Origin"
              name="origin"
              placeholder="Origin"
              required
            />

            <DropDown
              options={locations}
              label="Destination"
              name="destination"
              placeholder="Destination"
              required
            />

            <Input
              type="date"
              name="departureDate"
              label="Departure Date"
              required
              placeholder="Departure date"
              onChange={handleDepartureDate}
              min={new Date().toISOString().split("T")[0]}
            />
            <Input
              type="date"
              name="arrivalDate"
              label="Arrival Date"
              required
              placeholder="Arrival Date"
              min={arrivalDate}
            />

            <Input
              type="time"
              name="departureTime"
              label="Departure Time"
              required
              placeholder="Departure time"
            />
            <Input
              type="time"
              name="arrivalTime"
              label="Arrival Time"
              required
              placeholder="Arrival time"
            />

            <Input
              type="number"
              name="cost"
              label="Fare"
              required
              placeholder="Trip fare"
            />
          </div>
          <Button type="submit" text="Register your route" loading={loading} />
        </form>
      </div>
    </section>
  );
};

export default RegisterRoute;
