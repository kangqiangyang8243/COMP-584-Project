import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
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

  return (
    <div>
      <div className=" border-b font-serif mx-auto p-4 pb-5 flex items-center justify-between">
        {/* left */}

        <h1 className="text-3xl font-bold text-gray-600 ">
          <Link to="/"> Kangqiang Yang</Link>
        </h1>

        {/* right */}
        <ul className="text-xl list-none flex items-center gap-3 text-gray-500 ">
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
    </div>
  );
}

export default Header;
