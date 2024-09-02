import {
  IoWalletOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import SearchBar from "../../components/ui/SearchBar";
import Popover from "../../components/ui/Popover";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const headers = [
    "#",
    "name",
    "type",
    "plate no.",
    "capacity",
    "condition", //good, suspended, active
    "status", //available, booked, suspended, assigned, unassigned
    "action",
  ];

  const busList = [
    {
      name: "Myname",
      email: "noberto@gmail.com",
      address: "Ukonga",
      nationalId: 2398473894723894,
      age: 21,
      status: "booked",
    },
    {
      name: "Myname",
      email: "noberto@gmail.com",
      address: "Ukonga",
      nationalId: 2398473894723894,
      age: 21,
      status: "booked",
    },
    {
      name: "Myname",
      email: "noberto@gmail.com",
      address: "Ukonga",
      nationalId: 2398473894723894,
      age: 21,
      status: "booked",
    },
  ];

  return (
    <section className="space-y-11">
      <h1>Welcome to Admin Dashboard,</h1>
      <div className="grid grid-cols-12 2xl:grid-cols-12 gap-x-5">
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
      </div>

      <div className="p-5 mx-auto bg-white rounded-md border max-w-6xl">
        <div className="grid items-center grid-cols-1 xl:grid-cols-2 gap-3 mb-5">
          <h2>Bus List</h2>
          <div className="flex gap-3 xl:justify-end">
            <SearchBar />
            <Button className="basis-1/4" handleClick={()=> navigate("/register")} text="Add Bus" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="text-left bg-slate-100 text-slate-500">
              <tr className="border-y border-slate-200">
                {headers.map((heading, idx) => {
                  return (
                    <th
                      key={idx}
                      className="px-3.5 py-2.5 font-semibold capitalize"
                    >
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y border-b border-slate-200">
              {busList.map((customer, idx) => (
                <tr key={idx}>
                  <td className="px-3.5 py-2.5">
                    {idx < 10 ? `0${idx + 1}` : idx + 1}
                  </td>
                  <td className="px-3.5 py-2.5 capitalize">{customer.name}</td>
                  <td className="px-3.5 py-2.5">{customer.email}</td>
                  <td className="px-3.5 py-2.5 capitalize">
                    {customer.address}
                  </td>
                  <td className="px-3.5 py-2.5">{customer.nationalId}</td>
                  <td className="px-3.5 py-2.5">{customer.age}</td>
                  <td className="px-3.5 py-2.5">{customer.status}</td>
                  <td className="px-3.5 py-2.5">
                    <Popover id={customer._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center mt-5 md:flex-row">
          <div className="mb-4 grow md:mb-0">
            <p className="text-slate-500">
              Showing <b>10</b> of <b>19</b> Results
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-2 shrink-0">
            <li>
              <a
                href="#!"
                className="inline-flex items-center justify-center h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
              >
                <IoChevronBackOutline className="mr-1" />
                Prev
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto active"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 focus:bg-blue-50 dark:focus:bg-blue-500/10 focus:text-blue-500 dark:focus:text-blue-500 [&.active]:text-blue-500 dark:[&.active]:text-blue-500 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-500/10 [&.active]:border-blue-50 dark:[&.active]:border-blue-500/10 [&.active]:hover:text-blue-700 dark:[&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
              >
                Next
                <IoChevronForwardOutline className="ml-1" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
