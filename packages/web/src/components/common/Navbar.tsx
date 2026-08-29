import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { handleLogout } = useAuth();

  const isRegisterPage = pathname === "/register";
  const isProilePage = pathname === "/profile";
  const isExpensesPage = pathname === "/expenses";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isRootPage = pathname === "/";
  const { isAuthenticated } = useAuthStore();
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
              <h1 className='text-white ml-3 text-lg md:text-xl font-semibold'>
                Expense Tracker
              </h1>
            </Link>
          </div>
          <div className='flex flex-row justify-end'>
            <Link
              to='/register'
              className='ml-3 rounded-lg bg-white px-4 py-2 text-black font-medium text-sm transition hover:bg-gray-200'
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='fixed left-0 top-0 z-50 bg-neutral-950/95 w-full backdrop-blur-md border-b border-white/10'>
        {" "}
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
          {isAuthenticated ? (
            <div className='hidden md:flex flex-row'>
              <Link
                to='/profile'
                className={`ml-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/10 ${
                  isProilePage ? "bg-white/10 text-white" : ""
                }`}
              >
                Profile
              </Link>
              <Link
                to='/expenses'
                className={`ml-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/10 ${
                  isExpensesPage ? "bg-white/10 text-white" : ""
                }`}
              >
                Expenses
              </Link>
              <button
                onClick={async () => {
                  await handleLogout();
                }}
                className='ml-2 rounded-lg px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 cursor-pointer'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='md:hidden flex flex-col bg-neutral-950 border-t border-white/10'>
              {" "}
              <Link
                to='/register'
                className={`ml-3 rounded-3xl border border-white/60 px-4 py-2 text-white transition-all hover:-tranneutral-y-1  hover:bg-white hover:text-gray-900 ${
                  isRegisterPage ? "bg-gray-600" : ""
                }`}
              >
                Join
              </Link>
            </div>
          )}

          <button
            className='md:hidden text-white'
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className='md:hidden flex flex-col bg-black/80 backdrop-blur-xl border-t border-white/20'>
            <Link
              to='/register'
              className={`text-white px-4 py-3 text-left hover:bg-white/10 cursor-pointer ${
                isAuthPage ? "bg-gray-600" : ""
              }`}
            >
              Join
            </Link>
            <Link
              to='/profile'
              className={`text-white px-4 py-3 text-left hover:bg-white/10 cursor-pointer ${
                isProilePage ? "bg-gray-600" : ""
              }`}
            >
              profile
            </Link>
            <Link
              to='/expenses'
              className={`text-white px-4 py-3 text-left hover:bg-white/10 cursor-pointer ${
                isExpensesPage ? "bg-gray-600" : ""
              }`}
            >
              Expenses
            </Link>
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  await handleLogout();
                }}
                className={`text-white px-4 py-3 text-left hover:bg-white/10 cursor-pointer`}
              >
                Logout
              </button>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
