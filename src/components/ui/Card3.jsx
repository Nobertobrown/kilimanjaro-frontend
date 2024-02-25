const Card3 = (props) => {
  const {
    busNumber,
    seats,
    type
  } = props;

  return (
    <div className="bg-white p-4 rounded-md border space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <h2 className="uppercase">{busNumber}</h2>

        <div className="flex items-center gap-2 capitalize">
          <h3>Capacity:</h3>
          <h3>{seats < 10 ? `0${seats}` : seats}</h3>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Type:</h3>
          <p>{type}</p>
        </div>
      </div>
    </div>
  );
};

export default Card3;
