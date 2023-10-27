import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactTimeago from "react-timeago";

function RecentPost({ posts }) {
  const { userId } = posts;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recentPosts_users", userId],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/users/${userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    const refreshInterval = 1000;
    const refreshPage = () => {
      refetch();
    };
    const intervalId = setInterval(refreshPage, refreshInterval);
    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  // console.log(data);

  // console.log(user?.isOnline);
  // console.log(posts);
  const handleChange = () => {
    window.location.replace(
      import.meta.env.VITE_BASIC_URL + `post/${posts?._id}`
    );
  };
  return (
    <>
      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Something went wrong!
        </div>
      ) : (
        <div onClick={handleChange} className="flex  gap-4 cursor-pointer ">
          <div className="w-full flex items-center gap-3 hover:shadow-md rounded-lg p-2 transform duration-100 ease-linear">
            <div className="border-2 rounded-full w-14 h-14  relative flex justify-center items-center">
              <img
                className="w-12 h-12  rounded-full object-cover"
                src={
                  data?.avatar
                    ? data?.avatar
                    : "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                }
                alt=""
              />
              <i
                className={`w-3 h-3 absolute rounded-full right-0 bottom-0  ${
                  data?.isOnline === true ? ` bg-green-400` : ` bg-gray-400`
                }`}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <div>
                {" "}
                <p className="font-semibold lg:text-lg">{data?.username}</p>
                <p className="line-clamp-2 ">{posts?.title}</p>
              </div>

              <ReactTimeago
                className="text-sm text-gray-500 prs-4 "
                date={posts?.createdAt}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecentPost;
