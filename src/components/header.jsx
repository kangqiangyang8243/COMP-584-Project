import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN)) {
      const users = JSON.parse(
        localStorage.getItem(import.meta.env.VITE_TOKEN)
      );
      // console.log(user);
      setUser(users);
    } else {
      setUser(null);
    }
  }, []);

  // console.log(user);

  const handleExit = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN);
    setUser(null);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
    setSearch("");
    setOpen(false);
  };
  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent element
  };

  return (
    <div>
      <div className=" border-b font-serif mx-auto p-4 pb-5 flex items-center justify-between">
        {/* left */}

        <h1
          onClick={() => {
            navigate(`/`);
            setOpen(false);
          }}
          className="lg:text-3xl cursor-pointer font-bold text-gray-600 "
        >
          Kangqiang Yang
        </h1>

        {/* right */}
        <ul className="text-xl list-none flex items-center gap-3 text-gray-500 ">
          <li className="cursor-pointer  group">
            <BsSearch
              onClick={() => setOpen(!open)}
              className="text-xl group-hover:text-3xl group-hover:text-black transform duration-100 ease-linear"
            />
          </li>
          <Link to="/createpost">
            <li className="li_text">Post</li>
          </Link>
          {!user ? (
            <Link to="/login">
              <li className="li_text">SignIn</li>
            </Link>
          ) : (
            <li>
              <img
                onClick={handleExit}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-full cursor-pointer"
                src={user?.avatar}
                alt=""
              />
            </li>
          )}
        </ul>
      </div>

      {open && (
        <form
          onClick={handleSubmit}
          className="lg:w-3/4 h-12 lg:mx-auto mt-5 rounded-md mx-10"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            onClick={handleInputClick}
            className="border-2 rounded-md w-full h-full shadow-md border-none p-2 focus:outline-black"
          />
          <button type="submit" className="hidden">
            submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Header;
