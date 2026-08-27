import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { handleLogout } = useAuth();

  const isRegisterPage = pathname === "/register";
  const isProilePage = pathname === "/profile";
  const isExpensesPage = pathname === "/expenses";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isRootPage = pathname === "/";
  if (isRootPage) {
    return (
      <div className='fixed top-0 left-0 right-0 md:left-60 md:right-60 z-50 border border-white/10  md:mt-4 bg-transparent backdrop-blur-3xl justify-center items-center md:rounded-4xl p-5 '>
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='flex flex-row justify-start'>
            {" "}
            <img
              src='/images/navbar.logo.png'
              className='h-6 w-auto md:h-7 hover:text-white/50 cursor-pointer'
            />
            <Link to='/dashboard'>
              {" "}
              <h1 className='text-white ml-3 text-xl md:text-xl hover:text-white/50'>
                Expense Tracker
              </h1>
            </Link>
          </div>
          <div className='flex flex-row justify-end'>
            <Link
              to='/register'
              className={`ml-3 rounded-3xl border border-white/60 px-4 py-2 text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-black `}
            >
              join
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='fixed left-0 top-0 z-50 bg-black/40 w-full backdrop-blur-md border-b border-white/30'>
        <div className='flex flex-row items-center justify-between p-4 md:p-5'>
          <div className='flex flex-row items-center'>
            <img src='/images/navbar.logo.png' className='h-8 w-auto md:h-9' />
            <Link to='/dashboard'>
              {" "}
              <h1 className='text-white ml-3 text-xl md:text-2xl'>
                Expense Tracker
              </h1>
            </Link>
          </div>
          {!isAuthPage ? (
            <div className='hidden md:flex flex-row'>
              <Link
                to='/profile'
                className={`ml-3 rounded-3xl border border-white/60 px-4 py-2 text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-black ${
                  isProilePage ? "bg-gray-600" : ""
                }`}
              >
                profile
              </Link>
