import { useNavigate } from "react-router-dom";

const Card3 = (props) => {
  const {busId,busName, busNumber, seats, type } = props;
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(`/${busId}/manage-routes`);
  }

  return (
    <div onClick={handleClick} className="bg-white p-4 rounded-md border space-y-4 cursor-pointer hover:bg-blue-500 hover:text-white">
      <h2 className="uppercase">{busName}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 capitalize">
          <h3>PlateNo:</h3>
          <p className="uppercase">{busNumber}</p>
        </div>
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
