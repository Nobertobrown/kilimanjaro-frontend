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
            <Button
              className="basis-1/4"
              handleClick={() => navigate("/register")}
              text="Add Bus"
            />
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

      <div className="col-span-12 card bg-white">
        <div className="!pb-0 card-body">
          <div className="flex items-center gap-2 mb-3">
            <h6 className="text-15 grow">Recent Payroll</h6>
            <div className="relative dropdown shrink-0">
              <button
                type="button"
                className="flex items-center justify-center w-[30px] h-[30px] p-0 bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100 dark:bg-zink-700 dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10 dropdown-toggle"
                id="userDeviceDropdown"
                data-bs-toggle="dropdown"
              >
                <i
                  data-lucide="more-vertical"
                  className="inline-block size-4"
                ></i>
              </button>

              <ul
                className="absolute z-50 hidden py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600"
                aria-labelledby="userDeviceDropdown"
              >
                <li>
                  <a
                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                    href="#!"
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                    href="#!"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                    href="#!"
                  >
                    Thursday
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <div data-simplebar className="flex flex-col h-[198px] gap-4 px-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center justify-center text-red-500 rounded-full size-6 shrink-0">
                  <i data-lucide="move-up-right" className="size-4"></i>
                </div>
                <div className="grow">
                  <h6 className="mb-0">Christopher Horn</h6>
                </div>
                <div className="shrink-0">
                  <h6>$145.32</h6>
                </div>
                <div className="w-20 ltr:text-right rtl:text-left shrink-0">
                  <span className="px-2.5 py-0.5 inline-block text-[11px] font-medium rounded border bg-green-100 border-transparent text-green-500 dark:bg-green-500/20 dark:border-transparent">
                    Paid
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center justify-center text-green-500 rounded-full size-6 shrink-0">
                  <i data-lucide="move-down-left" className="size-4"></i>
                </div>
                <div className="grow">
                  <h6 className="mb-0">Richard Peters</h6>
                </div>
                <div className="shrink-0">
                  <h6>$4512.99</h6>
                </div>
                <div className="w-20 ltr:text-right rtl:text-left shrink-0">
                  <span className="px-2.5 py-0.5 inline-block text-[11px] font-medium rounded border bg-yellow-100 border-transparent text-yellow-500 dark:bg-yellow-500/20 dark:border-transparent">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Dashboard;
