import { IoSearchOutline } from "react-icons/io5";
import Input from "./Input";

const SearchBar = ({ className }) => {
  return (
    <div className="w-full">
      <Input
        icon={<IoSearchOutline />}
        name="search"
        type="text"
        placeholder="Search for ..."
        autoComplete="off"
        className={className}
      />
    </div>
  );
};

export default SearchBar;
