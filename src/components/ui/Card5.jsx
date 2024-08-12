import { IoWalletOutline } from "react-icons/io5";
const Card5 = () => {
  return (
    <div className="col-span-12 rounded-md border bg-white md:col-span-6 lg:col-span-3 2xl:col-span-2">
      <div className="text-center p-5">
        <div className="flex text-2xl items-center justify-center mx-auto rounded-full size-14 bg-blue-200 text-blue-500">
          <IoWalletOutline />
        </div>
        <h2 className="mt-4 mb-2">
          $<span className="">286.18</span>k
        </h2>
        <p className="text-slate-500">Total Revenue</p>
      </div>
    </div>
  );
};

export default Card5;
