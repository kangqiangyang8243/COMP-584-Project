import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import Comments from "./Commens";

function PostContent({ posts }) {
  const { userId } = posts;
  const { isLoading, error, data } = useQuery({
    queryKey: ["single_post_user"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/users/${userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  // console.log(user);
  return (
    <div className=" flex flex-col gap-10 p-5 cursor-pointer ">
      <img src={posts?.img} className="w-full  object-cover  " alt="" />

      <div className="flex flex-col  gap-10">
        <h3 className="font-semibold text-3xl  lg:text-[30px]">
          {posts?.title}
        </h3>
        <div className="text-[20px] flex gap-10">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="font-semibold font-serif text-gray-500 mx-auto">
                Loading.....
              </div>
            ) : error ? (
              <div className="font-semibold font-serif text-gray-500 mx-auto">
                Something went wrong!
              </div>
            ) : (
              <>
                <img
                  className="w-7 h-7 rounded-full"
                  src={data?.avatar}
                  alt=""
                />
                <span>{data?.username}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <AiFillCalendar className="text-red-300" />
            <span> {moment(posts?.createdAt).format("DD/MM/YYYY")}</span>
          </div>
        </div>

        <div className="border-b-2 pb-5">
          <p className="text-gray-600 text-xl md:text-3xl">{posts?.content}</p>
        </div>

        <Comments postId={posts._id} />
      </div>
    </div>
  );
}

export default PostContent;
