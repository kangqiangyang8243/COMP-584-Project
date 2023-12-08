import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function H_Post({ posts }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/users/${posts?.userId}`
      );

      // console.log(res.data);
      setUser(res.data);
    };

    fetchUser();
  }, [posts]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["recentPosts_users"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/users/${posts?.userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(user);
  // console.log(posts);
  const handleChange = () => {
    navigate(`post/${posts?._id}`);
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Something went wrong!
        </div>
      ) : (
        <div
          onClick={handleChange}
          className="shadow-md mb-10 hover:shadow-xl bg-slate-50  rounded-lg flex flex-col gap-5 p-5 cursor-pointer hover:scale-110 transform duration-150 ease-linear"
        >
          <div key={posts?._id}>
            <img
              loading="lazy"
              src={posts?.img}
              className="w-full h-[200px] md:h-[400px]  object-cover "
              alt=""
            />
            <div className="flex flex-col items-center gap-4 md:gap-7 mt-3">
              <h3 className="font-semibold text-xl text-center lg:text-[30px]">
                {posts?.title}
              </h3>
              <div className="text-[20px] flex gap-10">
                <div className="flex items-center gap-2">
                  <img
                    loading="lazy"
                    className="w-7 h-7 rounded-full"
                    src={user?.avatar}
                    alt=""
                  />
                  <span>{user?.username}</span>
                </div>

                <div className="flex items-center gap-2">
                  <AiFillCalendar className="text-red-300" />
                  <span> {moment(posts?.createdAt).format("DD/MM/YYYY")}</span>
                </div>
              </div>

              <div className="w-[60%]">
                <p className="text-gray-600 text-center line-clamp-2 lg:line-clamp-3">
                  {posts?.content}
                </p>
              </div>

              <Link to={`post/${posts?._id}`}>
                <button className="bg-blue-300 font-semibold p-2 rounded-lg shadow-md hover:shadow-lg  transform duration-100 ease-linear hover:bg-blue-400 text-white">
                  Continue Reading
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default H_Post;
