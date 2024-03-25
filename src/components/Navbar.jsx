import { Link} from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";

const pages = [
  {
    page: "Home",
    path: "/",
  },
  {
    page: "Contact",
    path: "/contact",
  },
  {
    page: "Bookings",
    path: "/bookings",
  },
];

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 w-full z-50 bg-white bg-opacity-50 backdrop-blur">
      <section className="flex items-center justify-between max-w-7xl mx-auto py-4 px-2">
        <div>
          <Logo />
        </div>
        <FaBars className="sm:hidden" />
        <div className="hidden sm:flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-3 ">
              {pages.map(({ page, path }) => (
                <li key={page}>
                  <Link to={path}>{page}</Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </section>
    </header>
  );
};

export default Navbar;
