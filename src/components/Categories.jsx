import React from "react";

function Categories() {
  return (
    <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
      {" "}
      <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b">
        Category
      </h3>
      <ul className="p-1 flex flex-col gap-5 text-lg text-gray-500">
        <li className="border-b pb-1 hover:text-gray-700 cursor-pointer  transform duration-100 ease-linear hover:border-gray-700">
          Web Project
        </li>
        <li className="border-b pb-1 hover:text-gray-700 cursor-pointer  transform duration-100 ease-linear hover:border-gray-700">
          Code learning
        </li>
        <li className="border-b pb-1 hover:text-gray-700 cursor-pointer  transform duration-100 ease-linear hover:border-gray-700">
          Thoughts
        </li>
      </ul>
    </div>
  );
}

export default Categories;
