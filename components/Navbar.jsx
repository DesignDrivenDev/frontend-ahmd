import { getUsers, searchUser } from "@/app/features/users/userSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const users = useSelector((state) => state.users.users);
  const [Search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(searchUser(Search));
  }, [dispatch, Search]);
  return (
    <div>
      <header className="bg-white w-full fixed z-50 shadow-xl">
        <div className="mx-auto max-w-screen-xl w-11/12">
          <div className="flex gap-x-4 h-16 items-center justify-between">
            <div className="flex md:items-center md:gap-12">
              {/* flex-1 md: */}
              <Link className="block" href="/">
                <span className="sr-only">Home</span>
                Home
              </Link>
            </div>
            <div className="relative w-96">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>

              <input
                type="text"
                id="Search"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for..."
                className="w-full placeholder:text-sm rounded-md border border-gray-300 p-1.5 pe-10 shadow-sm sm:text-sm"
              />

              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="md:flex md:items-center">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-black transition hover:text-black/75"
                      href="/users"
                    >
                      Users{" "}
                      <span className="text-xs text-white px-2 py-1 bg-blue-700 rounded-full">
                        {users.length}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:text-black/75"
                      href="/create-user"
                    >
                      Create User
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
