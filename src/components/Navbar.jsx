import { Link } from "react-router-dom";
import { MenuToggle } from "./ui/MenuToggle";
import { motion, useCycle } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Logo from "./Logo";
import fakeAvatar from "../assets/fake_user.png";
import localforage from "localforage";

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

const menuOptions = [
  {
    page: "Dashboard",
    path: "/dashboard",
  },
  {
    page: "Bus Registration",
    path: "/register",
  },
  {
    page: "Bus Management",
    path: "/manage",
  },
];

const initialUserState = {
  username: "",
  email: "",
  profile: "",
  uid: "",
};

const Navbar = () => {
  const [user, setUser] = useState(initialUserState);

  const navigate = useNavigate();
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

  useEffect(() => {
    const getAdminData = async () => {
      const adminData = await localforage.getItem("admin");
      if (adminData) {
        setUser(adminData);
      }
    };

    getAdminData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profilePhoto = document.getElementById("profile-photo");
      const menu = document.getElementById("menu");

      if (
        menu &&
        !menu.classList.contains("hidden") &&
        !menu.contains(event.target) &&
        !profilePhoto.contains(event.target)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    const profilePhoto = document.getElementById("profile-photo");
    profilePhoto.classList.toggle("ring-2");
    profilePhoto.classList.toggle("ring-blue-500");
    menu.classList.toggle("hidden");
  };

  const handleSignIn = () => {
    navigate("/sign-in");
    toggleMenu();
  };

  const handleSignOut = async () => {
    try {
      await localforage.clear();
      setUser(initialUserState);
      navigate("/sign-in");
    } catch (error) {
      console.error("Error signing out", error);
    } finally {
      toggleMenu();
    }
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

        <div className="hidden md:flex items-center">
          <nav>
            <ul className="flex items-center gap-10">
              {pages.map(({ page, path }) => (
                <li key={page} className="hover:text-blue-500">
                  <Link to={path}>{page}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <img
              id="profile-photo"
              onClick={toggleMenu}
              src={user.profile ? user.profile : fakeAvatar}
              alt="profile"
              className="h-8 w-8 rounded-md object-cover object-center"
            />
            <div
              id="menu"
              className="min-w-max py-2 border bg-white hidden absolute right-0 mt-1 rounded-md z-10"
            >
              <ul>
                {user.username && (
                  <h3 className="px-3 pb-2 font-medium border-b capitalize">
                    Hello, {user.username}
                  </h3>
                )}

                {user.uid && (
                  <>
                    {menuOptions.map((option, idx) => (
                      <li key={idx} onClick={toggleMenu}>
                        <Link
                          to={option.path}
                          className="hover:bg-gray-100 px-3 py-2 block"
                        >
                          {option.page}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
                {/* TODO: Add proper state management to switch signin & out  */}
                <li className="px-3 py-2">
                  {user.uid !== "" ? (
                    <Button
                      handleClick={handleSignOut}
                      className="py-2"
                      text={"Sign-Out"}
                    />
                  ) : (
                    <Button
                      handleClick={handleSignIn}
                      className="py-2"
                      text="Sign-In"
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
          <MenuToggle toggle={() => toggleOpen()} />
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
