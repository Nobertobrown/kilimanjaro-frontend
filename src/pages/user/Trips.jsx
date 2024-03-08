import { useState, useMemo, useEffect } from "react";
import Card2 from "../../components/ui/Card2";
import DropDown from "../../components/ui/DropDown";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import { LuFilter } from "react-icons/lu";
import { busAmenities, busCategories } from "../../data/data.json";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { Query } from "../../services/external-api.service";

const Trips = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const args = {
          key: "getRoute",
          method: "GET",
          route: "/routes",
          params: location.state,
        };
        const res = await queryClient.ensureQueryData(Query(args));

        if (res && res.routes) {
          setTrips(res.routes);
        } else {
          console.error("Unexpected response format:", res);
        }
      } catch (error) {
        // toast.error(error.response?.data?.error || "API request failed");
        console.error("API request failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const args = {
          key: "getLocations",
          method: "GET",
          route: "/location",
        };

        const res = await queryClient.ensureQueryData(Query(args));

        if (res && res.locations) {
          const locations = res.locations.map(({ name }) => ({
            value: name,
            label: name,
          }));
          setLocations(locations);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
    fetchTrips();
  }, [location, queryClient]);

  const filterResults = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {
      origin: origin?.value?.toLocaleLowerCase(),
      destination: destination?.value?.toLocaleLowerCase(),
      amenities: amenities.map((amenity) => amenity.value.toLocaleLowerCase()),
      categories: categories.map((category) =>
        category.value.toLocaleLowerCase()
      ),
    };

    const formData = new FormData(e.target);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const args = {
        method: "GET",
        route: "/routes",
        params: formValues,
      };
      //TODO: Add toast to show when the routes aren't found
      const res = await queryClient.ensureQueryData(Query(args));
      setTrips(res.routes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setOrigin(null);
    setDestination(null);
    setCategories([]);
    setAmenities([]);

    const form = document.getElementById("filterForm");
    form.reset();

    const dropdowns = form.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      dropdown.value = null;
    });
  };

  const skeletonProps = useMemo(
    () => [
      { height: "6", width: "w-28" },
      { colSpan: 2 },
      { colSpan: 2 },
      { colSpan: 2 },
    ],
    []
  );

  const toggleFilterMenu = () => {
    const filters = document.getElementById("filters");
    filters.classList.toggle("hidden");
  };

  return (
    <>
      <div className="md:hidden fixed top-[70px] z-30">
        <Button
          onClick={toggleFilterMenu}
          className="flex items-center gap-1 py-1 bg-blue-50 text-black"
          text={
            <>
              Filters <LuFilter />
            </>
          }
        />
      </div>
      <section className="grid grid-cols-6 gap-2 items-start relative">
        <aside
          id="filters"
          className={`absolute bg-white p-4 w-full md:col-span-2 border rounded-md shadow-sm md:sticky top-0 md:top-[75px] z-20 hidden md:block backdrop-blur`}
        >
          <form id="filterForm" className="space-y-8" onSubmit={filterResults}>
            <section className="space-y-4">
              <DropDown
                options={locations}
                label="Origin"
                placeholder="Select origin"
                value={origin}
                onChange={(data) => setOrigin(data)}
              />
              <DropDown
                options={locations}
                label="Destination"
                placeholder="Select destination"
                value={destination}
                onChange={(data) => setDestination(data)}
              />
              <Input
                type="date"
                placeholder="Select a date"
                name="departureDate"
                label="Departure Date"
                min={new Date().toISOString().split("T")[0]}
              />
              <DropDown
                options={busCategories}
                label="Category"
                placeholder="Bus category"
                value={categories}
                isMulti
                onChange={(category) => setCategories(category)}
              />
              <DropDown
                options={busAmenities}
                label="Amenities"
                placeholder="Select an amenity"
                value={amenities}
                isMulti
                onChange={(amenity) => setAmenities(amenity)}
              />
            </section>
            <div className="space-y-4">
              <Button type="submit" text="Apply Filters" loading={loading} />
              <Button
                type="button"
                text="Clear Selections"
                className={"bg-red-500"}
                onClick={resetFilters}
              />
            </div>
          </form>
        </aside>

        <div className="col-span-6 md:col-span-4 flex flex-col gap-2 relative">
          {trips.length > 0 ? (
            loading ? (
              <Skeleton rowProps={skeletonProps} />
            ) : (
              trips.map((trip) => (
                <Card2
                  key={trip._id}
                  id={trip._id}
                  tripName={trip.name}
                  origin={trip.origin}
                  destination={trip.destination}
                  amenities={trip.bus.amenities}
                  categories={trip.bus.categories}
                  fare={trip.cost}
                  arrivalDate={trip.arrivalDate}
                  departureDate={trip.departureDate}
                  arrivalTime={trip.arrivalTime}
                  departureTime={trip.departureTime}
                />
              ))
            )
          ) : (
            <div>
              <p>No matching trips found!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Trips;
