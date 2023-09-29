import axios from "axios";
import React, { useEffect, useState } from "react";

function Categories() {
  const [Cats, setCats] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const category = await axios
        .get(import.meta.env.VITE_API_URL + "/category/getCat")
        .then((res) => setCats(res.data.category));

      return category;
    };

    fetchCategories();
  }, []);

  // console.log(Cats);
  return (
    <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
      {" "}
      <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b">
        Category
      </h3>
      <ul className="p-1 flex flex-col gap-5 text-lg text-gray-500">
        {Cats?.map((category) => (
          <li
            key={category._id}
            className="border-b pb-1 hover:text-gray-700 cursor-pointer  transform duration-100 ease-linear hover:border-gray-700"
          >
            {category?.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
