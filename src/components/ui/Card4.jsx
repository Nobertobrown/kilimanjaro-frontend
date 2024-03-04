const Card4 = (props) => {
  const {
    routeName,
    origin,
    destination,
    departureDate,
    duration,
    departureTime,
    cost,
  } = props;

  const departureT = new Date(departureTime).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return (
    <div className="bg-white p-4 rounded-md border space-y-4 cursor-pointer hover:bg-blue-500 hover:text-white">
      <h2 className="uppercase">#-{routeName}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 capitalize">
          <h3>Origin:</h3>
          <p>{origin}</p>
        </div>

        <div className="flex items-center gap-2 capitalize">
          <h3>Destination:</h3>
          <p>{destination}</p>
        </div>

        <div className="flex items-center gap-2 capitalize">
          <h3>Departure Date:</h3>
          <p>{departureDate.split("T")[0]}</p>
        </div>

        <div className="flex items-center gap-2 capitalize">
          <h3>Departure Time:</h3>
          <p>{departureT}</p>
        </div>

        <div className="flex items-center gap-2 capitalize">
          <h3>Duration:</h3>
          <p>{duration}</p>
        </div>

        <div className="flex items-center gap-2 capitalize">
          <h3>Cost:</h3>
          <p>{cost}/=</p>
        </div>
      </div>
    </div>
  );
};

export default Card4;
