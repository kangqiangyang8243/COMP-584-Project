import React from "react";

function Header() {
  return (
    <div>
      <div className=" border-b font-serif mx-auto p-4 pb-5 flex items-center justify-between">
        {/* left */}
        <h1 className="text-3xl font-bold text-gray-600 ">Kangqiang Yang</h1>

        {/* right */}
        <ul className="text-xl list-none flex items-center gap-3 text-gray-500 ">
          <li className="li_text">Post</li>
          <li className="li_text">SignIn</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
