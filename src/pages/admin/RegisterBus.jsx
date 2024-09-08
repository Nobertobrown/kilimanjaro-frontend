import React from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import DropDown from "../../components/ui/DropDown";
import reserveAPI from "../../api/api";
import {
  busCategories as categoryOptions,
  busAmenities as amenityOptions,
  typeOptions,
} from "../../data/data.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterBus = () => {
  const [amenities, setAmenities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);
    formValues["amenities"] = amenities.map((amenity) => amenity.value);
    formValues["categories"] = categories.map((category) => category.value);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const res = await reserveAPI({
        method: "POST",
        route: "/create-bus",
        data: formValues,
      });

      if (res && res.bus) {
        toast.success("Bus created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="text-center mx-auto space-y-8 mb-20">
        <h1>Bus Registration Portal</h1>
        <p>
          Welcome to the Bus Registration Portal &#8211; your gateway to
          showcase and manage your fleet of buses seamlessly.
        </p>
      </div>

      <div>
        <form className="space-y-4 bg-white border p-4 rounded-md shadow-sm" onSubmit={register}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              name="name"
              label="Bus Name"
              required
              placeholder="Company name"
            />

            <Input
              name="plate"
              label="Plate Number"
              required
              placeholder="Plate number"
            />

            <DropDown
              options={typeOptions}
              label="Type"
              name="type"
              placeholder="Bus Type"
              required
            />

            <DropDown
              options={categoryOptions}
              label="Category"
              placeholder="Bus category"
              required
              isMulti
              onChange={(category) => setCategories(category)}
            />

            <DropDown
              options={amenityOptions}
              label="Amenities"
              placeholder="Select an amenity"
              required
              isMulti
              onChange={(amenity) => setAmenities(amenity)}
            />

            <DropDown
              options={(() => {
                const result = [];
                for (let i = 13; i <= 100; i++) {
                  if (i % 4 == 1) {
                    result.push({ value: i, label: i.toString() });
                  }
                }
                return result;
              })()}
              label="No. of seats"
              name="seats"
              placeholder="Number of seats"
              required
            />
          </div>

          <Button type="submit" text="Register your bus" loading={loading} />
        </form>
      </div>
    </section>
  );
};

export default RegisterBus;
