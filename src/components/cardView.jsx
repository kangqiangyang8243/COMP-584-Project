import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function cardView({ posts }) {
  const navigate = useNavigate();

  const { userId } = posts;
  const { isLoading, error, data } = useQuery({
    queryKey: ["cardView_user"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/users/${userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(data);

  const handleChange = () => {
    navigate(`post/${posts?._id}`);
  };
  return (
    <div
      onClick={handleChange}
      className="font-serif p-4 mt-28 min-w-[400px] lg:w-[400px] relative cursor-pointer transform duration-100 shadow-md rounded-lg  hover:shadow-xl group"
    >
      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Something Went Wrong!
        </div>
      ) : (
        <>
          <img
            src={posts?.img}
            className="cursor-pointer h-[300px] object-cover w-full rounded-lg group-hover:scale-110 duration-150 transform ease-linear"
            alt=""
          />
          <div className="absolute m-auto left-0 right-0 top-0 w-52 h-48 bottom-0 gap-5 flex flex-col items-center justify-between  text-white">
            <h3 className="text-2xl font-bold">
              {moment(posts?.createdAt).format("MMM DD YYYY")}
            </h3>
            <h2 className="text-2xl font-bold">{posts?.title}</h2>
            <div className="flex items-center gap-2">
              <div className="rounded-full border-2 p-1">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={data?.avatar}
                  alt=""
                />
              </div>
              <p className="text-2xl">{data?.username}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default cardView;
