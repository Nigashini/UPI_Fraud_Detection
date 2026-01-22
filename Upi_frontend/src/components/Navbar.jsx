import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  HiHome,
  HiSearch,
  HiExclamationCircle,
  HiMenu,
  HiX,
  HiViewGrid,
} from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300";

  const activeLinkClass =
    "flex items-center gap-2 px-4 py-2 text-white bg-primary/20 border border-primary/30 rounded-lg shadow-lg shadow-primary/10 font-medium";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            F
          </div>
          <h1 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Fraud<span className="text-primary">Shield</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}>
            <HiHome className="text-xl" /> Home
          </NavLink>

          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}>
            <HiViewGrid className="text-xl" /> Dashboard
          </NavLink>

          <NavLink to="/check" className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}>
            <HiSearch className="text-xl" /> Check Fraud
          </NavLink>

          <NavLink to="/report" className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}>
            <HiExclamationCircle className="text-xl" /> Report Fraud
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden glass border-t border-white/10 p-4 space-y-2 absolute w-full animate-slide-up">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
            onClick={() => setOpen(false)}
          >
            <HiHome /> Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
            onClick={() => setOpen(false)}
          >
            <HiViewGrid /> Dashboard
          </NavLink>

          <NavLink
            to="/check"
            className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
            onClick={() => setOpen(false)}
          >
            <HiSearch /> Check Fraud
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
            onClick={() => setOpen(false)}
          >
            <HiExclamationCircle /> Report Fraud
          </NavLink>
        </div>
      )}
    </nav>
  );
}
