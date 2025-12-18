import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  HiHome,
  HiSearch,
  HiExclamationCircle,
  HiMenu,
  HiX,
} from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition";

  const activeLinkClass =
    "flex items-center gap-2 px-4 py-2 text-blue-600 font-semibold";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">Fraud UPI</h1>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            <HiHome /> Home
          </NavLink>

          <NavLink
            to="/check"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            <HiSearch /> Check Fraud
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            <HiExclamationCircle /> Report Fraud
          </NavLink>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-md border-t">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
            onClick={() => setOpen(false)}
          >
            <HiHome /> Home
          </NavLink>

          <NavLink
            to="/check"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
            onClick={() => setOpen(false)}
          >
            <HiSearch /> Check Fraud
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
            onClick={() => setOpen(false)}
          >
            <HiExclamationCircle /> Report Fraud
          </NavLink>
        </div>
      )}
    </nav>
  );
}
