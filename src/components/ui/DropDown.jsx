import Select from "react-select";

const DropDown = (props) => {
  const { label, className, ...restProps } = props;

  return (
    <div className={className}>
      <label className="mb-1 text-sm font-medium">{label}</label>
      <Select
        {...restProps}
        isSearchable
        isClearable
        classNames={{
          control: () =>
            "!border !focus:outline-none !border-gray-300 !focus:border-blue-400 !text-sm !rounded-md",
        }}
      />
    </div>
  );
};

export default DropDown;
