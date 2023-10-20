import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCalendar, AiFillDelete } from "react-icons/ai";
import Comments from "./Commens";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostContent({ posts, userId, postId }) {
  // console.log(posts);

  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["single_post_user"],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/users/${userId}`)
        .then((res) => {
          return res.data;
        }),
  });

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

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios
        .delete(import.meta.env.VITE_API_URL + `/posts/${postId}`)
        .then((res) => {
          toast.success("Post deleted successfully!");
          navigate("/");
        });
    } catch (error) {
      toast.error("Error deleting post");
    }
  };
  return (
    <div className=" flex flex-col gap-10 p-5 cursor-pointer ">
      <img src={posts?.img} className="w-full  object-cover  " alt="" />

      <div className="flex flex-col  gap-10">
        <div className=" flex justify-between items-center px-2">
          <div className="space-y-8">
            {" "}
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
          </div>
          {user?._id == userId && (
            <AiFillDelete
              onClick={handleDelete}
              className="text-red-400 text-2xl cursor-pointer hover:text-red-500"
            />
          )}
        </div>

        <div className="border-b-2 pb-5">
          <p className="text-gray-600 text-xl md:text-3xl">{posts?.content}</p>
        </div>

        <Comments postId={posts?._id} />
      </div>
    </div>
  );
}

export default PostContent;
