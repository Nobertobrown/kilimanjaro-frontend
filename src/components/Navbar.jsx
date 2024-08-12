import { Link } from "react-router-dom";
import { MenuToggle } from "./ui/MenuToggle";
import { motion, useCycle } from "framer-motion";
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
  const [isOpen, toggleOpen] = useCycle(false, true);

  const variants = {
    open: {
      y: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1, stiffness: 1 },
    },
    closed: {
      y: "-100%",
      transition: {
        duration: 0.3,
        delay: 0.15,
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };

  const childVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <header className="border-b sticky top-0 w-full z-50 bg-white bg-opacity-50 backdrop-blur">
      <motion.section
        className="flex items-center justify-between max-w-7xl mx-auto py-4 px-2"
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <div>
          <Logo />
        </div>
        <MenuToggle toggle={() => toggleOpen()} />

        <div className="hidden md:flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-3">
              {pages.map(({ page, path }) => (
                <li
                  key={page}
                  className="hover:text-blue-500"
                >
                  <Link to={path}>{page}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.section>
      <motion.section
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ stiffness: 100, ease: "easeOut" }}
        className="md:hidden border-y flex absolute w-full bg-white -z-10"
      >
        <ul className="w-full divide-y">
          {pages.map(({ page, path }) => (
            <motion.li
              key={page}
              className="px-4 py-3 hover:text-blue-500 w-full"
              variants={childVariants}
            >
              <Link className="block" to={path}>
                {page}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </header>
  );
};

export default Navbar;
