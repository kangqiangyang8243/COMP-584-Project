import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function Categories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/category/getCat")
        .then((res) => {
          return res.data.category;
        }),
  });

  // console.log(data);

  return (
    <div className="p-4 rounded-md shadow-md flex flex-col gap-5">
      {" "}
      <h3 className="text-lg lg:text-2xl font-semibold pb-2 border-b">
        Category
      </h3>
      <ul className="p-1 flex flex-col gap-5 text-lg text-gray-500">
        {isLoading ? (
          <div className="font-semibold font-serif text-gray-500 mx-auto">
            Loading.....
          </div>
        ) : error ? (
          <div className="font-semibold font-serif text-gray-500 mx-auto">
            Something went wrong!
          </div>
        ) : (
          data?.map((category) => (
            <a href={`/?catName=${category?.title}`} key={category._id}>
              {" "}
              <li className="border-b pb-1 hover:text-gray-700 cursor-pointer  transform duration-100 ease-linear hover:border-gray-700">
                {category?.title}
              </li>
            </a>
          ))
        )}
      </ul>
    </div>
  );
}

export default Categories;
