import { useState, useEffect } from "react";
import DropDown from "./ui/DropDown";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Query } from "../services/external-api.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { locations as locs } from "../data/data.json";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    const locations = locs.map(({ name }) => ({
      value: name,
      label: name,
    }));
    setLocations(locations);
  }, []);

  const searchBus = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const params = {
        origin,
        destination,
        departureDate: e.target[2].value,
      };

      const args = {
        key: "getRoute",
        method: "GET",
        route: "/routes",
        params,
      };

      const res = await queryClient.ensureQueryData(Query(args));

      if (res.success) {
        navigate("/trips", { state: params });
      } else {
        if(res.error){
          toast.error(res.error)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "API request failed");
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-40">
      <div>
      </div>
      <div className="space-y-10">
        <div>
          <h1 className="text-center">Book your bus tickets</h1>
        </div>

        <div>
          <form className="space-y-6" onSubmit={searchBus}>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <DropDown
                options={locations}
                label="Origin"
                placeholder="Select origin"
                required
                onChange={(origin) =>
                  setOrigin(origin?.value.toLocaleLowerCase())
                }
              />

              <DropDown
                options={locations}
                label="Destination"
                placeholder="Select destination"
                required
                onChange={(destination) =>
                  setDestination(destination?.value.toLocaleLowerCase())
                }
              />

              <Input
                type="date"
                placeholder="Select a date"
                name="departureDate"
                label="Departure Date"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </section>
            <Button text="Search Buses" type="submit" loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
