import Input from "./ui/Input";
import DropDown from "./ui/DropDown";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const PassCard = ({ seat, num, fare }) => {
  const formattedSeat = Object.values(seat)[0];

  return (
    <div className="space-y-4">
      <div className="flex mt-4 justify-between">
        <h2>
          Passenger {num} ({formattedSeat})
        </h2>
        <b>{fare}/=</b>
      </div>
      <Input
        required
        name={`${formattedSeat}-name`}
        label="Name"
        placeholder="John Doe"
      />
      <Input
        required
        type="email"
        name={`${formattedSeat}-email`}
        label="Email"
        placeholder="johndoe@gmail.com"
      />
      <div className="flex gap-4">
        <Input
          required
          type="number"
          name={`${formattedSeat}-age`}
          label="Age"
          placeholder="Your age in years"
          className="w-full"
          min="1"
        />
        <DropDown
          options={genderOptions}
          label="Gender"
          name={`${formattedSeat}-gender`}
          placeholder="Select your gender"
          required
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PassCard;
